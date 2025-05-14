import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "randomuser.me",
      },
      {
        hostname: "img.clerk.com",
      },
    ],
  },
};

export default nextConfig;
