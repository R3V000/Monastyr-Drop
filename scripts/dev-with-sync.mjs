import { watch } from "node:fs";
import { spawn } from "node:child_process";
import { copyFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourcePath = path.join(rootDir, "mob_drop_item.txt");
const publicDir = path.join(rootDir, "public");
const targetPath = path.join(publicDir, "mob_drop_item.txt");
const nextBin = path.join(rootDir, "node_modules", "next", "dist", "bin", "next");
const args = process.argv.slice(2);

let syncQueued = false;

async function syncDropFile() {
  await mkdir(publicDir, { recursive: true });
  await copyFile(sourcePath, targetPath);
  console.log(`[drop-sync] mob_drop_item.txt -> public/mob_drop_item.txt`);
}

function queueSync() {
  if (syncQueued) {
    return;
  }

  syncQueued = true;
  setTimeout(async () => {
    try {
      await syncDropFile();
    } catch (error) {
      console.error("[drop-sync] Nie udało się skopiować mob_drop_item.txt", error);
    } finally {
      syncQueued = false;
    }
  }, 100);
}

await syncDropFile();

const watcher = watch(sourcePath, { persistent: true }, queueSync);
const child = spawn(process.execPath, [nextBin, "dev", ...args], {
  cwd: rootDir,
  stdio: "inherit",
  windowsHide: true
});

function shutdown(signal) {
  watcher.close();
  child.kill(signal);
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

child.on("exit", (code, signal) => {
  watcher.close();
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 0);
});
