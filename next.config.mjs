/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  outputFileTracingRoot: process.cwd()
};

export default nextConfig;
