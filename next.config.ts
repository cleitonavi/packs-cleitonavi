import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cleitonavi.com' },
      { protocol: 'https', hostname: 'mir-s3-cdn-cf.behance.net' },
    ],
  },
};

export default nextConfig;
