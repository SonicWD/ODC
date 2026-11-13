import type { NextConfig } from "next";

// Solo hace falta si el sitio se publica en una subcarpeta,
// por ejemplo GitHub Pages: NEXT_PUBLIC_BASE_PATH=/nombre-del-repo
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: base || undefined,
  // Con export estático no hay optimizador de imágenes en servidor.
  images: { unoptimized: true },
};

export default nextConfig;
