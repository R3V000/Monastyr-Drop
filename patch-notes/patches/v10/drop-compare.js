(function () {
  const data = window.DROP_COMPARE_DATA;
  const lobbyView = document.getElementById('lobbyView');
  const appView = document.getElementById('appView');
  const pageHeader = document.querySelector('.page-header');
  const cardsRoot = document.getElementById('cards');
  const placeholderView = document.getElementById('placeholderView');
  const searchInput = document.getElementById('searchInput');
  const dialog = document.getElementById('detailsDialog');
  const dialogTitle = document.getElementById('dialogTitle');
  const dialogBody = document.getElementById('dialogBody');
  const closeDialog = document.getElementById('closeDialog');
  const imageDialog = document.getElementById('imageDialog');
  const fullImage = document.getElementById('fullImage');
  const closeImageDialog = document.getElementById('closeImageDialog');

  const views = {
    metiny: {
      title: 'Metiny',
      searchPlaceholder: 'Szukaj metina',
      empty: '',
    },
    dungeony: {
      title: 'Dungeony',
      searchPlaceholder: 'Szukaj dungeonu',
      empty: '',
    },
  };
  const dungeons = [
    {
      title: 'Wieża Orków',
      boss: 'Odrodzony Wódz Orków',
      dailyLimit: 40,
      bossImage: 'images/Odrodzony_Wódz_Orków.png',
      dropImage: 'dungoeny/wieza_orkow.png',
      note: 'Drop to średnia ilość na bazie symulacji ogromnych liczb. Yangi są pokazane na bazie ekwipunku zawierającego bonus: Szansa na podwójną ilość Yang oraz Monetą Szczęścia.',
    },
    {
      title: 'Komnata Baronówny',
      boss: 'Baronówna Pająków',
      dailyLimit: 30,
      bossImage: 'images/250px-Baronówna_Pająków.png',
      dropImage: 'dungoeny/komnata_baronowny.png',
      note: 'Drop to średnia ilość na bazie symulacji ogromnych liczb. Yangi są pokazane na bazie ekwipunku zawierającego bonus: Szansa na podwójną ilość Yang oraz Monetą Szczęścia.',
    },
    {
      title: 'Wieża Demonów',
      boss: 'Umarły Rozpruwacz',
      dailyLimit: 25,
      bossImage: 'images/Umarły_Rozpruwacz.png',
      dropImage: 'dungoeny/wieza_demonow.png',
      note: 'Drop to średnia ilość na bazie symulacji ogromnych liczb. Yangi są pokazane na bazie ekwipunku zawierającego bonus: Szansa na podwójną ilość Yang oraz Monetą Szczęścia.',
    },
    {
      title: 'Diabelskie Katakumby',
      boss: 'Azrael',
      dailyLimit: 20,
      bossImage: 'images/Azrael.png',
      dropImage: 'dungoeny/diabelskie_katakumby.png',
      note: 'Drop to średnia ilość na bazie symulacji ogromnych liczb. Yangi są pokazane na bazie ekwipunku zawierającego bonus: Szansa na podwójną ilość Yang oraz Monetą Szczęścia.',
    },
    {
      title: 'Komnata Smoka',
      boss: 'Beran-Setaou',
      dailyLimit: 15,
      bossImage: 'images/Beran-Setaou.png',
      dropImage: 'dungoeny/komnata_smoka.png',
      note: 'Drop to średnia ilość na bazie symulacji ogromnych liczb. Yangi są pokazane na bazie ekwipunku zawierającego bonus: Szansa na podwójną ilość Yang oraz Monetą Szczęścia.',
    },
    {
      title: 'Twierdza Razadora',
      boss: 'Razador',
      dailyLimit: 10,
      bossImage: 'images/Razador.png',
      dropImage: 'dungoeny/twierdza_razadora.png',
      note: 'Drop to średnia ilość na bazie symulacji ogromnych liczb. Yangi są pokazane na bazie ekwipunku zawierającego bonus: Szansa na podwójną ilość Yang oraz Monetą Szczęścia.',
    },
  ];

  const formatter = new Intl.NumberFormat('pl-PL', {
    maximumFractionDigits: 1,
  });

  function fmt(value) {
    return formatter.format(value);
  }

  function fmtDelta(value) {
    if (value === null || Number.isNaN(value)) {
      return '0%';
    }
    if (Math.abs(value) < 0.05) {
      return '0%';
    }
    return `${value > 0 ? '+' : ''}${fmt(value)}%`;
  }

  function deltaClass(value) {
    if (value > 0) return 'up';
    if (value < 0) return 'down';
    return 'flat';
  }

  function renderCards(vnums) {
    if (!data || !Array.isArray(data.vnums)) {
      cardsRoot.innerHTML = '<div class="empty">Brak danych porównania.</div>';
      return;
    }

    if (!vnums.length) {
      cardsRoot.innerHTML = '<div class="empty">Brak wyników dla filtra.</div>';
      return;
    }

    cardsRoot.innerHTML = vnums.map(renderSection).join('');
    cardsRoot.querySelectorAll('[data-open-details]').forEach((button) => {
      button.addEventListener('click', () => {
        const vnum = data.vnums.find((entry) => entry.vnum === button.dataset.openDetails);
        if (vnum) {
          openDetails(vnum);
        }
      });
    });
    bindFullImageTriggers(cardsRoot);
  }

  function bindFullImageTriggers(root) {
    root.querySelectorAll('[data-full-image]').forEach((frame) => {
      frame.addEventListener('click', () => {
        openImage(frame.dataset.fullImage, frame.dataset.fullAlt);
      });
    });
  }

  function renderSection(vnum) {
    return `
      <section class="metin-section" data-vnum="${escapeHtml(vnum.vnum)}">
        <h2>${escapeHtml(vnum.label)}</h2>

        <div class="compare-row">
          <figure class="shot">
            <figcaption>Przed</figcaption>
            <button class="image-frame" type="button" data-full-image="${escapeHtml(vnum.beforeImage)}" data-full-alt="${escapeHtml(vnum.label)} przed">
              <img src="${escapeHtml(vnum.beforeImage)}" alt="${escapeHtml(vnum.label)} przed" loading="lazy">
              <span class="crop-note">Podgląd przycięty. Kliknij obrazek, aby zobaczyć całość.</span>
            </button>
          </figure>

          <figure class="shot">
            <figcaption>Po</figcaption>
            <button class="image-frame" type="button" data-full-image="${escapeHtml(vnum.afterImage)}" data-full-alt="${escapeHtml(vnum.label)} po">
              <img src="${escapeHtml(vnum.afterImage)}" alt="${escapeHtml(vnum.label)} po" loading="lazy">
              <span class="crop-note">Podgląd przycięty. Kliknij obrazek, aby zobaczyć całość.</span>
            </button>
          </figure>
        </div>

        <div class="details-actions">
          <button class="details-button" type="button" data-open-details="${escapeHtml(vnum.vnum)}">
            ZOBACZ SZCZEGÓŁY
          </button>
        </div>
      </section>
    `;
  }

  function openImage(src, alt) {
    fullImage.src = src;
    fullImage.alt = alt || '';

    if (typeof imageDialog.showModal === 'function') {
      imageDialog.showModal();
    } else {
      imageDialog.setAttribute('open', '');
    }
  }

  function openDetails(vnum) {
    dialogTitle.textContent = vnum.label;
    dialogBody.innerHTML = `
      <div class="changes-list">
        ${vnum.items.map(renderItemChange).join('')}
      </div>
    `;

    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
    }
  }

  function renderItemChange(item) {
    const klass = deltaClass(item.percent);
    return `
      <div class="change-row">
        <span>${escapeHtml(item.name || 'Item')}</span>
        <strong class="${klass}">${fmtDelta(item.percent)}</strong>
      </div>
    `;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function applyFilter() {
    if (!data || !Array.isArray(data.vnums)) {
      cardsRoot.innerHTML = '<div class="empty">Brak danych porównania.</div>';
      return;
    }

    const query = searchInput.value.trim().toLowerCase();
    const filtered = query
      ? data.vnums.filter((vnum) => `${vnum.vnum} ${vnum.label}`.toLowerCase().includes(query))
      : data.vnums;

    renderCards(filtered);
  }

  function showLobby() {
    lobbyView.hidden = false;
    appView.hidden = true;
    searchInput.value = '';
  }

  function showView(viewName) {
    const view = views[viewName];
    if (!view) {
      showLobby();
      return;
    }

    lobbyView.hidden = true;
    appView.hidden = false;
    pageHeader.hidden = viewName !== 'metiny';
    cardsRoot.hidden = viewName !== 'metiny';
    placeholderView.hidden = viewName === 'metiny';
    searchInput.placeholder = view.searchPlaceholder;
    searchInput.value = '';

    if (viewName === 'metiny') {
      applyFilter();
      return;
    }

    if (viewName === 'dungeony') {
      renderDungeons();
      return;
    }

    placeholderView.innerHTML = `
      <div class="placeholder-panel">
        <h2>${escapeHtml(view.title)}</h2>
        <p>${escapeHtml(view.empty)}</p>
        <button class="lobby-return" type="button" data-go-lobby>Wróć do wyboru</button>
      </div>
    `;
    placeholderView.querySelector('[data-go-lobby]').addEventListener('click', () => {
      history.pushState('', document.title, window.location.pathname + window.location.search);
      showLobby();
    });
  }

  function renderDungeons() {
    placeholderView.innerHTML = `
      <section class="dungeon-view">
        ${dungeons.map(renderDungeon).join('')}
        <button class="lobby-return" type="button" data-go-lobby>Wróć do wyboru</button>
      </section>
    `;
    bindFullImageTriggers(placeholderView);
    placeholderView.querySelector('[data-go-lobby]').addEventListener('click', () => {
      history.pushState('', document.title, window.location.pathname + window.location.search);
      showLobby();
    });
  }

  function renderDungeon(dungeon) {
    return `
      <article class="dungeon-entry">
        <div class="dungeon-hero">
          <div class="dungeon-info">
            <p class="lobby-kicker">Dungeon</p>
            <h2>${escapeHtml(dungeon.title)}</h2>
            <dl class="dungeon-facts">
              <div>
                <dt>Boss</dt>
                <dd>${escapeHtml(dungeon.boss)}</dd>
              </div>
              <div>
                <dt>Limit wejść na dobę</dt>
                <dd>${escapeHtml(String(dungeon.dailyLimit))}</dd>
              </div>
            </dl>
            <p class="dungeon-note">${escapeHtml(dungeon.note)}</p>
          </div>

          <button class="dungeon-boss-frame" type="button" data-full-image="${escapeHtml(dungeon.bossImage)}" data-full-alt="${escapeHtml(dungeon.boss)}">
            <img src="${escapeHtml(dungeon.bossImage)}" alt="${escapeHtml(dungeon.boss)}" loading="lazy">
          </button>
        </div>

        <section class="dungeon-drop">
          <h3>Przykładowy drop z limitu</h3>
          <button class="dungeon-drop-frame" type="button" data-full-image="${escapeHtml(dungeon.dropImage)}" data-full-alt="Przykładowy drop z limitu - ${escapeHtml(dungeon.title)}">
            <img src="${escapeHtml(dungeon.dropImage)}" alt="Przykładowy drop z limitu - ${escapeHtml(dungeon.title)}" loading="lazy">
          </button>
        </section>
      </article>
    `;
  }

  function routeFromHash() {
    const viewName = window.location.hash.replace(/^#/, '');
    if (!viewName) {
      showLobby();
      return;
    }
    showView(viewName);
  }

  closeDialog.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) {
      dialog.close();
    }
  });
  closeImageDialog.addEventListener('click', () => imageDialog.close());
  imageDialog.addEventListener('click', (event) => {
    if (event.target === imageDialog) {
      imageDialog.close();
    }
  });
  searchInput.addEventListener('input', applyFilter);
  document.querySelectorAll('[data-view]').forEach((button) => {
    button.addEventListener('click', () => {
      window.location.hash = button.dataset.view;
    });
  });
  window.addEventListener('hashchange', routeFromHash);
  routeFromHash();
})();
