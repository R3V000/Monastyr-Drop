import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { extname, join } from 'node:path';

const ROOT = process.cwd();
const BEFORE_FILE_CANDIDATES = ['mob_drop_item_backup.txt', 'mob_drop_item_backup_dedyk.txt'];
const BEFORE_FILE = BEFORE_FILE_CANDIDATES.find((fileName) => existsSync(join(ROOT, fileName)));
const AFTER_FILE = 'mob_drop_item_test.txt';
const BEFORE_DIR = 'przed';
const AFTER_DIR = 'po';
const OUTPUT_FILE = 'drop-compare-data.js';
const DROP_RATE_DENOMINATOR = 206;
const METIN_ORDER = [
  '8001',
  '8002',
  '8003',
  '8004',
  '8005',
  '8006',
  '8007',
  '8008',
  '8009',
  '8010',
  '8011',
  '8012',
  '8013',
  '8014',
  '8024',
  '8025',
  '8026',
  '8027',
  '8053',
  '8054',
  '8051',
];
const METIN_NAMES = {
  8001: 'Metin Cierpienia',
  8002: 'Metin Walki',
  8003: 'Metin Bitwy',
  8004: 'Metin Chciwości',
  8005: 'Metin Czerni',
  8006: 'Metin Ciemności',
  8007: 'Metin Zazdrości',
  8008: 'Metin Duszy',
  8009: 'Metin Cienia',
  8010: 'Metin Twardości',
  8011: 'Metin Diabła',
  8012: 'Metin Upadku',
  8013: 'Metin Śmierci',
  8014: 'Metin Morderstwa',
  8024: 'Metin Pung-Ma',
  8025: 'Metin Ma-An',
  8026: 'Metin Tu-Young',
  8027: 'Metin Jeon-Un',
  8053: 'Metin Próżności',
  8054: 'Metin Gniewu',
  8051: 'Metin Mroku',
};
const ITEM_NAME_OVERRIDES = {
  50154: 'Przepustka Potępionych',
  70043: 'Rękawica Złodzieja',
};

function readText(fileName) {
  return readFileSync(join(ROOT, fileName), 'utf8').replace(/^\uFEFF/, '');
}

if (!BEFORE_FILE) {
  throw new Error(`Missing before drop file. Checked: ${BEFORE_FILE_CANDIDATES.join(', ')}`);
}

if (!existsSync(join(ROOT, AFTER_FILE))) {
  throw new Error(`Missing after drop file: ${AFTER_FILE}`);
}

function cleanComment(value) {
  return (value || '')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseDropFile(fileName) {
  const lines = readText(fileName).split(/\r?\n/);
  const groupsByMob = new Map();
  let current = null;

  for (const line of lines) {
    const groupMatch = line.match(/^\s*Group\s+(.+?)\s*$/i);
    if (groupMatch) {
      current = {
        name: groupMatch[1].trim(),
        mob: null,
        label: '',
        entries: [],
      };
      continue;
    }

    if (!current) {
      continue;
    }

    const mobMatch = line.match(/^\s*mob\s+(\d+)\b(?:.*?\/\/\s*(.*))?/i);
    if (mobMatch) {
      current.mob = mobMatch[1];
      current.label = cleanComment(mobMatch[2]);
      continue;
    }

    const entryMatch = line.match(/^\s*(\d+)\s+(\d+)\s+([0-9]+(?:\.[0-9]+)?)\s+([0-9]+(?:\.[0-9]+)?)(?:\s+|$)(?:.*?\/\/\s*(.*))?/);
    if (entryMatch) {
      current.entries.push({
        row: Number(entryMatch[1]),
        itemVnum: entryMatch[2],
        count: Number(entryMatch[3]),
        chance: Number(entryMatch[4]),
        name: cleanComment(entryMatch[5]),
      });
      continue;
    }

    if (/^\s*}\s*$/.test(line)) {
      if (current.mob && current.entries.length) {
        const existing = groupsByMob.get(current.mob);
        if (existing) {
          existing.groupNames.push(current.name);
          existing.entries.push(...current.entries);
          if (!existing.label && current.label) {
            existing.label = current.label;
          }
        } else {
          groupsByMob.set(current.mob, {
            mob: current.mob,
            groupNames: [current.name],
            label: current.label,
            entries: current.entries,
          });
        }
      }
      current = null;
    }
  }

  return groupsByMob;
}

function pngVnums(dirName) {
  return new Set(
    readdirSync(join(ROOT, dirName))
      .filter((file) => extname(file).toLowerCase() === '.png')
      .map((file) => file.replace(/\.png$/i, ''))
  );
}

function aggregateEntries(entries) {
  const byItem = new Map();

  for (const entry of entries) {
    const existing = byItem.get(entry.itemVnum) || {
      itemVnum: entry.itemVnum,
      name: entry.name,
      totalChance: 0,
      weightedChance: 0,
      totalCount: 0,
      rows: [],
    };

    existing.totalChance += entry.chance;
    existing.weightedChance += entry.chance * entry.count;
    existing.totalCount += entry.count;
    existing.rows.push({
      row: entry.row,
      count: entry.count,
      chance: entry.chance,
    });
    if (!existing.name && entry.name) {
      existing.name = entry.name;
    }
    byItem.set(entry.itemVnum, existing);
  }

  return byItem;
}

function round(value, decimals = 4) {
  return Number(value.toFixed(decimals));
}

function rawToDropPercent(rawValue) {
  return (rawValue / DROP_RATE_DENOMINATOR) * 100;
}

function rowsText(rows) {
  return rows
    .map((row) => `${row.count}x${row.chance}`)
    .join(' + ');
}

function buildComparisons() {
  const beforeGroups = parseDropFile(BEFORE_FILE);
  const afterGroups = parseDropFile(AFTER_FILE);
  const beforeImages = pngVnums(BEFORE_DIR);
  const afterImages = pngVnums(AFTER_DIR);

  const candidateVnums = [...beforeImages]
    .filter((vnum) => afterImages.has(vnum) && beforeGroups.has(vnum) && afterGroups.has(vnum))
    .sort((a, b) => {
      const orderA = METIN_ORDER.indexOf(a);
      const orderB = METIN_ORDER.indexOf(b);
      if (orderA !== -1 || orderB !== -1) {
        return (orderA === -1 ? Number.MAX_SAFE_INTEGER : orderA) - (orderB === -1 ? Number.MAX_SAFE_INTEGER : orderB);
      }
      return Number(a) - Number(b);
    });

  return candidateVnums.map((vnum) => {
    const before = beforeGroups.get(vnum);
    const after = afterGroups.get(vnum);
    const beforeItems = aggregateEntries(before.entries);
    const afterItems = aggregateEntries(after.entries);

    const commonItemVnums = [...beforeItems.keys()]
      .filter((itemVnum) => afterItems.has(itemVnum))
      .sort((a, b) => Number(a) - Number(b));

    const items = commonItemVnums.map((itemVnum) => {
      const beforeItem = beforeItems.get(itemVnum);
      const afterItem = afterItems.get(itemVnum);
      const beforeRawValue = beforeItem.weightedChance;
      const afterRawValue = afterItem.weightedChance;
      const beforeValue = rawToDropPercent(beforeRawValue);
      const afterValue = rawToDropPercent(afterRawValue);
      const delta = afterValue - beforeValue;
      const percent = beforeValue === 0 ? null : (delta / beforeValue) * 100;

      return {
        itemVnum,
        name: ITEM_NAME_OVERRIDES[itemVnum] || afterItem.name || beforeItem.name || '',
        beforeValue: round(beforeValue),
        afterValue: round(afterValue),
        beforeRawValue: round(beforeRawValue),
        afterRawValue: round(afterRawValue),
        beforeChance: round(beforeItem.totalChance),
        afterChance: round(afterItem.totalChance),
        beforeChancePercent: round(rawToDropPercent(beforeItem.totalChance)),
        afterChancePercent: round(rawToDropPercent(afterItem.totalChance)),
        beforeRows: rowsText(beforeItem.rows),
        afterRows: rowsText(afterItem.rows),
        delta: round(delta),
        percent: percent === null ? null : round(percent),
      };
    });

    const changedItems = items.filter((item) => item.delta !== 0);
    const sortedByImpact = [...changedItems].sort((a, b) => Math.abs(b.percent || 0) - Math.abs(a.percent || 0));
    const largestIncrease = [...changedItems]
      .filter((item) => item.delta > 0)
      .sort((a, b) => (b.percent || 0) - (a.percent || 0))[0] || null;
    const largestDecrease = [...changedItems]
      .filter((item) => item.delta < 0)
      .sort((a, b) => (a.percent || 0) - (b.percent || 0))[0] || null;
    const beforeTotal = items.reduce((sum, item) => sum + item.beforeValue, 0);
    const afterTotal = items.reduce((sum, item) => sum + item.afterValue, 0);
    const totalDelta = afterTotal - beforeTotal;
    const totalPercent = beforeTotal === 0 ? null : (totalDelta / beforeTotal) * 100;

    return {
      vnum,
      label: METIN_NAMES[vnum] || after.label || before.label || '',
      groupName: after.groupNames[0] || before.groupNames[0] || '',
      beforeImage: `${BEFORE_DIR}/${vnum}.png`,
      afterImage: `${AFTER_DIR}/${vnum}.png`,
      beforeTotal: round(beforeTotal),
      afterTotal: round(afterTotal),
      totalDelta: round(totalDelta),
      totalPercent: totalPercent === null ? null : round(totalPercent),
      commonItems: items.length,
      changedItems: changedItems.length,
      unchangedItems: items.length - changedItems.length,
      largestIncrease,
      largestDecrease,
      topChanges: sortedByImpact.slice(0, 4),
      items: items.sort((a, b) => Math.abs(b.percent || 0) - Math.abs(a.percent || 0)),
    };
  });
}

const data = {
  generatedAt: new Date().toISOString(),
  beforeFile: BEFORE_FILE,
  afterFile: AFTER_FILE,
  beforeDir: BEFORE_DIR,
  afterDir: AFTER_DIR,
  dropRateDenominator: DROP_RATE_DENOMINATOR,
  valueFormula: 'sum(chance * count) / 206 * 100',
  vnums: buildComparisons(),
};

writeFileSync(
  join(ROOT, OUTPUT_FILE),
  `window.DROP_COMPARE_DATA = ${JSON.stringify(data, null, 2)};\n`,
  'utf8'
);

console.log(`Wrote ${OUTPUT_FILE} with ${data.vnums.length} compared vnums.`);
