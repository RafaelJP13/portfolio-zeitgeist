(() => {
  const chips = [...document.querySelectorAll('.chip')];
  const companies = [...document.querySelectorAll('.company')];
  const entries = [...document.querySelectorAll('.entry')];
  const status = document.getElementById('filter-status');
  const clearBtn = document.getElementById('filter-clear');
  const total = entries.length;

  // Cada entrada herda os tokens das suas tags (data-token).
  const tokensOf = (el) =>
    new Set(
      [...el.querySelectorAll('.tag[data-token]')].flatMap((t) =>
        t.dataset.token.split(' ')
      )
    );

  const entryTokens = new Map(entries.map((e) => [e, tokensOf(e)]));
  const labelOf = (token) =>
    chips.find((c) => c.dataset.filter === token)?.textContent.trim() ?? token;

  function apply(token) {
    let shown = 0;

    entries.forEach((entry) => {
      const match = !token || entryTokens.get(entry).has(token);
      entry.classList.toggle('is-dim', !match);
      if (match) shown++;

      entry.querySelectorAll('.tag').forEach((tag) => {
        const hit =
          !!token && (tag.dataset.token || '').split(' ').includes(token);
        tag.classList.toggle('is-hit', hit);
      });
    });

    companies.forEach((company) => {
      const hasMatch = !!company.querySelector('.entry:not(.is-dim)');
      company.classList.toggle('is-dim', !hasMatch);
    });

    chips.forEach((chip) =>
      chip.setAttribute('aria-pressed', String(chip.dataset.filter === token))
    );

    status.textContent = token
      ? `Mostrando ${shown} de ${total} trabalhos que usam ${labelOf(token)}.`
      : 'Mostrando todos os trabalhos.';
    clearBtn.hidden = !token;

    const url = new URL(window.location.href);
    if (token) url.searchParams.set('tec', token);
    else url.searchParams.delete('tec');
    history.replaceState(null, '', url);
  }

  let active = null;

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      active = active === chip.dataset.filter ? null : chip.dataset.filter;
      apply(active);
    });
  });

  clearBtn.addEventListener('click', () => {
    active = null;
    apply(null);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && active) {
      active = null;
      apply(null);
    }
  });

  // Permite compartilhar um link já filtrado, por exemplo ?tec=laravel
  const initial = new URLSearchParams(window.location.search).get('tec');
  if (initial && chips.some((c) => c.dataset.filter === initial)) {
    active = initial;
    apply(active);
  }
})();
