(() => {
  // --- Pomocnicze: zamiana tekstu na "slug"
  const slug = (s) =>
    s
      .toString()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // usuń ogonki
      .toLowerCase()
      .replace(/&/g, ' and ')
      .replace(/[^a-z0-9]+/g, '-')     // spacje/znaki -> "-"
      .replace(/^-+|-+$/g, '');

  // --- Zbieramy karty i normalizujemy ich tagi
  const cards = Array.from(document.querySelectorAll('.project-card'));
  const getContainer = (card) => card.closest('.project-link') || card; // ukrywamy cały kafel (a lub article)

  cards.forEach(card => {
    const fromAttr = card.getAttribute('data-tag') || '';
    const fromBadges = Array.from(card.querySelectorAll('.tag')).map(el => el.textContent || '');
    // dziel po przecinkach/slashach/pionowych kreskach/kropce środka
    const raw = [fromAttr, ...fromBadges].join(' / ');
    const parts = raw.split(/[,/|·]+/).map(s => s.trim()).filter(Boolean);

    const norm = new Set(parts.map(slug));
    card.__tags = norm; // zapisz zestaw tagów na karcie
  });

  // --- Funkcja filtra
  const applyFilter = (key) => {
    const active = slug(key || 'all');
    cards.forEach(card => {
      const cont = getContainer(card);
      if (active === 'all' || card.__tags?.has(active)) {
        cont.style.display = '';
      } else {
        cont.style.display = 'none';
      }
    });
  };

  // --- Obsługa chipów
  const chipsWrap = document.querySelector('.filters');
  const chips = Array.from(document.querySelectorAll('.filters .chip'));

  const setActiveChip = (hrefHash) => {
    const wanted = (hrefHash || '#all').toLowerCase();
    chips.forEach(a => a.classList.toggle('is-active', a.getAttribute('href').toLowerCase() === wanted));
  };

  if (chipsWrap) {
    chipsWrap.addEventListener('click', (e) => {
      const a = e.target.closest('.chip');
      if (!a) return;
      e.preventDefault();
      const hash = a.getAttribute('href') || '#all';
      const key = hash.replace(/^#/, '');
      setActiveChip(hash);
      history.replaceState(null, '', '#' + key);
      applyFilter(key);
    });
  }

  // --- Start: filtruj po hashu jeśli jest
  const initial = (location.hash || '#all').replace(/^#/, '');
  setActiveChip('#' + initial);
  applyFilter(initial);
})();
