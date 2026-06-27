import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  statSync,
  writeFileSync
} from "node:fs";
import { dirname, extname, join, resolve } from "node:path";
import { deflateSync } from "node:zlib";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sourcePath = join(root, "data", "item_proto.json");
const itemListPath = join(root, "data", "item_list.txt");
const blacklistPath = join(root, "data", "item_blacklist.txt");
const outputPath = join(root, "data", "items.generated.js");
const iconSourceRoot = join(root, "assets");
const iconOutputRoot = join(root, "assets", "item-icons");
const webIconBase = "../assets/item-icons";

const pngSignature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const supportedImageExtensions = new Set([".png", ".jpg", ".jpeg", ".webp"]);
const convertibleImageExtensions = new Set([".tga"]);

function readTextFileWithEncoding(path) {
  const buffer = readFileSync(path);

  try {
    return {
      text: new TextDecoder("utf-8", { fatal: true }).decode(buffer),
      encoding: "utf-8"
    };
  } catch {
    return {
      text: new TextDecoder("windows-1250").decode(buffer),
      encoding: "windows-1250"
    };
  }
}

function cleanText(value) {
  return String(value ?? "")
    .replace(/\s+/g, " ")
    .trim();
}

function toPosixPath(value) {
  return cleanText(value).replace(/\\/g, "/").replace(/^\.?\//, "");
}

function extractAssetPath(clientPath) {
  const normalized = toPosixPath(clientPath);
  const lower = normalized.toLowerCase();
  const iconIndex = lower.indexOf("icon/");
  if (iconIndex >= 0) {
    return normalized.slice(iconIndex);
  }

  return normalized;
}

function stripClientIconRoot(clientPath) {
  return extractAssetPath(clientPath).replace(/^icon\//i, "");
}

function withPngExtension(path) {
  return path.replace(/\.[^/.]+$/, ".png");
}

function encodeUrlPath(path) {
  return path
    .split("/")
    .filter(Boolean)
    .map((part) => encodeURIComponent(part))
    .join("/");
}

function findSourceIcon(clientPath) {
  const assetPath = extractAssetPath(clientPath);
  const parts = assetPath.split("/").filter(Boolean);
  const sourcePathForClientIcon = join(iconSourceRoot, ...parts);

  if (existsSync(sourcePathForClientIcon)) {
    return sourcePathForClientIcon;
  }

  const originalExtension = extname(sourcePathForClientIcon);
  if (!originalExtension) {
    return null;
  }

  const withoutExtension = sourcePathForClientIcon.slice(0, -originalExtension.length);
  for (const extension of supportedImageExtensions) {
    const candidate = `${withoutExtension}${extension}`;
    if (existsSync(candidate)) {
      return candidate;
    }
  }

  return null;
}

function shouldRefreshFile(source, target) {
  if (!existsSync(target)) {
    return true;
  }

  return statSync(source).mtimeMs > statSync(target).mtimeMs;
}

function makeCrcTable() {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n += 1) {
    let c = n;
    for (let k = 0; k < 8; k += 1) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[n] = c >>> 0;
  }
  return table;
}

const crcTable = makeCrcTable();

function crc32(buffers) {
  let crc = 0xffffffff;
  buffers.forEach((buffer) => {
    for (let index = 0; index < buffer.length; index += 1) {
      crc = crcTable[(crc ^ buffer[index]) & 0xff] ^ (crc >>> 8);
    }
  });
  return (crc ^ 0xffffffff) >>> 0;
}

function pngChunk(type, data = Buffer.alloc(0)) {
  const typeBuffer = Buffer.from(type, "ascii");
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);

  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32([typeBuffer, data]), 0);

  return Buffer.concat([length, typeBuffer, data, crc]);
}

function encodePng(width, height, rgba) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const stride = width * 4;
  const raw = Buffer.alloc((stride + 1) * height);
  for (let y = 0; y < height; y += 1) {
    const targetOffset = y * (stride + 1);
    raw[targetOffset] = 0;
    rgba.copy(raw, targetOffset + 1, y * stride, (y + 1) * stride);
  }

  return Buffer.concat([
    pngSignature,
    pngChunk("IHDR", ihdr),
    pngChunk("IDAT", deflateSync(raw)),
    pngChunk("IEND")
  ]);
}

function decodeTgaPixel(buffer, offset, bytesPerPixel, pixelDepth) {
  if (pixelDepth === 32) {
    return [buffer[offset + 2], buffer[offset + 1], buffer[offset], buffer[offset + 3]];
  }

  if (pixelDepth === 24) {
    return [buffer[offset + 2], buffer[offset + 1], buffer[offset], 255];
  }

  if (pixelDepth === 16 || pixelDepth === 15) {
    const value = buffer.readUInt16LE(offset);
    const blue = value & 0x1f;
    const green = (value >> 5) & 0x1f;
    const red = (value >> 10) & 0x1f;
    const alpha = pixelDepth === 16 && value & 0x8000 ? 255 : 255;
    return [
      Math.round((red / 31) * 255),
      Math.round((green / 31) * 255),
      Math.round((blue / 31) * 255),
      alpha
    ];
  }

  if (pixelDepth === 8) {
    const value = buffer[offset];
    return [value, value, value, 255];
  }

  throw new Error(`Unsupported TGA pixel depth: ${pixelDepth}`);
}

function writeTgaPixel(target, width, height, index, pixel, descriptor) {
  const sourceX = index % width;
  const sourceY = Math.floor(index / width);
  const originRight = Boolean(descriptor & 0x10);
  const originTop = Boolean(descriptor & 0x20);
  const x = originRight ? width - 1 - sourceX : sourceX;
  const y = originTop ? sourceY : height - 1 - sourceY;
  const targetOffset = (y * width + x) * 4;

  target[targetOffset] = pixel[0];
  target[targetOffset + 1] = pixel[1];
  target[targetOffset + 2] = pixel[2];
  target[targetOffset + 3] = pixel[3];
}

function decodeTga(buffer) {
  if (buffer.length < 18) {
    throw new Error("Invalid TGA file.");
  }

  const idLength = buffer[0];
  const colorMapType = buffer[1];
  const imageType = buffer[2];
  const colorMapLength = buffer.readUInt16LE(5);
  const colorMapDepth = buffer[7];
  const width = buffer.readUInt16LE(12);
  const height = buffer.readUInt16LE(14);
  const pixelDepth = buffer[16];
  const descriptor = buffer[17];
  const bytesPerPixel = Math.ceil(pixelDepth / 8);

  if (!width || !height) {
    throw new Error("Invalid TGA dimensions.");
  }

  if (colorMapType !== 0 || (imageType !== 2 && imageType !== 3 && imageType !== 10 && imageType !== 11)) {
    throw new Error(`Unsupported TGA type: ${imageType}`);
  }

  if (![8, 15, 16, 24, 32].includes(pixelDepth)) {
    throw new Error(`Unsupported TGA pixel depth: ${pixelDepth}`);
  }

  const colorMapBytes = colorMapType ? colorMapLength * Math.ceil(colorMapDepth / 8) : 0;
  let offset = 18 + idLength + colorMapBytes;
  const rgba = Buffer.alloc(width * height * 4);
  const pixelCount = width * height;

  if (imageType === 2 || imageType === 3) {
    for (let index = 0; index < pixelCount; index += 1) {
      const pixel = decodeTgaPixel(buffer, offset, bytesPerPixel, pixelDepth);
      writeTgaPixel(rgba, width, height, index, pixel, descriptor);
      offset += bytesPerPixel;
    }
  } else {
    let index = 0;
    while (index < pixelCount) {
      const packet = buffer[offset];
      offset += 1;
      const count = (packet & 0x7f) + 1;

      if (packet & 0x80) {
        const pixel = decodeTgaPixel(buffer, offset, bytesPerPixel, pixelDepth);
        offset += bytesPerPixel;
        for (let run = 0; run < count && index < pixelCount; run += 1) {
          writeTgaPixel(rgba, width, height, index, pixel, descriptor);
          index += 1;
        }
      } else {
        for (let run = 0; run < count && index < pixelCount; run += 1) {
          const pixel = decodeTgaPixel(buffer, offset, bytesPerPixel, pixelDepth);
          writeTgaPixel(rgba, width, height, index, pixel, descriptor);
          offset += bytesPerPixel;
          index += 1;
        }
      }
    }
  }

  return { width, height, rgba };
}

function convertTgaToPng(source, target) {
  const image = decodeTga(readFileSync(source));
  writeFileSync(target, encodePng(image.width, image.height, image.rgba));
}

function detectImageExtension(source) {
  const header = readFileSync(source).subarray(0, 12);
  if (header.length >= 8 && header.subarray(0, 8).equals(pngSignature)) {
    return ".png";
  }

  if (header.length >= 3 && header[0] === 0xff && header[1] === 0xd8 && header[2] === 0xff) {
    return ".jpg";
  }

  if (
    header.length >= 12 &&
    header.subarray(0, 4).toString("ascii") === "RIFF" &&
    header.subarray(8, 12).toString("ascii") === "WEBP"
  ) {
    return ".webp";
  }

  return extname(source).toLowerCase();
}

function prepareWebIcon(source, target, stats) {
  const extension = detectImageExtension(source);
  mkdirSync(dirname(target), { recursive: true });

  if (!shouldRefreshFile(source, target)) {
    stats.reusedIconCount += 1;
    return true;
  }

  if (supportedImageExtensions.has(extension)) {
    copyFileSync(source, target);
    stats.copiedIconCount += 1;
    return true;
  }

  if (convertibleImageExtensions.has(extension)) {
    convertTgaToPng(source, target);
    stats.convertedIconCount += 1;
    return true;
  }

  stats.unsupportedIconCount += 1;
  return false;
}

function readItemListIcons() {
  const stats = {
    itemListEntryCount: 0,
    mappedIconCount: 0,
    reusedIconCount: 0,
    copiedIconCount: 0,
    convertedIconCount: 0,
    missingIconCount: 0,
    unsupportedIconCount: 0,
    failedIconCount: 0
  };
  const icons = new Map();

  if (!existsSync(itemListPath)) {
    return { icons, stats };
  }

  const lines = readFileSync(itemListPath, "utf8").split(/\r?\n/);
  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || trimmed.startsWith("//")) {
      return;
    }

    const parts = trimmed.split(/\s+/);
    const vnum = parts[0];
    const clientIcon = parts[2];
    if (!/^\d+$/.test(vnum) || !clientIcon) {
      return;
    }

    stats.itemListEntryCount += 1;

    const targetRelative = withPngExtension(stripClientIconRoot(clientIcon));
    const target = join(iconOutputRoot, ...targetRelative.split("/"));
    const webIcon = `${webIconBase}/${encodeUrlPath(targetRelative)}`;
    const source = findSourceIcon(clientIcon);
    if (!source) {
      if (existsSync(target)) {
        icons.set(vnum, webIcon);
        stats.reusedIconCount += 1;
        stats.mappedIconCount += 1;
        return;
      }

      stats.missingIconCount += 1;
      return;
    }

    try {
      if (!prepareWebIcon(source, target, stats)) {
        return;
      }
    } catch (error) {
      if (existsSync(target)) {
        icons.set(vnum, webIcon);
        stats.reusedIconCount += 1;
        stats.mappedIconCount += 1;
        return;
      }

      stats.failedIconCount += 1;
      console.warn(`Skipping icon ${clientIcon}: ${error.message}`);
      return;
    }

    icons.set(vnum, webIcon);
    stats.mappedIconCount += 1;
  });

  return { icons, stats };
}

function normalizeItem(entry, icons) {
  const vnum = cleanText(entry?.vnum);
  if (!vnum) {
    return null;
  }

  return {
    vnum,
    name: cleanText(entry?.locale_name) || cleanText(entry?.name) || `Item ${vnum}`,
    icon: icons.get(vnum) || `../assets/item-icons/${vnum}.png`
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

const sourceFile = readTextFileWithEncoding(sourcePath);
const source = JSON.parse(sourceFile.text);
if (!Array.isArray(source)) {
  throw new Error("data/item_proto.json must contain an array.");
}

const blacklist = readBlacklist();
const { icons, stats: iconStats } = readItemListIcons();
const skippedVnums = new Set();
const byVnum = new Map();
source.forEach((entry) => {
  const item = normalizeItem(entry, icons);
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
    "  Icons: data/item_list.txt -> assets/item-icons/*.png",
    "*/",
    `window.ITEM_DATABASE_SOURCE = ${JSON.stringify({
      type: "item_proto",
      sourceEncoding: sourceFile.encoding,
      itemCount: items.length,
      itemListFile: existsSync(itemListPath) ? "data/item_list.txt" : null,
      itemListEntryCount: iconStats.itemListEntryCount,
      mappedIconCount: iconStats.mappedIconCount,
      convertedIconCount: iconStats.convertedIconCount,
      copiedIconCount: iconStats.copiedIconCount,
      reusedIconCount: iconStats.reusedIconCount,
      missingIconCount: iconStats.missingIconCount,
      unsupportedIconCount: iconStats.unsupportedIconCount,
      failedIconCount: iconStats.failedIconCount,
      blacklistFile: "data/item_blacklist.txt",
      blacklistCount: blacklist.size,
      skippedItemCount: skippedVnums.size,
      fallbackIconPath: "../assets/item-icons/{vnum}.png"
    }, null, 2)};`,
    `window.ITEM_DATABASE = ${JSON.stringify(items, null, 2)};`,
    ""
  ].join("\n"),
  "utf8"
);

console.log(
  [
    `Generated data/items.generated.js with ${items.length} items (${skippedVnums.size} blacklisted).`,
    `Prepared ${iconStats.mappedIconCount} item-list icons (${iconStats.convertedIconCount} converted, ${iconStats.copiedIconCount} copied, ${iconStats.reusedIconCount} reused).`
  ].join("\n")
);
