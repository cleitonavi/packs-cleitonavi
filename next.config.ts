import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true, // não trava build por erro de TS
  },
  eslint: {
    ignoreDuringBuilds: true, // não roda ESLint no CI
  },
};

export default nextConfig;
