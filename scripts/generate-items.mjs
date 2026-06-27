import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sourcePath = join(root, "data", "item_proto.json");
const blacklistPath = join(root, "data", "item_blacklist.txt");
const outputPath = join(root, "data", "items.generated.js");

function cleanText(value) {
  return String(value ?? "")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeItem(entry) {
  const vnum = cleanText(entry?.vnum);
  if (!vnum) {
    return null;
  }

  return {
    vnum,
    name: cleanText(entry?.locale_name) || cleanText(entry?.name) || `Item ${vnum}`,
    icon: `../assets/item-icons/${vnum}.png`
  };
}

function readBlacklist() {
  if (!existsSync(blacklistPath)) {
    return new Set();
  }

  const values = new Set();
  const source = readFileSync(blacklistPath, "utf8")
    .split(/\r?\n/)
    .map((line) => line.replace(/#.*$/, "").replace(/\/\/.*$/, ""))
    .join(" ");

  const tokens = source.match(/\d+\s*-\s*\d+|\d+|[^\s,;]+/g) || [];

  tokens.forEach((token) => {
    const value = token.trim();
    if (!value) {
      return;
    }

    const range = value.match(/^(\d+)\s*-\s*(\d+)$/);
    if (range) {
      const start = Number(range[1]);
      const end = Number(range[2]);
      const from = Math.min(start, end);
      const to = Math.max(start, end);
      for (let current = from; current <= to; current += 1) {
        values.add(String(current));
      }
      return;
    }

    if (!/^\d+$/.test(value)) {
      throw new Error(`Invalid item blacklist token: ${value}`);
    }

    values.add(value);
  });

  return values;
}

const source = JSON.parse(readFileSync(sourcePath, "utf8"));
if (!Array.isArray(source)) {
  throw new Error("data/item_proto.json must contain an array.");
}

const blacklist = readBlacklist();
const skippedVnums = new Set();
const byVnum = new Map();
source.forEach((entry) => {
  const item = normalizeItem(entry);
  if (item) {
    if (blacklist.has(item.vnum)) {
      skippedVnums.add(item.vnum);
      return;
    }

    byVnum.set(item.vnum, item);
  }
});

const items = Array.from(byVnum.values()).sort((a, b) => {
  const left = Number(a.vnum);
  const right = Number(b.vnum);
  if (Number.isFinite(left) && Number.isFinite(right)) {
    return left - right;
  }
  return a.vnum.localeCompare(b.vnum);
});

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(
  outputPath,
  [
    "/*",
    "  AUTO-GENERATED FILE. Do not edit by hand.",
    "  Source: data/item_proto.json",
    "  Icon path: ../assets/item-icons/{vnum}.png",
    "*/",
    `window.ITEM_DATABASE_SOURCE = ${JSON.stringify({
      type: "item_proto",
      itemCount: items.length,
      blacklistFile: "data/item_blacklist.txt",
      blacklistCount: blacklist.size,
      skippedItemCount: skippedVnums.size,
      iconPath: "../assets/item-icons/{vnum}.png"
    }, null, 2)};`,
    `window.ITEM_DATABASE = ${JSON.stringify(items, null, 2)};`,
    ""
  ].join("\n"),
  "utf8"
);

console.log(`Generated data/items.generated.js with ${items.length} items (${skippedVnums.size} blacklisted).`);
