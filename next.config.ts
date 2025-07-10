import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  databaseUrl: process.env.DATABASE_URL,
  images: {
    domains: ["img.clerk.com"], 
  },
};

export default nextConfig;
