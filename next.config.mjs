import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  distDir: ".next-build",
  trailingSlash: true,
  outputFileTracingRoot: __dirname,
  images: {
    unoptimized: true
  },
  webpack(config) {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "framer-motion": path.resolve(__dirname, "node_modules/framer-motion"),
      "lucide-react": path.resolve(__dirname, "node_modules/lucide-react")
    };

    return config;
  }
};

export default nextConfig;
