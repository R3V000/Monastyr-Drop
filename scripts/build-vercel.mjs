import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
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

if (!skipInstall) {
  runNpm(["--prefix", "daily-statistics", "ci"]);
}

runNpm(["--prefix", "daily-statistics", "run", "build"], {
  env: {
    ...process.env,
    NEXT_PUBLIC_BASE_PATH: "daily-statistics"
  }
});

rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });

cpSync(join(root, "index.html"), join(dist, "index.html"));
cpSync(join(root, "mob-drop-item-editor"), join(dist, "mob-drop-item-editor"), {
  recursive: true
});

const dailyOut = join(root, "daily-statistics", "out");
if (!existsSync(dailyOut)) {
  throw new Error("Missing daily-statistics/out after build.");
}

cpSync(dailyOut, join(dist, "daily-statistics"), { recursive: true });
