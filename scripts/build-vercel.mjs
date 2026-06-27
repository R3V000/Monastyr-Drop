import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const staticOut = join(root, "out");
const holidayUpdatePrefix = "patch-notes/patches/holiday-update";
const holidayUpdate = join(root, holidayUpdatePrefix);
const holidayUpdateOut = join(holidayUpdate, "out");
const ignoredCopyNames = new Set([
  ".git",
  ".agents",
  ".vscode",
  "node_modules",
  ".next",
  "out",
  "dist"
]);
const skipInstall =
  process.argv.includes("--skip-install") || process.env.SKIP_DAILY_INSTALL === "1";

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: root,
    stdio: "inherit",
    shell: false,
    ...options
  });

  if (result.error) {
    console.error(result.error.message);
    process.exit(1);
  }

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

function runNpm(args, options = {}) {
  if (process.platform === "win32") {
    run(process.env.ComSpec || "cmd.exe", ["/d", "/s", "/c", "npm", ...args], options);
    return;
  }

  run("npm", args, options);
}

function shouldCopy(sourceRoot, source) {
  const parts = source.slice(sourceRoot.length).split(/[\\/]/).filter(Boolean);
  return !parts.some((part) => ignoredCopyNames.has(part));
}

function copyDirectory(source, target) {
  const sourceRoot = resolve(source);
  cpSync(source, target, {
    recursive: true,
    filter: (currentSource) => shouldCopy(sourceRoot, currentSource)
  });
}

if (!skipInstall) {
  runNpm(["--prefix", "daily-statistics", "ci"]);

  if (existsSync(holidayUpdate)) {
    runNpm(["--prefix", holidayUpdatePrefix, "ci"]);
  }
}

runNpm(["--prefix", "daily-statistics", "run", "build"], {
  env: {
    ...process.env,
    NEXT_PUBLIC_BASE_PATH: "daily-statistics"
  }
});

if (existsSync(holidayUpdate)) {
  runNpm(["--prefix", holidayUpdatePrefix, "run", "build"]);
}

rmSync(dist, { recursive: true, force: true });
rmSync(staticOut, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });

cpSync(join(root, "index.html"), join(dist, "index.html"));
copyDirectory(join(root, "data"), join(dist, "data"));
copyDirectory(join(root, "assets"), join(dist, "assets"));
copyDirectory(join(root, "mob-drop-item-editor"), join(dist, "mob-drop-item-editor"));
copyDirectory(join(root, "chest-editor"), join(dist, "chest-editor"));
copyDirectory(join(root, "patch-notes"), join(dist, "patch-notes"));

if (existsSync(holidayUpdate)) {
  if (!existsSync(holidayUpdateOut)) {
    throw new Error("Missing patch-notes/patches/holiday-update/out after build.");
  }

  const distHolidayUpdate = join(dist, holidayUpdatePrefix);
  rmSync(distHolidayUpdate, { recursive: true, force: true });
  cpSync(holidayUpdateOut, distHolidayUpdate, { recursive: true });
}

const dailyOut = join(root, "daily-statistics", "out");
if (!existsSync(dailyOut)) {
  throw new Error("Missing daily-statistics/out after build.");
}

cpSync(dailyOut, join(dist, "daily-statistics"), { recursive: true });
copyDirectory(dist, staticOut);
