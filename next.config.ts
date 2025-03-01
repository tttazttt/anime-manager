import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["image.tmdb.org"],
  },
};

export default nextConfig;
