// Renders roadmap.excalidraw into the page with Excalidraw's own exporter.
// The .excalidraw file is the source: edit it on excalidraw.com and the site follows.
(() => {
  'use strict';

  const EXCALIDRAW = 'https://cdn.jsdelivr.net/npm/@excalidraw/excalidraw@0.17.6/dist/';
  const LIBS = [
    'https://cdn.jsdelivr.net/npm/react@18.2.0/umd/react.production.min.js',
    'https://cdn.jsdelivr.net/npm/react-dom@18.2.0/umd/react-dom.production.min.js',
    `${EXCALIDRAW}excalidraw.production.min.js`,
  ];

  let scene = null;
  let viewport = null;
  let natural = 0;
  let scale = 1;
  let fitted = true;

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      s.onerror = () => reject(new Error(`Could not load ${src}`));
      document.head.append(s);
    });
  }

  async function loadLibs() {
    if (window.ExcalidrawLib) return;
    window.EXCALIDRAW_ASSET_PATH = EXCALIDRAW; // fonts (Virgil) come from the same CDN
    for (const src of LIBS) await loadScript(src);
  }

  async function loadScene() {
    for (const path of ['roadmap.excalidraw', '../roadmap.excalidraw']) {
      try {
        const res = await fetch(path, { cache: 'no-cache' });
        if (res.ok) return await res.json();
      } catch { /* try next */ }
    }
    throw new Error('Could not load roadmap.excalidraw');
  }

  function isDark() {
    const set = document.documentElement.dataset.theme;
    if (set) return set === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function applyScale() {
    const svg = viewport.querySelector('svg');
    if (!svg) return;
    if (fitted) scale = Math.min(1, (viewport.clientWidth - 2) / natural);
    svg.style.width = `${Math.round(natural * scale)}px`;
    svg.style.height = 'auto';
    viewport.dataset.zoom = `${Math.round(scale * 100)}%`;
    const label = document.getElementById('map-zoom');
    if (label) label.textContent = `${Math.round(scale * 100)}%`;
  }

  // Phase titles and Back to Basics boxes jump to their section in the plan.
  function linkTexts(svg) {
    svg.querySelectorAll('text').forEach((t) => {
      const line = t.textContent.trim();
      let target = null;
      const phase = line.match(/^PHASE (\d)/);
      if (phase) {
        target = Array.from(document.querySelectorAll('.plan-section > h2'))
          .find((h) => h.dataset.title?.startsWith(`Phase ${phase[1]}:`));
      } else if (/^(B[1-6] ·|BACK TO BASICS|LeetCode)/.test(line)) {
        target = document.getElementById('back-to-basics-saturday');
      } else if (/^AT WORK/.test(line)) {
        target = document.querySelector('[id^="9-growing-your-devops-job"]');
      }
      if (!target) return;
      t.classList.add('map-link');
      t.addEventListener('click', (e) => {
        e.stopPropagation();
        if (document.fullscreenElement) document.exitFullscreen();
        target.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }

  async function draw() {
    const svg = await window.ExcalidrawLib.exportToSvg({
      elements: scene.elements,
      appState: {
        ...scene.appState,
        exportBackground: true,
        exportWithDarkMode: isDark(),
        viewBackgroundColor: scene.appState?.viewBackgroundColor || '#ffffff',
      },
      files: scene.files || {},
      exportPadding: 24,
    });
    natural = parseFloat(svg.getAttribute('width'));
    svg.removeAttribute('width');
    svg.removeAttribute('height');
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', 'Visual map of the roadmap: phases 0 to 6, the Back to Basics Saturday track, and what to do at work');
    viewport.replaceChildren(svg);
    linkTexts(svg);
    applyScale();
  }

  function zoom(factor) {
    fitted = false;
    const cx = (viewport.scrollLeft + viewport.clientWidth / 2) / scale;
    const cy = (viewport.scrollTop + viewport.clientHeight / 2) / scale;
    scale = Math.min(3, Math.max(0.2, scale * factor));
    applyScale();
    viewport.scrollLeft = cx * scale - viewport.clientWidth / 2;
    viewport.scrollTop = cy * scale - viewport.clientHeight / 2;
  }

  function enablePan() {
    let start = null;
    viewport.addEventListener('pointerdown', (e) => {
      if (e.button !== 0 || e.target.closest('.map-link')) return;
      start = { x: e.clientX, y: e.clientY, left: viewport.scrollLeft, top: viewport.scrollTop };
      viewport.setPointerCapture(e.pointerId);
      viewport.classList.add('panning');
    });
    viewport.addEventListener('pointermove', (e) => {
      if (!start) return;
      viewport.scrollLeft = start.left - (e.clientX - start.x);
      viewport.scrollTop = start.top - (e.clientY - start.y);
    });
    const end = () => { start = null; viewport.classList.remove('panning'); };
    viewport.addEventListener('pointerup', end);
    viewport.addEventListener('pointercancel', end);
  }

  function button(label, title, onClick) {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = label;
    b.title = title;
    b.setAttribute('aria-label', title);
    b.addEventListener('click', onClick);
    return b;
  }

  // Called by app.js once the plan is rendered. Returns the section element.
  window.RoadmapMap = function mount() {
    const section = document.createElement('section');
    section.className = 'map-section';
    section.id = 'visual-map';
    section.setAttribute('aria-labelledby', 'visual-map-title');

    const head = document.createElement('div');
    head.className = 'map-head';
    const h2 = document.createElement('h2');
    h2.id = 'visual-map-title';
    h2.textContent = 'Visual map';
    const tools = document.createElement('div');
    tools.className = 'map-tools';
    const fullscreen = button('', 'Full screen', () => {
      if (document.fullscreenElement) document.exitFullscreen();
      else section.requestFullscreen?.();
    });
    fullscreen.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    const zoomLabel = document.createElement('span');
    zoomLabel.id = 'map-zoom';
    zoomLabel.className = 'map-zoom';
    tools.append(
      button('−', 'Zoom out', () => zoom(1 / 1.25)),
      zoomLabel,
      button('+', 'Zoom in', () => zoom(1.25)),
      button('Fit', 'Fit to width', () => { fitted = true; applyScale(); viewport.scrollTo(0, 0); }),
      fullscreen,
    );
    head.append(h2, tools);

    viewport = document.createElement('div');
    viewport.className = 'map-viewport';
    viewport.tabIndex = 0;
    viewport.innerHTML = '<p class="loading">Drawing the map…</p>';

    const note = document.createElement('p');
    note.className = 'map-note';
    note.innerHTML = 'Click a phase to jump to it. Drag to pan. The source is <code>roadmap.excalidraw</code> in the repo: open it at <a href="https://excalidraw.com" target="_blank" rel="noopener noreferrer">excalidraw.com</a>, edit, save it back, and this map updates.';

    section.append(head, viewport, note);
    enablePan();

    Promise.all([loadScene(), loadLibs()])
      .then(([data]) => { scene = data; return draw(); })
      .catch((err) => { viewport.innerHTML = `<p class="loading">${err.message}</p>`; });

    window.addEventListener('resize', () => { if (fitted) applyScale(); });
    document.addEventListener('fullscreenchange', () => { fitted = true; applyScale(); });
    // Redraw when the theme changes, so the map follows light/dark.
    new MutationObserver(() => scene && draw()).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => scene && draw());

    return section;
  };
})();
