import type { NextConfig } from "next";

// Solo hace falta si el sitio se publica en una subcarpeta,
// por ejemplo GitHub Pages: NEXT_PUBLIC_BASE_PATH=/nombre-del-repo
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: base || undefined,
};

export default nextConfig;
