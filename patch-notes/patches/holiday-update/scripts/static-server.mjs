import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, resolve, sep } from 'node:path';

const root = resolve(process.argv[2] ?? 'out');
const port = Number(process.env.PORT ?? process.argv[3] ?? 3001);

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.gif': 'image/gif',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

function isInsideRoot(filePath) {
  const normalizedRoot = root.toLowerCase();
  const normalizedPath = filePath.toLowerCase();

  return normalizedPath === normalizedRoot || normalizedPath.startsWith(`${normalizedRoot}${sep}`);
}

function resolveFilePath(requestUrl) {
  const url = new URL(requestUrl, `http://localhost:${port}`);
  const decodedPath = decodeURIComponent(url.pathname);
  const relativePath = decodedPath === '/' ? 'index.html' : decodedPath.replace(/^\/+/, '');
  let filePath = resolve(root, relativePath);

  if (!isInsideRoot(filePath)) {
    return null;
  }

  if (existsSync(filePath) && statSync(filePath).isDirectory()) {
    filePath = join(filePath, 'index.html');
  }

  if (!existsSync(filePath) && !extname(filePath)) {
    const htmlPath = `${filePath}.html`;
    const indexPath = join(filePath, 'index.html');

    if (existsSync(htmlPath)) {
      filePath = htmlPath;
    } else if (existsSync(indexPath)) {
      filePath = indexPath;
    }
  }

  if (existsSync(filePath) && statSync(filePath).isFile()) {
    return { filePath, status: 200 };
  }

  const notFoundPath = resolve(root, '404.html');

  if (existsSync(notFoundPath)) {
    return { filePath: notFoundPath, status: 404 };
  }

  return null;
}

const server = createServer((request, response) => {
  const match = resolveFilePath(request.url ?? '/');

  if (!match) {
    response.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
    response.end('Not found');
    return;
  }

  const extension = extname(match.filePath);
  const contentType = contentTypes[extension] ?? 'application/octet-stream';
  const stream = createReadStream(match.filePath);

  response.writeHead(match.status, { 'content-type': contentType });
  stream.pipe(response);
  stream.on('error', () => response.end());
});

server.listen(port, () => {
  console.log(`Static preview: http://localhost:${port}`);
});
