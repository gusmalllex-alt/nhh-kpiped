import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Enables static HTML export for GitHub Pages
  basePath: "/nhh-kpiped", // Set to match the repository name
  assetPrefix: "/nhh-kpiped/", 
};

export default nextConfig;
