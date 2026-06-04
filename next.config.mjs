const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const normalizedBasePath = configuredBasePath
  ? `/${configuredBasePath.replace(/^\/+|\/+$/g, "")}`
  : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: normalizedBasePath || undefined,
  images: {
    unoptimized: true
  }
};

export default nextConfig;
