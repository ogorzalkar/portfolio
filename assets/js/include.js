// assets/js/include.js
(function () {
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(async function () {
    const nodes = document.querySelectorAll('[data-include]');
    if (!nodes.length) return;

    await Promise.all(
      Array.from(nodes).map(async (node) => {
        const url = node.getAttribute('data-include');
        try {
          // unikamy cache podczas pracy lokalnie
          const res = await fetch(url + (url.includes('?') ? '&' : '?') + 'v=' + Date.now(), { cache: 'no-store' });
          if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
          const html = await res.text();
          node.outerHTML = html; // wstawiamy stopkę zamiast placeholdera
        } catch (err) {
          console.error('Include failed:', url, err);
          node.innerHTML = `<div style="color:#c00; font:12px/1.4 monospace">Include failed: ${url}</div>`;
        }
      })
    );
  });
})();
