import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sourcePath = join(root, "data", "item_proto.json");
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

const source = JSON.parse(readFileSync(sourcePath, "utf8"));
if (!Array.isArray(source)) {
  throw new Error("data/item_proto.json must contain an array.");
}

const byVnum = new Map();
source.forEach((entry) => {
  const item = normalizeItem(entry);
  if (item) {
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
      iconPath: "../assets/item-icons/{vnum}.png"
    }, null, 2)};`,
    `window.ITEM_DATABASE = ${JSON.stringify(items, null, 2)};`,
    ""
  ].join("\n"),
  "utf8"
);

console.log(`Generated data/items.generated.js with ${items.length} items.`);
