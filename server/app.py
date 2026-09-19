#!/usr/bin/env python3
"""Roadmap server.

Serves the site from its own clone of the repository and saves checklist
progress back into README.md (`- [ ]` <-> `- [x]`), committing and pushing it
to GitHub. GitHub is the source of truth: a new machine only needs to clone.
"""

import base64
import json
import logging
import mimetypes
import os
import re
import signal
import subprocess
import sys
import threading
import time
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

REPO_URL = os.environ.get("REPO_URL", "https://github.com/moabdelazem/Roadmap.git")
BRANCH = os.environ.get("BRANCH", "main")
TOKEN = os.environ.get("GITHUB_TOKEN", "").strip()
DATA_DIR = Path(os.environ.get("DATA_DIR", "/data"))
REPO = DATA_DIR / "repo"
SITE = REPO / "site"
README = REPO / "README.md"
PORT = int(os.environ.get("PORT", "8080"))
AUTHOR_NAME = os.environ.get("GIT_AUTHOR_NAME", "Roadmap progress")
AUTHOR_EMAIL = os.environ.get("GIT_AUTHOR_EMAIL", "roadmap@localhost")
COMMIT_DELAY = float(os.environ.get("COMMIT_DELAY", "20"))  # quiet seconds before ticks are committed
PULL_INTERVAL = float(os.environ.get("PULL_INTERVAL", "60"))

TASK_RE = re.compile(r"^(\s*(?:[-*+]|\d+[.)])\s+\[)([ xX])(\]\s)")
FENCE_RE = re.compile(r"^\s*(```|~~~)")

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
log = logging.getLogger("roadmap")

lock = threading.RLock()
state = {
    "ready": False,
    "last_sync": None,
    "last_error": None,
    "pending": {},  # task index -> {"checked", "text"}: written to README.md, not committed yet
    "last_change": 0.0,
}


class Stale(Exception):
    """The page was rendered from a different version of README.md."""


# ---------- git ----------
def git(*args, check=True):
    cmd = ["git"]
    if TOKEN:
        cred = base64.b64encode(f"x-access-token:{TOKEN}".encode()).decode()
        cmd += ["-c", f"http.https://github.com/.extraheader=AUTHORIZATION: basic {cred}"]
    cmd += ["-c", f"user.name={AUTHOR_NAME}", "-c", f"user.email={AUTHOR_EMAIL}", *args]
    cwd = REPO if (REPO / ".git").exists() else DATA_DIR
    res = subprocess.run(cmd, cwd=cwd, capture_output=True, text=True, timeout=120)
    if check and res.returncode != 0:
        msg = (res.stderr or res.stdout).strip()
        if TOKEN:
            msg = msg.replace(TOKEN, "***")
        raise RuntimeError(f"git {args[0]} failed: {msg}")
    return res


def ensure_clone():
    if (REPO / ".git").exists():
        return
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    log.info("cloning %s (%s)", REPO_URL, BRANCH)
    git("clone", "--branch", BRANCH, REPO_URL, str(REPO))


def task_states(text):
    lines = text.split("\n")
    return [TASK_RE.match(lines[i]).group(2) != " " for i in task_lines(lines)]


def commit_pending():
    if not state["pending"]:
        return
    git("add", "README.md")
    if git("diff", "--cached", "--quiet", check=False).returncode == 0:
        state["pending"] = {}  # ticked and unticked again: nothing to record
        return
    # Only record items whose state actually differs from the last commit.
    before = task_states(git("show", "HEAD:README.md").stdout)
    changes = [c for i, c in sorted(state["pending"].items()) if i >= len(before) or before[i] != c["checked"]]
    done = sum(1 for c in changes if c["checked"])
    undone = len(changes) - done
    parts = [f"{done} done" if done else "", f"{undone} undone" if undone else ""]
    subject = "Progress: " + ", ".join(p for p in parts if p)
    body = "\n".join(f"- [{'x' if c['checked'] else ' '}] {c['text']}" for c in changes)
    git("commit", "-m", subject, "-m", body)
    state["pending"] = {}
    log.info("%s", subject)


def sync(force_commit=False):
    """Commit settled ticks, pull the latest plan, and push anything unpushed."""
    with lock:
        if state["pending"]:
            if force_commit or time.time() - state["last_change"] >= COMMIT_DELAY:
                commit_pending()
            else:
                return
        pull = git("pull", "--rebase", "origin", BRANCH, check=False)
        if pull.returncode != 0:
            git("rebase", "--abort", check=False)
            raise RuntimeError("pull failed: " + (pull.stderr or pull.stdout).strip().replace(TOKEN or "\0", "***"))
        ahead = int(git("rev-list", "--count", f"origin/{BRANCH}..HEAD").stdout.strip() or 0)
        if ahead:
            git("push", "origin", f"HEAD:{BRANCH}")
            log.info("pushed %d commit(s)", ahead)
        state["last_sync"] = time.time()
        state["last_error"] = None


def worker():
    next_pull = 0.0
    while True:
        try:
            if not state["ready"]:
                ensure_clone()
                state["ready"] = True
                log.info("repository ready at %s", REPO)
            now = time.time()
            settled = state["pending"] and now - state["last_change"] >= COMMIT_DELAY
            if settled or now >= next_pull:
                sync()
                next_pull = now + PULL_INTERVAL
        except Exception as exc:  # keep serving; retry later
            state["last_error"] = str(exc)
            log.error("%s", exc)
            time.sleep(30)
        time.sleep(2)


# ---------- README tasks ----------
def plain(text):
    text = re.sub(r"!?\[([^\]]*)\]\([^)]*\)", r"\1", text)
    return re.sub(r"[^0-9a-z]+", "", text.lower())


def task_lines(lines):
    found, in_fence = [], False
    for i, line in enumerate(lines):
        if FENCE_RE.match(line):
            in_fence = not in_fence
            continue
        if not in_fence and TASK_RE.match(line):
            found.append(i)
    return found


def set_task(index, checked, text, total):
    with lock:
        lines = README.read_text(encoding="utf-8").split("\n")
        tasks = task_lines(lines)
        if total != len(tasks) or not 0 <= index < len(tasks):
            raise Stale()
        i = tasks[index]
        body = TASK_RE.sub("", lines[i], count=1)
        # The page sends the rendered item text; the line may wrap, so compare a prefix.
        a, b = plain(body), plain(text)
        n = min(40, len(a))
        if n == 0 or a[:n] != b[:n]:
            raise Stale()
        mark = "x" if checked else " "
        updated = TASK_RE.sub(lambda m: m.group(1) + mark + m.group(3), lines[i], count=1)
        if updated == lines[i]:
            return
        lines[i] = updated
        tmp = README.with_suffix(".md.tmp")
        tmp.write_text("\n".join(lines), encoding="utf-8")
        tmp.replace(README)
        state["pending"][index] = {"checked": checked, "text": re.sub(r"\s+", " ", body).strip()[:100]}
        state["last_change"] = time.time()


# ---------- HTTP ----------
class Handler(BaseHTTPRequestHandler):
    server_version = "roadmap"

    def log_message(self, fmt, *args):
        pass

    def send_json(self, status, payload):
        data = json.dumps(payload).encode()
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Cache-Control", "no-store")
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def do_GET(self):
        path = self.path.split("?", 1)[0].split("#", 1)[0]
        if path == "/api/status":
            return self.send_json(HTTPStatus.OK, {
                "mode": "git",
                "ready": state["ready"],
                "pending": len(state["pending"]),
                "lastSync": state["last_sync"],
                "lastError": state["last_error"],
            })
        if not state["ready"]:
            msg = state["last_error"] or "Cloning the repository..."
            page = f"<meta http-equiv=refresh content=5><p style='font-family:sans-serif'>{msg}</p>".encode()
            self.send_response(HTTPStatus.SERVICE_UNAVAILABLE)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(page)))
            self.end_headers()
            return self.wfile.write(page)

        if path == "/README.md":
            target = README
        else:
            rel = path.lstrip("/") or "index.html"
            target = (SITE / rel).resolve()
            if target.is_dir():
                target = target / "index.html"
            if SITE.resolve() not in target.parents:
                return self.send_error(HTTPStatus.NOT_FOUND)
        if not target.is_file():
            return self.send_error(HTTPStatus.NOT_FOUND)

        with lock:
            data = target.read_bytes()
        ctype = "text/markdown" if target.suffix == ".md" else (mimetypes.guess_type(target.name)[0] or "application/octet-stream")
        if ctype.startswith("text/") or ctype in ("application/javascript", "application/json"):
            ctype += "; charset=utf-8"
        self.send_response(HTTPStatus.OK)
        self.send_header("Content-Type", ctype)
        self.send_header("Cache-Control", "no-cache")
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def do_POST(self):
        if self.path != "/api/tasks":
            return self.send_error(HTTPStatus.NOT_FOUND)
        # Requiring JSON forces a CORS preflight, so other websites can't tick boxes.
        if not self.headers.get("Content-Type", "").startswith("application/json"):
            return self.send_json(HTTPStatus.UNSUPPORTED_MEDIA_TYPE, {"error": "expected JSON"})
        if not state["ready"]:
            return self.send_json(HTTPStatus.SERVICE_UNAVAILABLE, {"error": "not ready"})
        try:
            length = min(int(self.headers.get("Content-Length", 0)), 65536)
            body = json.loads(self.rfile.read(length))
            set_task(int(body["index"]), bool(body["checked"]), str(body["text"]), int(body["total"]))
        except Stale:
            return self.send_json(HTTPStatus.CONFLICT, {"error": "stale"})
        except (ValueError, KeyError, TypeError):
            return self.send_json(HTTPStatus.BAD_REQUEST, {"error": "bad request"})
        self.send_json(HTTPStatus.OK, {"ok": True, "pending": len(state["pending"])})


def shutdown(*_):
    log.info("shutting down, saving pending ticks")
    try:
        if state["ready"]:
            sync(force_commit=True)
    except Exception as exc:
        log.error("final sync failed: %s", exc)
    sys.exit(0)


def main():
    if not TOKEN:
        log.warning("GITHUB_TOKEN is not set: cloning a private repo and pushing progress will fail")
    signal.signal(signal.SIGTERM, shutdown)
    signal.signal(signal.SIGINT, shutdown)
    threading.Thread(target=worker, daemon=True).start()
    log.info("listening on :%d", PORT)
    ThreadingHTTPServer(("0.0.0.0", PORT), Handler).serve_forever()


if __name__ == "__main__":
    main()
