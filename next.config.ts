import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    //properly optimize bundle size of project
    optimizePackageImports: ["@chakra-ui/react"],
  },
};

export default nextConfig;
