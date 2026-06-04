import { createReadStream, existsSync } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const requestedDir = process.argv[2] || "out";
const port = Number(process.argv[3] || 3000);
const publicDir = path.resolve(rootDir, requestedDir);

const mimeTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".map", "application/json; charset=utf-8"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
  [".txt", "text/plain; charset=utf-8"],
  [".woff", "font/woff"],
  [".woff2", "font/woff2"]
]);

function resolveRequest(url) {
  const pathname = decodeURIComponent(new URL(url, `http://localhost:${port}`).pathname);
  const normalizedPath = pathname.endsWith("/") ? `${pathname}index.html` : pathname;
  const targetPath = path.resolve(publicDir, `.${normalizedPath}`);

  if (!targetPath.startsWith(publicDir)) {
    return null;
  }

  return targetPath;
}

if (!existsSync(publicDir)) {
  console.error(`Directory not found: ${path.relative(rootDir, publicDir)}`);
  console.error("Run npm run build first.");
  process.exit(1);
}

const server = createServer(async (request, response) => {
  const targetPath = resolveRequest(request.url || "/");

  if (!targetPath) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  try {
    const fileStat = await stat(targetPath);

    if (!fileStat.isFile()) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }

    response.writeHead(200, {
      "Content-Type": mimeTypes.get(path.extname(targetPath)) || "application/octet-stream"
    });
    createReadStream(targetPath).pipe(response);
  } catch {
    response.writeHead(404);
    response.end("Not found");
  }
});

server.listen(port, () => {
  console.log(`Serving ${path.relative(rootDir, publicDir)} at http://localhost:${port}`);
});
