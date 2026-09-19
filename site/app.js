(() => {
  'use strict';

  const PROGRESS_KEY = 'roadmap-progress-v1';
  const MIGRATED_KEY = 'roadmap-progress-migrated';
  const THEME_KEY = 'roadmap-theme';
  const REPO_URL = 'https://github.com/moabdelazem/Roadmap';

  const content = document.getElementById('content');
  const toc = document.getElementById('toc');
  const sidebar = document.getElementById('sidebar');
  const scrim = document.getElementById('scrim');
  const menuBtn = document.getElementById('menu-btn');

  // ---------- storage (never throws) ----------
  const store = {
    get(key) { try { return localStorage.getItem(key); } catch { return null; } },
    set(key, value) { try { localStorage.setItem(key, value); } catch { /* ignore */ } },
    remove(key) { try { localStorage.removeItem(key); } catch { /* ignore */ } },
  };

  let progress = {};
  try { progress = JSON.parse(store.get(PROGRESS_KEY) || '{}') || {}; } catch { progress = {}; }
  const saveProgress = () => store.set(PROGRESS_KEY, JSON.stringify(progress));

  // 'git': the server saves ticks into README.md and pushes them to GitHub.
  // 'local': static hosting, ticks live in this browser only.
  let mode = 'local';
  let totalTasks = 0;
  const syncEl = document.getElementById('sync-status');

  // ---------- helpers ----------
  const slugCounts = new Map();
  // Mirrors GitHub's heading anchors so README links like #back-to-basics-saturday work.
  function slugify(text) {
    const base = text.trim().toLowerCase()
      .replace(/[^\p{L}\p{N}\s_-]/gu, '')
      .replace(/\s/g, '-');
    const n = slugCounts.get(base) || 0;
    slugCounts.set(base, n + 1);
    return n ? `${base}-${n}` : base;
  }

  function hash(str) {
    let h = 5381;
    for (const ch of str) h = ((h << 5) + h + ch.codePointAt(0)) | 0;
    return (h >>> 0).toString(36);
  }

  function el(tag, attrs = {}, children = []) {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === 'class') node.className = v;
      else if (k === 'text') node.textContent = v;
      else node.setAttribute(k, v);
    }
    for (const c of [].concat(children)) if (c) node.append(c);
    return node;
  }

  function progressBar(extraClass = '') {
    const fill = el('span');
    const bar = el('div', { class: `bar ${extraClass}`.trim() }, fill);
    return { bar, fill };
  }

  // ---------- load ----------
  async function loadReadme() {
    for (const path of ['README.md', '../README.md']) {
      try {
        const res = await fetch(path, { cache: 'no-cache' });
        if (res.ok) return await res.text();
      } catch { /* try next */ }
    }
    throw new Error('Could not load README.md');
  }

  // ---------- render ----------
  const sections = []; // { id, title, node, tasks: [input], tocItem, tocFill, tocCount, sectionFill, sectionLabel, subs: [] }

  function render(markdown) {
    content.innerHTML = marked.parse(markdown, { gfm: true });

    // Anchors on headings
    content.querySelectorAll('h1, h2, h3, h4').forEach((h) => {
      h.dataset.title = h.textContent.trim();
      h.id = slugify(h.textContent);
      if (h.tagName !== 'H1') {
        h.append(el('a', { class: 'anchor', href: `#${h.id}`, 'aria-label': `Link to ${h.textContent}` }, '#'));
      }
    });

    // Tables and diagrams scroll inside their own box
    content.querySelectorAll('table').forEach((t) => {
      const wrap = el('div', { class: 'table-wrap' });
      t.replaceWith(wrap);
      wrap.append(t);
    });

    // External links open in a new tab
    content.querySelectorAll('a[href^="http"]').forEach((a) => {
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
    });

    // Highlight the "Current focus" callout and the header callout
    content.querySelectorAll('blockquote').forEach((bq) => {
      const text = bq.textContent;
      if (text.includes('Current focus')) bq.classList.add('callout-focus');
      else if (text.includes('⚠️')) bq.classList.add('callout-warn');
    });

    groupIntoSections();
    wireTasks();
    buildToc();
    addFooter();
    updateAllProgress();
    observeHeadings();
  }

  // Wrap each h2 and the nodes after it in a <section>
  function groupIntoSections() {
    const nodes = Array.from(content.childNodes);
    const intro = el('header', { class: 'intro', id: 'top' });
    let current = intro;
    content.innerHTML = '';
    content.append(intro);

    for (const node of nodes) {
      if (node.nodeType === 1 && node.tagName === 'HR') continue; // section breaks replace <hr>
      if (node.nodeType === 1 && node.tagName === 'H2') {
        current = el('section', { class: 'plan-section', 'aria-labelledby': node.id });
        content.append(current);
        const title = node.dataset.title;
        const kind = /^Phase \d/.test(title) ? 'phase' : /^Back to Basics/.test(title) ? 'track' : 'guide';
        current.classList.add(`kind-${kind}`);
        sections.push({ id: node.id, title, node: current, heading: node, kind, tasks: [], subs: [] });
      }
      current.append(node);
    }

    for (const s of sections) {
      s.subs = Array.from(s.node.querySelectorAll('h3')).map((h) => ({
        id: h.id,
        title: h.dataset.title,
      }));
    }
  }

  function wireTasks() {
    const seen = new Map();
    let index = 0;
    for (const s of sections) {
      s.node.querySelectorAll('input[type="checkbox"]').forEach((box) => {
        const li = box.closest('li');
        if (!li) return;
        li.classList.add('task');
        li.closest('ul, ol')?.classList.add('task-list');

        const text = li.textContent.replace(/\s+/g, ' ').trim();
        let key = `${s.id}:${hash(text)}`;
        const dup = seen.get(key) || 0;
        seen.set(key, dup + 1);
        if (dup) key += `-${dup}`;

        const inReadme = box.hasAttribute('checked'); // "- [x]" in README.md
        box.removeAttribute('disabled');
        box.dataset.key = key;
        box.dataset.index = String(index++);
        box.dataset.text = text;
        box.checked = mode === 'git' ? inReadme : Boolean(progress[key]) || inReadme;
        box.setAttribute('aria-label', text.slice(0, 120));
        li.classList.toggle('done', box.checked);

        box.addEventListener('change', () => {
          li.classList.toggle('done', box.checked);
          updateAllProgress();
          if (mode === 'git') {
            saveToRepo(box);
            return;
          }
          if (box.checked) progress[key] = Date.now();
          else delete progress[key];
          saveProgress();
        });
        s.tasks.push(box);
      });
      totalTasks = index;

      if (s.tasks.length) {
        const { bar, fill } = progressBar();
        const label = el('span', { class: 'label' });
        const strip = el('div', { class: 'section-progress' }, [bar, label]);
        s.heading.after(strip);
        s.sectionFill = fill;
        s.sectionLabel = label;
      }
    }
  }

  function buildToc() {
    toc.innerHTML = '';
    for (const s of sections) {
      const link = el('a', { href: `#${s.id}`, class: 'toc-link' }, el('span', { class: 'toc-title', text: s.title }));
      const item = el('li', { class: `toc-item kind-${s.kind}` }, link);
      item.dataset.search = [s.title, ...s.subs.map((x) => x.title)].join(' ').toLowerCase();

      if (s.tasks.length) {
        const { bar, fill } = progressBar('mini');
        const count = el('span', { class: 'toc-count' });
        link.append(el('span', { class: 'toc-meta' }, [bar, count]));
        s.tocFill = fill;
        s.tocCount = count;
      }

      if (s.subs.length) {
        const sub = el('ol', { class: 'toc-sub' });
        for (const x of s.subs) {
          sub.append(el('li', {}, el('a', { href: `#${x.id}`, class: 'toc-sublink', text: x.title })));
        }
        item.append(sub);
      }
      s.tocItem = item;
      toc.append(item);
    }

    toc.addEventListener('click', (e) => {
      if (e.target.closest('a')) closeMenu();
    });
  }

  function addFooter() {
    content.append(el('footer', { class: 'site-footer' }, [
      el('p', {}, [
        'This page renders ',
        el('a', { href: `${REPO_URL}/blob/main/README.md`, target: '_blank', rel: 'noopener noreferrer', text: 'README.md' }),
        ' from the repository, so it always shows the current plan.',
      ]),
    ]));
  }

  // ---------- progress ----------
  function updateAllProgress() {
    let total = 0;
    let done = 0;
    for (const s of sections) {
      if (!s.tasks.length) continue;
      const d = s.tasks.filter((b) => b.checked).length;
      const pct = Math.round((d / s.tasks.length) * 100);
      total += s.tasks.length;
      done += d;
      s.sectionFill.style.width = `${pct}%`;
      s.sectionLabel.textContent = `${d} / ${s.tasks.length} · ${pct}%`;
      s.tocFill.style.width = `${pct}%`;
      s.tocCount.textContent = `${pct}%`;
      s.tocItem.classList.toggle('complete', d === s.tasks.length);
    }
    const pct = total ? Math.round((done / total) * 100) : 0;
    document.getElementById('overall-fill').style.width = `${pct}%`;
    document.getElementById('overall-label').textContent = `${pct}%`;
    document.querySelector('.overall').title = `${done} of ${total} checklist items done`;
  }

  // ---------- scroll spy ----------
  function observeHeadings() {
    if (!('IntersectionObserver' in window)) return;
    const links = new Map();
    toc.querySelectorAll('a').forEach((a) => links.set(a.getAttribute('href').slice(1), a));
    const sectionOf = new Map();
    for (const s of sections) {
      sectionOf.set(s.id, s);
      for (const x of s.subs) sectionOf.set(x.id, s);
    }

    let activeSection = null;
    let activeLink = null;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((e) => e.isIntersecting);
      if (!visible.length) return;
      const top = visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0].target;
      const s = sectionOf.get(top.id);
      if (s && s !== activeSection) {
        activeSection?.tocItem.classList.remove('active');
        s.tocItem.classList.add('active');
        activeSection = s;
        if (!sidebar.classList.contains('open')) {
          s.tocItem.scrollIntoView({ block: 'nearest' });
        }
      }
      const link = links.get(top.id);
      if (link && link !== activeLink) {
        activeLink?.classList.remove('current');
        link.classList.add('current');
        activeLink = link;
      }
    }, { rootMargin: '-72px 0px -65% 0px' });

    content.querySelectorAll('h2, h3').forEach((h) => observer.observe(h));
  }

  // ---------- filter ----------
  document.getElementById('filter').addEventListener('input', (e) => {
    const q = e.target.value.trim().toLowerCase();
    toc.classList.toggle('filtering', Boolean(q));
    toc.querySelectorAll('.toc-item').forEach((item) => {
      item.hidden = q ? !item.dataset.search.includes(q) : false;
      item.querySelectorAll('.toc-sub li').forEach((li) => {
        li.hidden = q ? !li.textContent.toLowerCase().includes(q) && !item.querySelector('.toc-title').textContent.toLowerCase().includes(q) : false;
      });
    });
  });

  // ---------- theme ----------
  function effectiveTheme() {
    const set = document.documentElement.dataset.theme;
    if (set) return set;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  document.getElementById('theme-btn').addEventListener('click', () => {
    const next = effectiveTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    store.set(THEME_KEY, next);
  });

  // ---------- mobile menu ----------
  function openMenu() {
    sidebar.classList.add('open');
    scrim.hidden = false;
    menuBtn.setAttribute('aria-expanded', 'true');
  }
  function closeMenu() {
    sidebar.classList.remove('open');
    scrim.hidden = true;
    menuBtn.setAttribute('aria-expanded', 'false');
  }
  menuBtn.addEventListener('click', () => (sidebar.classList.contains('open') ? closeMenu() : openMenu()));
  scrim.addEventListener('click', closeMenu);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });

  // ---------- saving to the repo ----------
  let toastTimer;
  function toast(message) {
    let node = document.getElementById('toast');
    if (!node) {
      node = el('div', { id: 'toast', class: 'toast', role: 'status' });
      document.body.append(node);
    }
    node.textContent = message;
    node.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => node.classList.remove('show'), 4000);
  }

  function setSync(kind, detail = '') {
    const labels = {
      local: 'Browser only',
      saving: 'Saving…',
      pending: 'Pushing to GitHub…',
      synced: 'Saved to GitHub',
      error: 'Sync problem',
    };
    syncEl.hidden = false;
    syncEl.dataset.state = kind;
    syncEl.textContent = labels[kind];
    syncEl.title = detail || {
      local: 'No server found: ticks are stored in this browser only.',
      pending: 'Ticks are saved on the server and will be committed and pushed shortly.',
      synced: 'Every tick is committed to README.md and pushed to GitHub.',
    }[kind] || '';
  }

  async function postTask(box) {
    const res = await fetch('api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        index: Number(box.dataset.index),
        checked: box.checked,
        text: box.dataset.text,
        total: totalTasks,
      }),
    });
    if (res.status === 409) {
      toast('The plan changed since this page loaded. Reloading…');
      setTimeout(() => location.reload(), 1500);
      throw new Error('stale');
    }
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
  }

  async function saveToRepo(box) {
    setSync('saving');
    box.disabled = true;
    try {
      await postTask(box);
      setSync('pending');
    } catch (err) {
      if (err.message !== 'stale') {
        box.checked = !box.checked;
        box.closest('li')?.classList.toggle('done', box.checked);
        updateAllProgress();
        toast("Couldn't save that tick. Is the server running?");
        setSync('error', err.message);
      }
    } finally {
      box.disabled = false;
    }
  }

  async function fetchStatus() {
    try {
      const res = await fetch('api/status', { cache: 'no-store' });
      if (!res.ok) return null;
      const data = await res.json();
      return data && data.mode === 'git' ? data : null;
    } catch {
      return null;
    }
  }

  async function pollStatus() {
    const status = await fetchStatus();
    if (!status) setSync('error', 'The server is not responding.');
    else if (status.lastError) setSync('error', status.lastError);
    else if (status.pending) setSync('pending');
    else if (syncEl.dataset.state !== 'saving') setSync('synced');
  }

  // Ticks made before the repo was the source of truth: move them into README.md once.
  async function migrateBrowserTicks() {
    if (store.get(MIGRATED_KEY) || !Object.keys(progress).length) return;
    const boxes = Array.from(content.querySelectorAll('input[type="checkbox"][data-key]'))
      .filter((box) => progress[box.dataset.key] && !box.checked);
    try {
      for (const box of boxes) {
        box.checked = true;
        box.closest('li')?.classList.add('done');
        await postTask(box);
      }
    } catch {
      toast("Couldn't move your browser ticks into the repo yet. They'll be retried next time.");
      return;
    }
    store.set(MIGRATED_KEY, '1');
    store.remove(PROGRESS_KEY);
    progress = {};
    updateAllProgress();
    if (boxes.length) toast(`Moved ${boxes.length} tick${boxes.length === 1 ? '' : 's'} from this browser into the repo.`);
  }

  // ---------- export / import / reset ----------
  function applyProgressToBoxes() {
    content.querySelectorAll('input[type="checkbox"][data-key]').forEach((box) => {
      box.checked = Boolean(progress[box.dataset.key]);
      box.closest('li')?.classList.toggle('done', box.checked);
    });
    updateAllProgress();
  }

  document.getElementById('export-btn').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify({ version: 1, exported: new Date().toISOString(), progress }, null, 2)], { type: 'application/json' });
    const a = el('a', { href: URL.createObjectURL(blob), download: `roadmap-progress-${new Date().toISOString().slice(0, 10)}.json` });
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  });

  document.getElementById('import-input').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const data = JSON.parse(await file.text());
      const incoming = data && typeof data.progress === 'object' ? data.progress : data;
      if (!incoming || typeof incoming !== 'object') throw new Error('bad file');
      progress = { ...progress, ...incoming };
      saveProgress();
      applyProgressToBoxes();
    } catch {
      alert('That file does not look like a roadmap progress export.');
    }
    e.target.value = '';
  });

  document.getElementById('reset-btn').addEventListener('click', () => {
    if (!confirm('Clear every tick in this browser? Export first if you want a backup.')) return;
    progress = {};
    store.remove(PROGRESS_KEY);
    applyProgressToBoxes();
  });

  // ---------- boot ----------
  Promise.all([loadReadme(), fetchStatus()])
    .then(([md, status]) => {
      mode = status ? 'git' : 'local';
      render(md);
      if (mode === 'git') {
        document.getElementById('local-tools').hidden = true;
        document.getElementById('git-hint').hidden = false;
        setSync(status.lastError ? 'error' : status.pending ? 'pending' : 'synced', status.lastError || '');
        setInterval(pollStatus, 10000);
        migrateBrowserTicks();
      } else {
        setSync('local');
      }
      if (location.hash) {
        const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
        target?.scrollIntoView();
      }
    })
    .catch((err) => {
      content.innerHTML = '';
      content.append(el('p', { class: 'loading' }, [
        `${err.message}. `,
        el('a', { href: `${REPO_URL}#readme`, text: 'Read the plan on GitHub instead.' }),
      ]));
    });
})();
