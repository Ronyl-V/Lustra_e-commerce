import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  databaseUrl: process.env.DATABASE_URL,
  images: {
    domains: ["img.clerk.com"], 
  },
};

module.exports = {
  output: "export",
};

export default nextConfig;