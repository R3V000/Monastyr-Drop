(function () {
  "use strict";

  var CUSTOM_ITEMS_STORAGE_KEY = "monastyr-chest-editor-custom-items-v1";
  var data = {
    chests: [],
    categories: []
  };
  var currentType = "categories";
  var currentIndex = 0;
  var outputMode = "entry";
  var itemDb = Array.isArray(window.ITEM_DATABASE) ? window.ITEM_DATABASE.slice() : [];
  var defaultItemVnums = new Set();
  var customItems = [];

  var els = {
    downloadFile: document.getElementById("downloadFile"),
    entryMeta: document.getElementById("entryMeta"),
    entrySelect: document.getElementById("entrySelect"),
    newEntry: document.getElementById("newEntry"),
    duplicateEntry: document.getElementById("duplicateEntry"),
    deleteEntry: document.getElementById("deleteEntry"),
    categoryIdField: document.getElementById("categoryIdField"),
    categoryId: document.getElementById("categoryId"),
    boxVnumField: document.getElementById("boxVnumField"),
    boxVnum: document.getElementById("boxVnum"),
    entryName: document.getElementById("entryName"),
    targetVnum: document.getElementById("targetVnum"),
    coinPrice: document.getElementById("coinPrice"),
    armorVnum: document.getElementById("armorVnum"),
    weaponVnum: document.getElementById("weaponVnum"),
    background: document.getElementById("background"),
    importText: document.getElementById("importText"),
    importFile: document.getElementById("importFile"),
    loadImport: document.getElementById("loadImport"),
    clearImport: document.getElementById("clearImport"),
    itemSearch: document.getElementById("itemSearch"),
    itemCatalog: document.getElementById("itemCatalog"),
    customItemCount: document.getElementById("customItemCount"),
    customItemForm: document.getElementById("customItemForm"),
    customVnum: document.getElementById("customVnum"),
    customName: document.getElementById("customName"),
    customIcon: document.getElementById("customIcon"),
    clearCustomItems: document.getElementById("clearCustomItems"),
    rewardMeta: document.getElementById("rewardMeta"),
    clearRewards: document.getElementById("clearRewards"),
    rewardRows: document.getElementById("rewardRows"),
    totalChance: document.getElementById("totalChance"),
    chanceBreakdown: document.getElementById("chanceBreakdown"),
    outputMeta: document.getElementById("outputMeta"),
    showEntryOutput: document.getElementById("showEntryOutput"),
    showFileOutput: document.getElementById("showFileOutput"),
    copyOutput: document.getElementById("copyOutput"),
    outputText: document.getElementById("outputText"),
    toast: document.getElementById("toast")
  };

  function sanitizeInline(value) {
    return String(value == null ? "" : value).replace(/\s+/g, " ").trim();
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function toNumber(value, fallback) {
    var number = Number(String(value == null ? "" : value).replace(",", "."));
    return Number.isFinite(number) ? number : fallback;
  }

  function toInt(value, fallback) {
    var number = parseInt(String(value == null ? "" : value), 10);
    return Number.isFinite(number) ? number : fallback;
  }

  function cleanNumber(value, fallback) {
    var number = toNumber(value, fallback);
    var rounded = Math.round((number + Number.EPSILON) * 1000) / 1000;
    return Number.isInteger(rounded) ? Math.trunc(rounded) : rounded;
  }

  function formatNumber(value, maxDecimals) {
    var number = toNumber(value, 0);
    var factor = Math.pow(10, maxDecimals);
    var rounded = Math.round((number + Number.EPSILON) * factor) / factor;
    return rounded.toFixed(maxDecimals).replace(/\.?0+$/, "").replace(".", ",");
  }

  function makeInternalId(prefix) {
    return prefix + "-" + Date.now() + "-" + Math.random().toString(16).slice(2);
  }

  function normalizeItem(item) {
    var vnum = sanitizeInline(item && item.vnum);
    return {
      vnum: vnum,
      name: sanitizeInline(item && item.name) || "Item " + vnum,
      icon: sanitizeInline(item && item.icon) || "https://img.m2icondb.com/" + vnum + ".png"
    };
  }

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

  function upsertItem(item, persist) {
    var normalized = normalizeItem(item);
    if (!normalized.vnum) {
      return normalized;
    }

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

  function getItem(vnum) {
    var id = sanitizeInline(vnum);
    return itemDb.find(function (item) {
      return item.vnum === id;
    }) || {
      vnum: id,
      name: "Item " + id,
      icon: "https://img.m2icondb.com/" + id + ".png"
    };
  }

  function ensureItem(vnum, name) {
    var id = sanitizeInline(vnum);
    var found = itemDb.find(function (item) {
      return item.vnum === id;
    });

    if (found) {
      return found;
    }

    return upsertItem({
      vnum: id,
      name: sanitizeInline(name) || "Item " + id,
      icon: "https://img.m2icondb.com/" + id + ".png"
    }, false);
  }

  function loadCustomItems() {
    customItems = readCustomItems();
    customItems.forEach(function (item) {
      upsertItem(item, false);
    });
  }

  function renderCustomItemCount() {
    var count = customItems.length;
    els.customItemCount.textContent = count === 1 ? "1 lokalny item" : count + " lokalnych itemów";
    els.clearCustomItems.disabled = count === 0;
  }

  itemDb = itemDb.map(normalizeItem).filter(function (item) {
    return item.vnum;
  });
  defaultItemVnums = new Set(itemDb.map(function (item) {
    return item.vnum;
  }));
  loadCustomItems();

  function stripJsonComments(source) {
    var result = "";
    var inString = false;
    var escaped = false;

    for (var index = 0; index < source.length; index += 1) {
      var char = source[index];
      var next = source[index + 1];

      if (inString) {
        result += char;

        if (escaped) {
          escaped = false;
        } else if (char === "\\") {
          escaped = true;
        } else if (char === "\"") {
          inString = false;
        }

        continue;
      }

      if (char === "\"") {
        inString = true;
        result += char;
        continue;
      }

      if (char === "/" && next === "/") {
        while (index < source.length && source[index] !== "\n") {
          index += 1;
        }
        result += "\n";
        continue;
      }

      if (char === "/" && next === "*") {
        index += 2;
        while (index < source.length && !(source[index] === "*" && source[index + 1] === "/")) {
          index += 1;
        }
        index += 1;
        continue;
      }

      result += char;
    }

    return result;
  }

  function parseChestJson(source) {
    var parsed = JSON.parse(stripJsonComments(source));
    return normalizeData(parsed);
  }

  function normalizeReward(reward) {
    var vnum = sanitizeInline(reward && reward.vnum);
    ensureItem(vnum);
    return {
      _id: makeInternalId("reward"),
      vnum: vnum,
      count: Math.max(1, toInt(reward && reward.count, 1)),
      chance: cleanNumber(reward && reward.chance, 0)
    };
  }

  function normalizeEntry(entry, type) {
    var normalized = {
      _id: makeInternalId("entry"),
      name: sanitizeInline(entry && entry.name) || (type === "categories" ? "NOWA KATEGORIA" : "Nowa skrzynia"),
      target_vnum: toInt(entry && entry.target_vnum, 0),
      background: sanitizeInline(entry && entry.background),
      armor_vnum: toInt(entry && entry.armor_vnum, 0),
      weapon_vnum: toInt(entry && entry.weapon_vnum, 0),
      coin_price: toInt(entry && entry.coin_price, 0),
      rewards: Array.isArray(entry && entry.rewards) ? entry.rewards.map(normalizeReward) : []
    };

    if (type === "categories") {
      normalized.id = toInt(entry && entry.id, nextCategoryId());
    } else {
      normalized.box_vnum = toInt(entry && entry.box_vnum, 0);
    }

    return normalized;
  }

  function normalizeData(source) {
    var normalized = {
      chests: [],
      categories: []
    };

    if (source && Array.isArray(source.chests)) {
      normalized.chests = source.chests.map(function (entry) {
        return normalizeEntry(entry, "chests");
      });
    }

    if (source && Array.isArray(source.categories)) {
      normalized.categories = source.categories.map(function (entry) {
        return normalizeEntry(entry, "categories");
      });
    }

    return normalized;
  }

  function nextCategoryId() {
    var max = data.categories.reduce(function (highest, entry) {
      return Math.max(highest, toInt(entry.id, 0));
    }, 0);
    return max + 1;
  }

  function getCurrentList() {
    return data[currentType] || [];
  }

  function getCurrentEntry() {
    var list = getCurrentList();
    return list[currentIndex] || null;
  }

  function getRewards() {
    var entry = getCurrentEntry();
    return entry ? entry.rewards : [];
  }

  function getTotalChance() {
    return getRewards().reduce(function (total, reward) {
      return total + Math.max(0, toNumber(reward.chance, 0));
    }, 0);
  }

  function getActualPercent(reward) {
    var total = getTotalChance();
    return total > 0 ? (Math.max(0, toNumber(reward.chance, 0)) / total) * 100 : 0;
  }

  function createEntry(type) {
    if (type === "categories") {
      return normalizeEntry({
        id: nextCategoryId(),
        name: "NOWA KATEGORIA",
        target_vnum: 691,
        background: "d:/ymir work/ui/chest_background.png",
        armor_vnum: 243235,
        weapon_vnum: 247143,
        coin_price: 59,
        rewards: []
      }, type);
    }

    return normalizeEntry({
      box_vnum: 50011,
      name: "Nowa skrzynia",
      target_vnum: 101,
      background: "d:/ymir work/ui/chest_background.png",
      armor_vnum: 243235,
      weapon_vnum: 247143,
      coin_price: 10,
      rewards: []
    }, type);
  }

  function cloneForData(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function cloneEntry(entry, type) {
    var plain = entryToOutput(entry, type);
    if (type === "categories") {
      plain.id = nextCategoryId();
      plain.name = plain.name + " KOPIA";
    } else {
      plain.name = plain.name + " kopia";
    }
    return normalizeEntry(plain, type);
  }

  function rewardToOutput(reward) {
    return {
      vnum: toInt(reward.vnum, 0),
      count: Math.max(1, toInt(reward.count, 1)),
      chance: cleanNumber(reward.chance, 0)
    };
  }

  function entryToOutput(entry, type) {
    var output = {};

    if (type === "categories") {
      output.id = toInt(entry.id, 0);
      output.name = sanitizeInline(entry.name);
    } else {
      output.box_vnum = toInt(entry.box_vnum, 0);
      output.name = sanitizeInline(entry.name);
    }

    output.target_vnum = toInt(entry.target_vnum, 0);
    output.background = sanitizeInline(entry.background);
    output.armor_vnum = toInt(entry.armor_vnum, 0);
    output.weapon_vnum = toInt(entry.weapon_vnum, 0);
    output.coin_price = toInt(entry.coin_price, 0);
    output.rewards = Array.isArray(entry.rewards) ? entry.rewards.map(rewardToOutput) : [];

    return output;
  }

  function fileToOutput() {
    return {
      chests: data.chests.map(function (entry) {
        return entryToOutput(entry, "chests");
      }),
      categories: data.categories.map(function (entry) {
        return entryToOutput(entry, "categories");
      })
    };
  }

  function stringifyOutput(value) {
    return JSON.stringify(value, null, "\t");
  }

  function buildEntryOutput() {
    var entry = getCurrentEntry();
    return entry ? stringifyOutput(entryToOutput(entry, currentType)) : "";
  }

  function buildFileOutput() {
    return stringifyOutput(fileToOutput());
  }

  function showToast(message) {
    els.toast.textContent = message;
    els.toast.classList.add("show");
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(function () {
      els.toast.classList.remove("show");
    }, 2200);
  }

  function renderEntrySelect() {
    var list = getCurrentList();

    if (!list.length) {
      els.entrySelect.innerHTML = '<option value="">Brak wpisów</option>';
      els.entrySelect.disabled = true;
      els.duplicateEntry.disabled = true;
      els.deleteEntry.disabled = true;
      return;
    }

    if (currentIndex >= list.length) {
      currentIndex = list.length - 1;
    }

    els.entrySelect.disabled = false;
    els.duplicateEntry.disabled = false;
    els.deleteEntry.disabled = false;
    els.entrySelect.innerHTML = list.map(function (entry, index) {
      var prefix = currentType === "categories" ? "#" + toInt(entry.id, 0) : "box " + toInt(entry.box_vnum, 0);
      return '<option value="' + index + '">' + escapeHtml(prefix + " - " + entry.name) + "</option>";
    }).join("");
    els.entrySelect.value = String(currentIndex);
  }

  function renderMeta() {
    var entry = getCurrentEntry();
    var hasEntry = Boolean(entry);
    var fields = [
      els.categoryId,
      els.boxVnum,
      els.entryName,
      els.targetVnum,
      els.coinPrice,
      els.armorVnum,
      els.weaponVnum,
      els.background
    ];

    els.categoryIdField.hidden = currentType !== "categories";
    els.boxVnumField.hidden = currentType !== "chests";

    fields.forEach(function (field) {
      field.disabled = !hasEntry;
    });

    if (!entry) {
      fields.forEach(function (field) {
        field.value = "";
      });
      els.entryMeta.textContent = currentType === "categories" ? "0 kategorii" : "0 chestów";
      return;
    }

    els.categoryId.value = entry.id || 0;
    els.boxVnum.value = entry.box_vnum || 0;
    els.entryName.value = entry.name || "";
    els.targetVnum.value = entry.target_vnum || 0;
    els.coinPrice.value = entry.coin_price || 0;
    els.armorVnum.value = entry.armor_vnum || 0;
    els.weaponVnum.value = entry.weapon_vnum || 0;
    els.background.value = entry.background || "";

    var count = getCurrentList().length;
    els.entryMeta.textContent = count === 1 ? "1 wpis" : count + " wpisy";
  }

  function renderCatalog() {
    var query = sanitizeInline(els.itemSearch.value).toLowerCase();
    var visible = itemDb.filter(function (item) {
      return !query || item.vnum.toLowerCase().includes(query) || item.name.toLowerCase().includes(query);
    }).slice(0, 96);

    if (!visible.length) {
      els.itemCatalog.innerHTML = '<div class="empty-state">Nie znaleziono itemu</div>';
      return;
    }

    els.itemCatalog.innerHTML = visible.map(function (item) {
      return [
        '<button class="catalog-item" type="button" data-vnum="' + escapeHtml(item.vnum) + '">',
        '<span class="catalog-icon"><img src="' + escapeHtml(item.icon) + '" alt=""></span>',
        '<span class="catalog-name">',
        '<strong>' + escapeHtml(item.name) + '</strong>',
        '<small>VNUM ' + escapeHtml(item.vnum) + '</small>',
        '</span>',
        '<span class="add-sign">+</span>',
        '</button>'
      ].join("");
    }).join("");
  }

  function renderRewards() {
    var rewards = getRewards();
    var total = getTotalChance();

    els.rewardMeta.textContent = rewards.length === 1 ? "1 nagroda" : rewards.length + " nagród";
    els.clearRewards.disabled = rewards.length === 0;

    if (!rewards.length) {
      els.rewardRows.innerHTML = '<div class="empty-state">Dodaj item z bazy, żeby zbudować listę nagród</div>';
      return;
    }

    els.rewardRows.innerHTML = rewards.map(function (reward, index) {
      var item = getItem(reward.vnum);
      var actual = total > 0 ? getActualPercent(reward) : 0;
      return [
        '<article class="reward-row" data-id="' + escapeHtml(reward._id) + '">',
        '<div class="reward-item">',
        '<span class="reward-icon"><img src="' + escapeHtml(item.icon) + '" alt=""></span>',
        '<span class="reward-item-name">',
        '<strong>' + escapeHtml(item.name) + '</strong>',
        '<small>VNUM ' + escapeHtml(reward.vnum) + '</small>',
        '</span>',
        '</div>',
        '<input class="reward-count" type="number" min="1" step="1" value="' + escapeHtml(reward.count) + '" aria-label="Ilość">',
        '<input class="reward-chance" type="number" min="0" step="0.01" value="' + escapeHtml(reward.chance) + '" aria-label="Chance">',
        '<span class="actual-chance">' + formatNumber(actual, 2) + '%</span>',
        '<div class="row-actions">',
        '<button class="icon-button" type="button" data-action="up" aria-label="Przenieś wyżej"' + (index === 0 ? " disabled" : "") + '>↑</button>',
        '<button class="icon-button" type="button" data-action="down" aria-label="Przenieś niżej"' + (index === rewards.length - 1 ? " disabled" : "") + '>↓</button>',
        '<button class="icon-button danger" type="button" data-action="remove" aria-label="Usuń">×</button>',
        '</div>',
        '</article>'
      ].join("");
    }).join("");
  }

  function renderSummary() {
    var rewards = getRewards();
    var total = getTotalChance();
    els.totalChance.textContent = "Suma chance: " + formatNumber(total, 2);

    if (!rewards.length) {
      els.chanceBreakdown.innerHTML = '<div class="empty-state">Brak nagród do przeliczenia</div>';
      return;
    }

    els.chanceBreakdown.innerHTML = rewards.map(function (reward) {
      var item = getItem(reward.vnum);
      var count = Math.max(1, toInt(reward.count, 1));
      var countLabel = count > 1 ? '<span class="summary-count">' + escapeHtml(count) + "</span>" : "";
      var chance = formatNumber(reward.chance, 2);
      var percent = formatNumber(getActualPercent(reward), 2);
      var title = item.name + " | VNUM " + item.vnum + " | chance " + chance + " | udział " + percent + "%";

      return [
        '<article class="summary-slot-card" title="' + escapeHtml(title) + '">',
        '<span class="summary-slot">',
        '<span class="slot-fallback">' + escapeHtml(item.vnum) + "</span>",
        '<img src="' + escapeHtml(item.icon) + '" alt="" loading="lazy" onerror="this.remove()">',
        countLabel,
        "</span>",
        '<div class="summary-slot-copy">',
        '<strong>' + escapeHtml(item.name) + '</strong>',
        '<small>VNUM ' + escapeHtml(item.vnum) + '</small>',
        '<dl>',
        '<div><dt>Chance</dt><dd>' + escapeHtml(chance) + '</dd></div>',
        '<div><dt>Udział</dt><dd>' + escapeHtml(percent) + '%</dd></div>',
        '</dl>',
        '</div>',
        '</article>'
      ].join("");
    }).join("");
  }

  function renderOutput() {
    var isEntry = outputMode === "entry";
    els.outputText.value = isEntry ? buildEntryOutput() : buildFileOutput();
    els.outputMeta.textContent = isEntry ? "Aktualny wpis" : "Cały chest_opening.json";
    els.showEntryOutput.classList.toggle("active", isEntry);
    els.showFileOutput.classList.toggle("active", !isEntry);
  }

  function renderAll() {
    renderEntrySelect();
    renderMeta();
    renderCatalog();
    renderRewards();
    renderSummary();
    renderOutput();
    renderCustomItemCount();
  }

  function updateActualChanceCells() {
    var rewards = getRewards();
    var total = getTotalChance();
    rewards.forEach(function (reward) {
      var row = els.rewardRows.querySelector('[data-id="' + reward._id + '"]');
      var actualEl = row ? row.querySelector(".actual-chance") : null;
      if (actualEl) {
        actualEl.textContent = formatNumber(total > 0 ? getActualPercent(reward) : 0, 2) + "%";
      }
    });
  }

  function syncMetaFromInputs() {
    var entry = getCurrentEntry();
    if (!entry) {
      return;
    }

    if (currentType === "categories") {
      entry.id = toInt(els.categoryId.value, 0);
    } else {
      entry.box_vnum = toInt(els.boxVnum.value, 0);
    }

    entry.name = sanitizeInline(els.entryName.value);
    entry.target_vnum = toInt(els.targetVnum.value, 0);
    entry.coin_price = toInt(els.coinPrice.value, 0);
    entry.armor_vnum = toInt(els.armorVnum.value, 0);
    entry.weapon_vnum = toInt(els.weaponVnum.value, 0);
    entry.background = sanitizeInline(els.background.value);

    renderEntrySelect();
    renderOutput();
  }

  function addRewardByVnum(vnum) {
    var entry = getCurrentEntry();
    if (!entry) {
      showToast("Najpierw utwórz wpis");
      return;
    }

    var item = getItem(vnum);
    entry.rewards.push({
      _id: makeInternalId("reward"),
      vnum: item.vnum,
      count: 1,
      chance: 1
    });
    renderRewards();
    renderSummary();
    renderOutput();
    showToast("Dodano " + item.name);
  }

  function findRewardByRow(rowEl) {
    var rewards = getRewards();
    var id = rowEl ? rowEl.dataset.id : "";
    var index = rewards.findIndex(function (reward) {
      return reward._id === id;
    });

    return {
      rewards: rewards,
      index: index,
      reward: index >= 0 ? rewards[index] : null
    };
  }

  function setData(nextData) {
    data = normalizeData(cloneForData(nextData));
    currentType = data.categories.length ? "categories" : "chests";
    if (!data[currentType].length) {
      currentType = "categories";
    }
    currentIndex = 0;
    document.querySelectorAll("input[name='entryType']").forEach(function (input) {
      input.checked = input.value === currentType;
    });
    renderAll();
  }

  function loadFromText(source) {
    try {
      setData(parseChestJson(source));
      showToast("Wczytano chest_opening.json");
    } catch (error) {
      showToast("Nie udało się wczytać JSON-a");
    }
  }

  function downloadFile() {
    var blob = new Blob([buildFileOutput() + "\n"], {
      type: "application/json;charset=utf-8"
    });
    var url = URL.createObjectURL(blob);
    var link = document.createElement("a");
    link.href = url;
    link.download = "chest_opening.json";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    showToast("Pobrano chest_opening.json");
  }

  function copyOutput() {
    var output = els.outputText.value;
    if (!output) {
      showToast("Brak outputu do skopiowania");
      return;
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(output).then(function () {
        showToast("Skopiowano output");
      }).catch(function () {
        fallbackCopy();
      });
      return;
    }

    fallbackCopy();
  }

  function fallbackCopy() {
    els.outputText.focus();
    els.outputText.select();
    document.execCommand("copy");
    showToast("Skopiowano output");
  }

  function bindEvents() {
    document.querySelectorAll("input[name='entryType']").forEach(function (input) {
      input.addEventListener("change", function () {
        currentType = input.value;
        currentIndex = 0;
        renderAll();
      });
    });

    els.entrySelect.addEventListener("change", function () {
      currentIndex = toInt(els.entrySelect.value, 0);
      renderAll();
    });

    els.newEntry.addEventListener("click", function () {
      data[currentType].push(createEntry(currentType));
      currentIndex = data[currentType].length - 1;
      renderAll();
      showToast("Dodano nowy wpis");
    });

    els.duplicateEntry.addEventListener("click", function () {
      var entry = getCurrentEntry();
      if (!entry) {
        return;
      }
      data[currentType].splice(currentIndex + 1, 0, cloneEntry(entry, currentType));
      currentIndex += 1;
      renderAll();
      showToast("Zduplikowano wpis");
    });

    els.deleteEntry.addEventListener("click", function () {
      if (!getCurrentEntry()) {
        return;
      }
      data[currentType].splice(currentIndex, 1);
      currentIndex = Math.max(0, currentIndex - 1);
      renderAll();
      showToast("Usunięto wpis");
    });

    [
      els.categoryId,
      els.boxVnum,
      els.entryName,
      els.targetVnum,
      els.coinPrice,
      els.armorVnum,
      els.weaponVnum,
      els.background
    ].forEach(function (field) {
      field.addEventListener("input", syncMetaFromInputs);
    });

    els.itemSearch.addEventListener("input", renderCatalog);

    els.itemCatalog.addEventListener("click", function (event) {
      var button = event.target.closest("[data-vnum]");
      if (!button) {
        return;
      }
      addRewardByVnum(button.dataset.vnum);
    });

    els.customItemForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var vnum = sanitizeInline(els.customVnum.value);
      if (!vnum) {
        return;
      }
      var item = upsertItem({
        vnum: vnum,
        name: sanitizeInline(els.customName.value) || "Item " + vnum,
        icon: sanitizeInline(els.customIcon.value) || "https://img.m2icondb.com/" + vnum + ".png"
      }, true);
      els.customItemForm.reset();
      renderCatalog();
      renderCustomItemCount();
      showToast("Dodano lokalnie " + item.name);
    });

    els.clearCustomItems.addEventListener("click", function () {
      customItems = [];
      writeCustomItems();
      itemDb = itemDb.filter(function (item) {
        return defaultItemVnums.has(item.vnum);
      });
      data.chests.concat(data.categories).forEach(function (entry) {
        entry.rewards.forEach(function (reward) {
          ensureItem(reward.vnum);
        });
      });
      renderCatalog();
      renderCustomItemCount();
      showToast("Wyczyszczono lokalne itemy");
    });

    els.rewardRows.addEventListener("input", function (event) {
      var rowEl = event.target.closest(".reward-row");
      var found = findRewardByRow(rowEl);
      if (!found.reward) {
        return;
      }

      if (event.target.classList.contains("reward-count")) {
        found.reward.count = Math.max(1, toInt(event.target.value, 1));
      }

      if (event.target.classList.contains("reward-chance")) {
        found.reward.chance = cleanNumber(event.target.value, 0);
      }

      updateActualChanceCells();
      renderSummary();
      renderOutput();
    });

    els.rewardRows.addEventListener("click", function (event) {
      var button = event.target.closest("[data-action]");
      if (!button) {
        return;
      }

      var rowEl = button.closest(".reward-row");
      var found = findRewardByRow(rowEl);
      if (!found.reward) {
        return;
      }

      if (button.dataset.action === "remove") {
        found.rewards.splice(found.index, 1);
      }

      if (button.dataset.action === "up" && found.index > 0) {
        var up = found.rewards[found.index - 1];
        found.rewards[found.index - 1] = found.reward;
        found.rewards[found.index] = up;
      }

      if (button.dataset.action === "down" && found.index < found.rewards.length - 1) {
        var down = found.rewards[found.index + 1];
        found.rewards[found.index + 1] = found.reward;
        found.rewards[found.index] = down;
      }

      renderRewards();
      renderSummary();
      renderOutput();
    });

    els.clearRewards.addEventListener("click", function () {
      var entry = getCurrentEntry();
      if (!entry) {
        return;
      }
      entry.rewards = [];
      renderRewards();
      renderSummary();
      renderOutput();
      showToast("Wyczyszczono nagrody");
    });

    els.loadImport.addEventListener("click", function () {
      loadFromText(els.importText.value);
    });

    els.clearImport.addEventListener("click", function () {
      els.importText.value = "";
    });

    els.importFile.addEventListener("change", function () {
      var file = els.importFile.files && els.importFile.files[0];
      if (!file) {
        return;
      }

      var reader = new FileReader();
      reader.onload = function () {
        els.importText.value = String(reader.result || "");
        loadFromText(els.importText.value);
      };
      reader.onerror = function () {
        showToast("Nie udało się odczytać pliku");
      };
      reader.readAsText(file, "utf-8");
    });

    els.showEntryOutput.addEventListener("click", function () {
      outputMode = "entry";
      renderOutput();
    });

    els.showFileOutput.addEventListener("click", function () {
      outputMode = "file";
      renderOutput();
    });

    els.copyOutput.addEventListener("click", copyOutput);
    els.downloadFile.addEventListener("click", downloadFile);
  }

  function loadDefaultFile() {
    fetch("chest_opening.json", { cache: "no-store" })
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Missing file");
        }
        return response.text();
      })
      .then(function (source) {
        data = parseChestJson(source);
        currentType = data.categories.length ? "categories" : "chests";
        currentIndex = 0;
        document.querySelectorAll("input[name='entryType']").forEach(function (input) {
          input.checked = input.value === currentType;
        });
        renderAll();
      })
      .catch(function () {
        data = normalizeData({ chests: [], categories: [] });
        renderAll();
        showToast("Nie wczytano domyślnego pliku, możesz wkleić JSON ręcznie");
      });
  }

  bindEvents();
  loadDefaultFile();
})();
