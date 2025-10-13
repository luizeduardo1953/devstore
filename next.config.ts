import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint : {
      ignoreDuringBuilds: true,
    },
    typescript: {
      ignoreBuildErrors: true,
    },
  images: {
    domains: ['github.com'],
  },
  /* config options here */
};

export default nextConfig;
