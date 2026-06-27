(function () {
  "use strict";

  var DROP_SCALE = 206;
  var CUSTOM_ITEMS_STORAGE_KEY = "monastyr-drop-writer-custom-items-v1";
  var FAVORITE_ITEMS_STORAGE_KEY = "monastyr-item-favorites-v1";
  var itemDb = Array.isArray(window.ITEM_DATABASE) ? window.ITEM_DATABASE.slice() : [];
  var defaultItemVnums = new Set();
  var customItems = [];
  var favoriteVnums = new Set();
  var rows = [];
  var draggedRowId = null;

  var els = {
    groupName: document.getElementById("groupName"),
    mobVnum: document.getElementById("mobVnum"),
    mobVnumLabel: document.getElementById("mobVnumLabel"),
    mobComment: document.getElementById("mobComment"),
    mobCommentLabel: document.getElementById("mobCommentLabel"),
    levelLimitField: document.getElementById("levelLimitField"),
    useLevelLimit: document.getElementById("useLevelLimit"),
    levelLimit: document.getElementById("levelLimit"),
    importDropText: document.getElementById("importDropText"),
    importDrop: document.getElementById("importDrop"),
    clearImportDrop: document.getElementById("clearImportDrop"),
    itemSearch: document.getElementById("itemSearch"),
    itemCatalog: document.getElementById("itemCatalog"),
    customItemForm: document.getElementById("customItemForm"),
    customItemCount: document.getElementById("customItemCount"),
    favoriteItemCount: document.getElementById("favoriteItemCount"),
    exportFavorites: document.getElementById("exportFavorites"),
    importFavoritesFile: document.getElementById("importFavoritesFile"),
    clearFavorites: document.getElementById("clearFavorites"),
    customVnum: document.getElementById("customVnum"),
    customName: document.getElementById("customName"),
    customIcon: document.getElementById("customIcon"),
    clearCustomItems: document.getElementById("clearCustomItems"),
    dropRows: document.getElementById("dropRows"),
    rowCount: document.getElementById("rowCount"),
    chanceColumnLabel: document.getElementById("chanceColumnLabel"),
    valueColumnLabel: document.getElementById("valueColumnLabel"),
    clearRows: document.getElementById("clearRows"),
    sampleSize: document.getElementById("sampleSize"),
    averageChart: document.getElementById("averageChart"),
    totalAverage: document.getElementById("totalAverage"),
    dropPreview: document.getElementById("dropPreview"),
    previewMeta: document.getElementById("previewMeta"),
    outputText: document.getElementById("outputText"),
    copyOutput: document.getElementById("copyOutput"),
    outputMeta: document.getElementById("outputMeta"),
    scaleHint: document.getElementById("scaleHint"),
    toast: document.getElementById("toast")
  };

  function defaultIconForVnum(vnum) {
    return "../assets/item-icons/" + encodeURIComponent(String(vnum || "").trim()) + ".png";
  }

  function normalizeItem(item) {
    var vnum = String(item.vnum || "").trim();
    return {
      vnum: vnum,
      name: String(item.name || "Item " + vnum).trim(),
      icon: String(item.icon || defaultIconForVnum(vnum)).trim()
    };
  }

  itemDb = itemDb.map(normalizeItem).filter(function (item) {
    return item.vnum;
  });
  defaultItemVnums = new Set(itemDb.map(function (item) {
    return item.vnum;
  }));

  function readCustomItems() {
    try {
      var parsed = JSON.parse(window.localStorage.getItem(CUSTOM_ITEMS_STORAGE_KEY) || "[]");
      return Array.isArray(parsed) ? parsed.map(normalizeItem).filter(function (item) {
        return item.vnum;
      }) : [];
    } catch (error) {
      return [];
    }
  }

  function writeCustomItems() {
    try {
      window.localStorage.setItem(CUSTOM_ITEMS_STORAGE_KEY, JSON.stringify(customItems));
    } catch (error) {
      showToast("Nie udało się zapisać lokalnej bazy itemów");
    }
  }

  function normalizeFavoriteVnum(value) {
    var vnum = sanitizeInline(value);
    return /^\d+$/.test(vnum) ? vnum : "";
  }

  function parseFavoriteSource(source) {
    var parsed = null;
    try {
      parsed = JSON.parse(source);
    } catch (error) {
      parsed = null;
    }

    var values = [];
    if (Array.isArray(parsed)) {
      values = parsed;
    } else if (parsed && Array.isArray(parsed.vnums)) {
      values = parsed.vnums;
    } else if (parsed && Array.isArray(parsed.favorites)) {
      values = parsed.favorites;
    } else if (parsed && Array.isArray(parsed.items)) {
      values = parsed.items.map(function (item) {
        return typeof item === "object" && item ? item.vnum : item;
      });
    } else {
      values = String(source || "").split(/[\s,;]+/);
    }

    return values.map(normalizeFavoriteVnum).filter(Boolean);
  }

  function readFavoriteVnums() {
    try {
      return new Set(parseFavoriteSource(window.localStorage.getItem(FAVORITE_ITEMS_STORAGE_KEY) || "[]"));
    } catch (error) {
      return new Set();
    }
  }

  function writeFavoriteVnums() {
    try {
      window.localStorage.setItem(FAVORITE_ITEMS_STORAGE_KEY, JSON.stringify(Array.from(favoriteVnums)));
    } catch (error) {
      showToast("Nie udało się zapisać ulubionych itemów");
    }
  }

  function sortVnums(values) {
    return values.slice().sort(function (a, b) {
      return toNumber(a, 0) - toNumber(b, 0);
    });
  }

  function renderFavoriteItemCount() {
    if (!els.favoriteItemCount) {
      return;
    }

    var count = favoriteVnums.size;
    els.favoriteItemCount.textContent = count === 1 ? "1 ulubiony" : count + " ulubionych";
    if (els.clearFavorites) {
      els.clearFavorites.disabled = count === 0;
    }
  }

  function upsertItem(item, persist) {
    var normalized = normalizeItem(item);
    var existingIndex = itemDb.findIndex(function (entry) {
      return entry.vnum === normalized.vnum;
    });

    if (existingIndex >= 0) {
      itemDb[existingIndex] = normalized;
    } else {
      itemDb.unshift(normalized);
    }

    if (persist && !defaultItemVnums.has(normalized.vnum)) {
      var customIndex = customItems.findIndex(function (entry) {
        return entry.vnum === normalized.vnum;
      });

      if (customIndex >= 0) {
        customItems[customIndex] = normalized;
      } else {
        customItems.unshift(normalized);
      }

      writeCustomItems();
    }

    return normalized;
  }

  function loadCustomItems() {
    customItems = readCustomItems();
    customItems.forEach(function (item) {
      upsertItem(item, false);
    });
  }

  function renderCustomItemCount() {
    if (!els.customItemCount) {
      return;
    }

    var count = customItems.length;
    els.customItemCount.textContent = count === 1 ? "1 lokalny item" : count + " lokalnych itemów";
    if (els.clearCustomItems) {
      els.clearCustomItems.disabled = count === 0;
    }
  }

  loadCustomItems();
  favoriteVnums = readFavoriteVnums();

  function normalizeDropType(type) {
    var normalized = sanitizeInline(type).toLowerCase();
    if (normalized === "limit" || normalized === "special_item_group") {
      return normalized;
    }
    return "drop";
  }

  function isSpecialItemGroup(type) {
    return normalizeDropType(type || getDropType()) === "special_item_group";
  }

  function getDropType() {
    var checked = document.querySelector("input[name='dropType']:checked");
    return checked ? normalizeDropType(checked.value) : "drop";
  }

  function setDropType(type) {
    var normalized = normalizeDropType(type);
    var input = document.querySelector("input[name='dropType'][value='" + normalized + "']");
    if (input) {
      input.checked = true;
    }
  }

  function getItem(vnum) {
    var id = String(vnum);
    return itemDb.find(function (item) {
      return item.vnum === id;
    }) || {
      vnum: id,
      name: "Item " + id,
      icon: defaultIconForVnum(id)
    };
  }

  function ensureItem(vnum, comment) {
    var id = String(vnum);
    var found = itemDb.find(function (item) {
      return item.vnum === id;
    });

    if (found) {
      return found;
    }

    var item = {
      vnum: id,
      name: sanitizeInline(comment) || "Item " + id,
      icon: defaultIconForVnum(id)
    };
    return upsertItem(item, true);
  }

  function makeRow(item) {
    return {
      id: "row-" + Date.now() + "-" + Math.random().toString(16).slice(2),
      vnum: item.vnum,
      count: 1,
      percent: 100,
      comment: item.name
    };
  }

  function toNumber(value, fallback) {
    var number = Number(String(value).replace(",", "."));
    return Number.isFinite(number) ? number : fallback;
  }

  function formatDecimal(value, maxDecimals) {
    var factor = Math.pow(10, maxDecimals);
    var rounded = Math.round((value + Number.EPSILON) * factor) / factor;
    return rounded.toFixed(maxDecimals).replace(/\.?0+$/, "").replace(".", ",");
  }

  function formatCodeNumber(value) {
    var rounded = Math.round((value + Number.EPSILON) * 100) / 100;
    return rounded.toFixed(2).replace(/\.?0+$/, "");
  }

  function chanceValue(percent) {
    var cleanPercent = toNumber(percent, 0);
    var type = getDropType();
    if (type === "drop") {
      return String(Math.floor((cleanPercent / 100) * DROP_SCALE));
    }
    return formatCodeNumber(cleanPercent);
  }

  function chanceToPercent(chance, type) {
    var cleanChance = toNumber(chance, 0);
    var normalizedType = normalizeDropType(type);
    if (normalizedType === "drop") {
      return formatCodeNumber((cleanChance / DROP_SCALE) * 100);
    }
    return formatCodeNumber(cleanChance);
  }

  function getSpecialTotalWeight() {
    return rows.reduce(function (sum, row) {
      return sum + Math.max(0, toNumber(row.percent, 0));
    }, 0);
  }

  function getActualPercent(row, type, totalWeight) {
    if (isSpecialItemGroup(type)) {
      var weight = Math.max(0, toNumber(row.percent, 0));
      return totalWeight > 0 ? (weight / totalWeight) * 100 : 0;
    }
    return toNumber(row.percent, 0);
  }

  function displayChanceValue(row, type, totalWeight) {
    if (isSpecialItemGroup(type)) {
      return formatDecimal(getActualPercent(row, type, totalWeight), 2) + "%";
    }
    return chanceValue(row.percent);
  }

  function averageQuantity(row, sample) {
    var count = toNumber(row.count, 0);
    var percent = getActualPercent(row, getDropType(), getSpecialTotalWeight());
    return sample * count * (percent / 100);
  }

  function sanitizeInline(value) {
    return String(value || "").replace(/[\r\n\t]+/g, " ").trim();
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderIcon(item) {
    return [
      '<span class="item-slot" title="' + escapeHtml(item.vnum) + '">',
      '<span class="slot-fallback">' + escapeHtml(item.vnum) + "</span>",
      '<img src="' + escapeHtml(item.icon) + '" alt="" loading="lazy" onerror="this.remove()">',
      "</span>"
    ].join("");
  }

  function renderCatalog() {
    var query = sanitizeInline(els.itemSearch.value).toLowerCase();
    var visible = itemDb.map(function (item, index) {
      return {
        item: item,
        index: index
      };
    }).filter(function (entry) {
      return !query || entry.item.vnum.includes(query) || entry.item.name.toLowerCase().includes(query);
    }).sort(function (a, b) {
      var favoriteA = favoriteVnums.has(a.item.vnum) ? 1 : 0;
      var favoriteB = favoriteVnums.has(b.item.vnum) ? 1 : 0;
      if (favoriteA !== favoriteB) {
        return favoriteB - favoriteA;
      }
      return a.index - b.index;
    }).map(function (entry) {
      return entry.item;
    });

    els.itemCatalog.innerHTML = visible.map(function (item) {
      var favorite = favoriteVnums.has(item.vnum);
      return [
        '<article class="catalog-item' + (favorite ? " favorite" : "") + '">',
        '<button class="catalog-add" type="button" data-vnum="' + escapeHtml(item.vnum) + '">',
        renderIcon(item),
        '<span class="catalog-name">',
        "<strong>" + escapeHtml(item.name) + "</strong>",
        "<small>" + escapeHtml(item.vnum) + "</small>",
        "</span>",
        "</button>",
        '<button class="favorite-toggle" type="button" data-favorite-vnum="' + escapeHtml(item.vnum) + '" aria-pressed="' + (favorite ? "true" : "false") + '" title="' + (favorite ? "Usuń z ulubionych" : "Dodaj do ulubionych") + '">',
        favorite ? "&#9733;" : "&#9734;",
        "</button>",
        "</article>"
      ].join("");
    }).join("");

    if (!visible.length) {
      els.itemCatalog.innerHTML = '<div class="empty-state">Brak itemów</div>';
    }

    renderFavoriteItemCount();
  }

  function renderRows() {
    var type = getDropType();
    var totalWeight = getSpecialTotalWeight();
    var chanceLabel = isSpecialItemGroup(type) ? "Waga" : "Szansa %";
    var valueLabel = isSpecialItemGroup(type) ? "Realna %" : "Wartość";

    els.rowCount.textContent = rows.length === 1 ? "1 pozycja" : rows.length + " pozycji";
    els.chanceColumnLabel.textContent = chanceLabel;
    els.valueColumnLabel.textContent = valueLabel;

    els.dropRows.innerHTML = rows.map(function (row, index) {
      var item = getItem(row.vnum);
      return [
        '<article class="drop-row" data-id="' + escapeHtml(row.id) + '">',
        '<div class="drop-item">',
        renderIcon(item),
        '<div class="drop-item-name">',
        "<strong>" + escapeHtml(item.name) + "</strong>",
        "<small>" + escapeHtml(item.vnum) + "</small>",
        "</div>",
        "</div>",
        '<label class="compact-field">',
        '<span>Ilość</span>',
        '<input data-field="count" type="number" min="0" step="1" value="' + escapeHtml(row.count) + '">',
        "</label>",
        '<label class="compact-field">',
        "<span>" + escapeHtml(chanceLabel) + "</span>",
        '<input data-field="percent" type="number" step="0.01" value="' + escapeHtml(row.percent) + '">',
        "</label>",
        '<div class="chance-pill">',
        "<span>" + escapeHtml(valueLabel) + "</span>",
        "<strong>" + escapeHtml(displayChanceValue(row, type, totalWeight)) + "</strong>",
        "</div>",
        '<label class="comment-field">',
        '<span>Komentarz</span>',
        '<input data-field="comment" type="text" value="' + escapeHtml(row.comment) + '">',
        "</label>",
        '<div class="row-actions">',
        '<button type="button" class="drag-handle" data-action="drag" title="Przeciągnij" draggable="true" aria-label="Przeciągnij pozycję"><span></span><span></span><span></span></button>',
        '<button type="button" data-action="clone" title="Duplikuj">+</button>',
        '<button type="button" data-action="remove" title="Usuń">×</button>',
        "</div>",
        "</article>"
      ].join("");
    }).join("");

    if (!rows.length) {
      els.dropRows.innerHTML = '<div class="empty-state">Dodaj item z bazy</div>';
    }
  }

  function updateChancePills() {
    var type = getDropType();
    var totalWeight = getSpecialTotalWeight();

    rows.forEach(function (row) {
      var rowEl = els.dropRows.querySelector('[data-id="' + row.id + '"]');
      var pill = rowEl ? rowEl.querySelector(".chance-pill strong") : null;
      if (pill) {
        pill.textContent = displayChanceValue(row, type, totalWeight);
      }
    });
  }

  function getSample() {
    return Math.max(1, Math.floor(toNumber(els.sampleSize.value, 1)));
  }

  function renderStats() {
    var sample = getSample();
    var totals = new Map();

    rows.forEach(function (row) {
      var item = getItem(row.vnum);
      var current = totals.get(item.vnum) || {
        item: item,
        quantity: 0
      };
      current.quantity += averageQuantity(row, sample);
      totals.set(item.vnum, current);
    });

    var stats = Array.from(totals.values()).sort(function (a, b) {
      return b.quantity - a.quantity;
    });
    var max = stats.reduce(function (highest, entry) {
      return Math.max(highest, entry.quantity);
    }, 0);
    var total = stats.reduce(function (sum, entry) {
      return sum + entry.quantity;
    }, 0);

    els.totalAverage.textContent = formatDecimal(total, 2) + " itemów / " + sample;

    if (!stats.length) {
      els.averageChart.innerHTML = '<div class="empty-state">Brak danych</div>';
      return;
    }

    els.averageChart.innerHTML = stats.map(function (entry) {
      var width = max > 0 ? Math.max(4, (entry.quantity / max) * 100) : 0;
      return [
        '<div class="average-row">',
        renderIcon(entry.item),
        '<div class="average-main">',
        '<div class="average-label">',
        "<strong>" + escapeHtml(entry.item.name) + "</strong>",
        "<span>" + escapeHtml(formatDecimal(entry.quantity, 2)) + "</span>",
        "</div>",
        '<div class="bar-track"><span style="width: ' + width + '%"></span></div>',
        "</div>",
      "</div>"
      ].join("");
    }).join("");
  }

  function renderPreviewSlot(row, index) {
    if (!row) {
      return '<span class="preview-slot empty" aria-hidden="true"></span>';
    }

    var item = getItem(row.vnum);
    var count = toNumber(row.count, 1);
    var countLabel = count > 1 ? '<span class="preview-count">' + escapeHtml(formatCodeNumber(count)) + "</span>" : "";
    var type = getDropType();
    var actualPercent = getActualPercent(row, type, getSpecialTotalWeight());
    var title = item.name + " | VNUM " + item.vnum + " | " + formatDecimal(actualPercent, 2) + "%";

    return [
      '<span class="preview-slot" title="' + escapeHtml(title) + '" style="--slot-delay: ' + (index % 9) + '">',
      '<span class="slot-fallback">' + escapeHtml(item.vnum) + "</span>",
      '<img src="' + escapeHtml(item.icon) + '" alt="" loading="lazy" onerror="this.remove()">',
      countLabel,
      "</span>"
    ].join("");
  }

  function renderDropPreview() {
    var minSlots = 45;
    var slotCount = Math.max(minSlots, Math.ceil(rows.length / 9) * 9);
    var slots = [];

    for (var i = 0; i < slotCount; i += 1) {
      slots.push(renderPreviewSlot(rows[i], i));
    }

    els.previewMeta.textContent = rows.length + " pozycji / 9 w rzędzie";
    els.dropPreview.innerHTML = slots.join("");
  }

  function parseDropBlock(source) {
    var lines = String(source || "").split(/\r?\n/);
    var result = {
      groupName: "",
      mobVnum: "",
      mobComment: "",
      hasLevelLimit: false,
      levelLimit: "1",
      type: "drop",
      rows: []
    };

    lines.forEach(function (line) {
      var groupMatch = line.match(/^\s*Group\s+(.+?)(?:\s*\/\/.*)?$/i);
      var levelMatch = line.match(/^\s*Level_limit\s+([0-9]+)(?:\s*\/\/.*)?$/i);
      var mobMatch = line.match(/^\s*Mob\s+([0-9]+)(?:\s*\/\/\s*(.*))?\s*$/i);
      var specialVnumMatch = line.match(/^\s*Vnum\s+([0-9]+)(?:\s*\/\/\s*(.*))?\s*$/i);
      var typeMatch = line.match(/^\s*Type\s+([A-Za-z_]+)(?:\s*\/\/.*)?$/i);

      if (groupMatch) {
        result.groupName = sanitizeInline(groupMatch[1]);
      }
      if (levelMatch) {
        result.hasLevelLimit = true;
        result.levelLimit = sanitizeInline(levelMatch[1]);
      }
      if (mobMatch) {
        result.mobVnum = sanitizeInline(mobMatch[1]);
        result.mobComment = sanitizeInline(mobMatch[2] || "");
      }
      if (specialVnumMatch) {
        result.mobVnum = sanitizeInline(specialVnumMatch[1]);
        result.mobComment = sanitizeInline(specialVnumMatch[2] || "");
        result.type = "special_item_group";
      }
      if (typeMatch) {
        result.type = normalizeDropType(typeMatch[1]);
      }
    });

    lines.forEach(function (line) {
      var itemMatch = line.match(/^\s*\d+\s+([0-9]+)\s+([0-9.,]+)\s+([0-9.,]+)(?:\s*\/\/\s*(.*))?\s*$/);
      if (!itemMatch) {
        return;
      }

      var vnum = sanitizeInline(itemMatch[1]);
      var count = formatCodeNumber(toNumber(itemMatch[2], 1));
      var percent = chanceToPercent(itemMatch[3], result.type);
      var comment = sanitizeInline(itemMatch[4] || "");
      var item = ensureItem(vnum, comment);

      result.rows.push({
        id: "row-" + Date.now() + "-" + Math.random().toString(16).slice(2),
        vnum: item.vnum,
        count: count,
        percent: percent,
        comment: comment || item.name
      });
    });

    return result;
  }

  function importDropBlock() {
    var parsed = parseDropBlock(els.importDropText.value);

    if (!parsed.groupName && !parsed.mobVnum && !parsed.rows.length) {
      showToast("Nie znalazłem dropu do wczytania");
      return;
    }

    if (parsed.groupName) {
      els.groupName.value = parsed.groupName;
    }
    if (parsed.mobVnum) {
      els.mobVnum.value = parsed.mobVnum;
    }

    els.mobComment.value = parsed.mobComment;
    els.useLevelLimit.checked = parsed.hasLevelLimit;
    els.levelLimit.value = parsed.levelLimit || "1";
    setDropType(parsed.type);
    rows = parsed.rows;

    renderCatalog();
    renderCustomItemCount();
    renderAll();
    showToast("Wczytano " + rows.length + " pozycji dropu");
  }

  function buildOutput() {
    var groupName = sanitizeInline(els.groupName.value) || "NowaGrupa";
    var mobVnum = sanitizeInline(els.mobVnum.value) || "0";
    var mobComment = sanitizeInline(els.mobComment.value);
    var type = getDropType();
    var lines = [];

    lines.push("Group\t" + groupName);
    lines.push("{");

    if (isSpecialItemGroup(type)) {
      lines.push("\tVnum\t" + mobVnum + (mobComment ? "\t\t// " + mobComment : ""));
      rows.forEach(function (row, index) {
        var item = getItem(row.vnum);
        var count = formatCodeNumber(toNumber(row.count, 1));
        var weight = chanceValue(row.percent);
        var comment = sanitizeInline(row.comment) || item.name;
        lines.push("\t" + (index + 1) + "\t" + item.vnum + "\t" + count + "\t" + weight + (comment ? "\t\t// " + comment : ""));
      });
      lines.push("}");
      return lines.join("\n");
    }

    if (els.useLevelLimit.checked) {
      lines.push("\tLevel_limit\t" + (sanitizeInline(els.levelLimit.value) || "1"));
    }

    lines.push("\tMob\t\t" + mobVnum + (mobComment ? "\t\t\t\t\t\t// " + mobComment : ""));
    lines.push("\tType\t" + type);

    rows.forEach(function (row, index) {
      var item = getItem(row.vnum);
      var count = formatCodeNumber(toNumber(row.count, 1));
      var chance = chanceValue(row.percent);
      var comment = sanitizeInline(row.comment) || item.name;
      lines.push("\t" + (index + 1) + "\t" + item.vnum + "\t" + count + "\t" + chance + (comment ? "\t\t// " + comment : ""));
    });

    lines.push("}");
    return lines.join("\n");
  }

  function renderOutput() {
    var type = getDropType();
    var specialTotalWeight = getSpecialTotalWeight();
    if (type === "drop") {
      els.scaleHint.textContent = "drop: 206 = 100%";
      els.outputMeta.textContent = rows.length + " linii / Type drop";
    } else if (type === "limit") {
      els.scaleHint.textContent = "limit: 100 = 100%";
      els.outputMeta.textContent = rows.length + " linii / Type limit";
    } else {
      els.scaleHint.textContent = "special_item_group: szansa = waga / suma wag";
      els.outputMeta.textContent = rows.length + " linii / suma wag " + formatCodeNumber(specialTotalWeight);
    }
    els.outputText.value = buildOutput();
  }

  function renderTypeControls() {
    var special = isSpecialItemGroup();
    els.mobVnumLabel.textContent = special ? "VNUM skrzynki" : "VNUM moba";
    els.mobVnum.placeholder = special ? "np. 38050" : "np. 6091";
    els.mobCommentLabel.textContent = special ? "Komentarz skrzynki" : "Komentarz moba";
    els.mobComment.placeholder = special ? "np. Skrzynia Mocy" : "np. Razador";
    els.levelLimitField.hidden = special;
  }

  function renderAll() {
    renderTypeControls();
    renderRows();
    renderStats();
    renderDropPreview();
    renderOutput();
  }

  function addItemByVnum(vnum) {
    rows.push(makeRow(getItem(vnum)));
    renderAll();
  }

  function toggleFavorite(vnum) {
    var normalized = normalizeFavoriteVnum(vnum);
    if (!normalized) {
      return;
    }

    if (favoriteVnums.has(normalized)) {
      favoriteVnums.delete(normalized);
      showToast("Usunięto z ulubionych");
    } else {
      favoriteVnums.add(normalized);
      showToast("Dodano do ulubionych");
    }

    writeFavoriteVnums();
    renderCatalog();
  }

  function exportFavorites() {
    var payload = {
      version: 1,
      exportedAt: new Date().toISOString(),
      vnums: sortVnums(Array.from(favoriteVnums))
    };
    var blob = new Blob([JSON.stringify(payload, null, 2) + "\n"], {
      type: "application/json;charset=utf-8"
    });
    var url = URL.createObjectURL(blob);
    var link = document.createElement("a");
    link.href = url;
    link.download = "monastyr-item-favorites.json";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    showToast("Wyeksportowano ulubione");
  }

  function importFavoritesFromFile(file) {
    if (!file) {
      return;
    }

    var reader = new FileReader();
    reader.onload = function () {
      var values = parseFavoriteSource(String(reader.result || ""));
      var before = favoriteVnums.size;
      values.forEach(function (vnum) {
        favoriteVnums.add(vnum);
      });
      writeFavoriteVnums();
      renderCatalog();
      showToast("Zaimportowano " + (favoriteVnums.size - before) + " nowych ulubionych");
      if (els.importFavoritesFile) {
        els.importFavoritesFile.value = "";
      }
    };
    reader.onerror = function () {
      showToast("Nie udało się wczytać ulubionych");
    };
    reader.readAsText(file, "utf-8");
  }

  function showToast(message) {
    els.toast.textContent = message;
    els.toast.classList.add("visible");
    window.clearTimeout(showToast.timeout);
    showToast.timeout = window.setTimeout(function () {
      els.toast.classList.remove("visible");
    }, 1800);
  }

  function getDragAfterElement(container, y) {
    var rowElements = Array.prototype.slice.call(container.querySelectorAll(".drop-row:not(.dragging)"));

    return rowElements.reduce(function (closest, rowEl) {
      var box = rowEl.getBoundingClientRect();
      var offset = y - box.top - (box.height / 2);

      if (offset < 0 && offset > closest.offset) {
        return {
          offset: offset,
          element: rowEl
        };
      }

      return closest;
    }, {
      offset: Number.NEGATIVE_INFINITY,
      element: null
    }).element;
  }

  function applyDomRowOrder() {
    var orderedIds = Array.prototype.slice.call(els.dropRows.querySelectorAll(".drop-row")).map(function (rowEl) {
      return rowEl.dataset.id;
    });

    if (!orderedIds.length) {
      return;
    }

    var rowsById = new Map(rows.map(function (row) {
      return [row.id, row];
    }));
    var orderedRows = orderedIds.map(function (id) {
      return rowsById.get(id);
    }).filter(Boolean);

    if (orderedRows.length === rows.length) {
      rows = orderedRows;
    }
  }

  function selectInputValue(input) {
    window.setTimeout(function () {
      try {
        input.select();
      } catch (error) {
        return;
      }
    }, 0);
  }

  function bindEvents() {
    document.addEventListener("mousedown", function (event) {
      if (event.target.matches("input[type='number']") && document.activeElement !== event.target) {
        event.preventDefault();
        event.target.focus();
        selectInputValue(event.target);
      }
    });

    document.addEventListener("focusin", function (event) {
      if (event.target.matches("input[type='number']")) {
        selectInputValue(event.target);
      }
    });

    document.querySelectorAll("input[name='dropType']").forEach(function (input) {
      input.addEventListener("change", renderAll);
    });

    [els.groupName, els.mobVnum, els.mobComment, els.useLevelLimit, els.levelLimit].forEach(function (input) {
      input.addEventListener("input", renderOutput);
      input.addEventListener("change", renderOutput);
    });

    els.sampleSize.addEventListener("input", renderStats);
    els.itemSearch.addEventListener("input", renderCatalog);
    els.exportFavorites.addEventListener("click", exportFavorites);
    els.importFavoritesFile.addEventListener("change", function () {
      importFavoritesFromFile(els.importFavoritesFile.files && els.importFavoritesFile.files[0]);
    });
    els.clearFavorites.addEventListener("click", function () {
      favoriteVnums = new Set();
      writeFavoriteVnums();
      renderCatalog();
      showToast("Wyczyszczono ulubione");
    });

    els.importDrop.addEventListener("click", importDropBlock);
    els.clearImportDrop.addEventListener("click", function () {
      els.importDropText.value = "";
    });

    els.itemCatalog.addEventListener("click", function (event) {
      var favoriteButton = event.target.closest("[data-favorite-vnum]");
      if (favoriteButton) {
        toggleFavorite(favoriteButton.dataset.favoriteVnum);
        return;
      }

      var button = event.target.closest("[data-vnum]");
      if (!button) {
        return;
      }
      addItemByVnum(button.dataset.vnum);
    });

    els.customItemForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var vnum = sanitizeInline(els.customVnum.value);
      if (!vnum) {
        return;
      }
      var item = normalizeItem({
        vnum: vnum,
        name: sanitizeInline(els.customName.value) || "Item " + vnum,
        icon: sanitizeInline(els.customIcon.value) || defaultIconForVnum(vnum)
      });
      item = upsertItem(item, true);
      els.customItemForm.reset();
      renderCatalog();
      renderCustomItemCount();
      rows.push(makeRow(item));
      renderAll();
      showToast("Dodano item do lokalnej bazy");
    });

    els.clearCustomItems.addEventListener("click", function () {
      customItems = [];
      writeCustomItems();
      itemDb = itemDb.filter(function (item) {
        return defaultItemVnums.has(item.vnum) || rows.some(function (row) {
          return row.vnum === item.vnum;
        });
      });
      renderCatalog();
      renderCustomItemCount();
      showToast("Wyczyszczono lokalne itemy");
    });

    els.dropRows.addEventListener("input", function (event) {
      var rowEl = event.target.closest(".drop-row");
      if (!rowEl || !event.target.dataset.field) {
        return;
      }
      var row = rows.find(function (entry) {
        return entry.id === rowEl.dataset.id;
      });
      if (!row) {
        return;
      }
      row[event.target.dataset.field] = event.target.value;
      renderStats();
      renderDropPreview();
      renderOutput();

      if (event.target.dataset.field === "percent") {
        updateChancePills();
      }
    });

    els.dropRows.addEventListener("dragstart", function (event) {
      var handle = event.target.closest("[data-action='drag']");
      var rowEl = handle ? handle.closest(".drop-row") : null;

      if (!rowEl) {
        event.preventDefault();
        return;
      }

      draggedRowId = rowEl.dataset.id;
      rowEl.classList.add("dragging");

      if (event.dataTransfer) {
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/plain", draggedRowId);
      }
    });

    els.dropRows.addEventListener("dragover", function (event) {
      var draggingEl = els.dropRows.querySelector(".drop-row.dragging");

      if (!draggedRowId || !draggingEl) {
        return;
      }

      event.preventDefault();

      var afterEl = getDragAfterElement(els.dropRows, event.clientY);
      if (afterEl) {
        els.dropRows.insertBefore(draggingEl, afterEl);
      } else {
        els.dropRows.appendChild(draggingEl);
      }
    });

    els.dropRows.addEventListener("drop", function (event) {
      if (!draggedRowId) {
        return;
      }

      event.preventDefault();
      applyDomRowOrder();
      draggedRowId = null;
      renderAll();
    });

    els.dropRows.addEventListener("dragend", function () {
      if (!draggedRowId) {
        return;
      }

      applyDomRowOrder();
      draggedRowId = null;
      renderAll();
    });

    els.dropRows.addEventListener("click", function (event) {
      var button = event.target.closest("[data-action]");
      var rowEl = event.target.closest(".drop-row");
      if (!button || !rowEl) {
        return;
      }
      if (button.dataset.action === "drag") {
        return;
      }
      var index = rows.findIndex(function (entry) {
        return entry.id === rowEl.dataset.id;
      });
      if (index < 0) {
        return;
      }

      if (button.dataset.action === "remove") {
        rows.splice(index, 1);
      }
      if (button.dataset.action === "clone") {
        rows.splice(index + 1, 0, Object.assign({}, rows[index], {
          id: "row-" + Date.now() + "-" + Math.random().toString(16).slice(2)
        }));
      }
      renderAll();
    });

    els.clearRows.addEventListener("click", function () {
      rows = [];
      renderAll();
    });

    els.copyOutput.addEventListener("click", function () {
      var output = els.outputText.value;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(output).then(function () {
          showToast("Skopiowano output");
        }).catch(function () {
          fallbackCopy();
        });
      } else {
        fallbackCopy();
      }
    });
  }

  function fallbackCopy() {
    els.outputText.focus();
    els.outputText.select();
    document.execCommand("copy");
    showToast("Skopiowano output");
  }

  bindEvents();
  renderCustomItemCount();
  renderCatalog();
  renderAll();
})();
