#!/usr/bin/env python3
"""Roadmap server.

Serves the site and README.md from the repository, and keeps checklist
progress in progress.json at the repository root, so it's committed and
pushed together with the rest of the repo.
"""

import json
import mimetypes
import os
import tempfile
import threading
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT = Path(os.environ.get("ROOT", "/srv/roadmap"))
SITE = ROOT / "site"
README = ROOT / "README.md"
STATE = ROOT / "progress.json"
PORT = int(os.environ.get("PORT", "8080"))

lock = threading.Lock()


def read_state():
    try:
        data = json.loads(STATE.read_text(encoding="utf-8"))
    except FileNotFoundError:
        data = {}
    return {"version": 1, "progress": data.get("progress", {})}


def write_state(progress):
    # Sorted and indented so git diffs show exactly which items changed.
    text = json.dumps({"version": 1, "progress": progress}, indent=2, sort_keys=True) + "\n"
    with lock:
        fd, tmp = tempfile.mkstemp(dir=ROOT, prefix=".progress.", suffix=".tmp")
        with os.fdopen(fd, "w", encoding="utf-8") as f:
            f.write(text)
        os.chmod(tmp, 0o644)
        os.replace(tmp, STATE)


class Handler(BaseHTTPRequestHandler):
    server_version = "roadmap"

    def log_message(self, fmt, *args):
        pass

    def send_body(self, status, data, ctype):
        self.send_response(status)
        self.send_header("Content-Type", ctype)
        self.send_header("Cache-Control", "no-cache")
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def send_json(self, status, payload):
        self.send_body(status, json.dumps(payload).encode(), "application/json")

    def do_GET(self):
        path = self.path.split("?", 1)[0].split("#", 1)[0]
        if path == "/api/progress":
            return self.send_json(HTTPStatus.OK, read_state())
        if path == "/README.md":
            target = README
        else:
            target = (SITE / (path.lstrip("/") or "index.html")).resolve()
            if target.is_dir():
                target = target / "index.html"
            if SITE.resolve() not in target.parents:
                return self.send_error(HTTPStatus.NOT_FOUND)
        if not target.is_file():
            return self.send_error(HTTPStatus.NOT_FOUND)
        ctype = "text/markdown" if target.suffix == ".md" else (mimetypes.guess_type(target.name)[0] or "application/octet-stream")
        if ctype.startswith("text/") or ctype in ("application/javascript", "application/json"):
            ctype += "; charset=utf-8"
        self.send_body(HTTPStatus.OK, target.read_bytes(), ctype)

    def do_PUT(self):
        if self.path != "/api/progress":
            return self.send_error(HTTPStatus.NOT_FOUND)
        # Requiring JSON forces a CORS preflight, so other websites can't write progress.
        if not self.headers.get("Content-Type", "").startswith("application/json"):
            return self.send_json(HTTPStatus.UNSUPPORTED_MEDIA_TYPE, {"error": "expected JSON"})
        try:
            length = min(int(self.headers.get("Content-Length", 0)), 1_000_000)
            progress = json.loads(self.rfile.read(length)).get("progress")
            if not isinstance(progress, dict) or not all(
                isinstance(k, str) and isinstance(v, (int, float)) for k, v in progress.items()
            ):
                raise ValueError
        except (ValueError, AttributeError):
            return self.send_json(HTTPStatus.BAD_REQUEST, {"error": "expected {\"progress\": {key: timestamp}}"})
        write_state(progress)
        self.send_json(HTTPStatus.OK, {"ok": True})


if __name__ == "__main__":
    print(f"serving {ROOT} on :{PORT}", flush=True)
    ThreadingHTTPServer(("0.0.0.0", PORT), Handler).serve_forever()
