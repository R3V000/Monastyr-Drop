import { copyFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourcePath = path.join(rootDir, "mob_drop_item.txt");
const publicDir = path.join(rootDir, "public");
const targetPath = path.join(publicDir, "mob_drop_item.txt");

await mkdir(publicDir, { recursive: true });
await copyFile(sourcePath, targetPath);

console.log(`Synced ${path.relative(rootDir, sourcePath)} -> ${path.relative(rootDir, targetPath)}`);
