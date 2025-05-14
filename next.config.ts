import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["fawn-meet-directly.ngrok-free.app"],
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
  output: "standalone",
};

export default nextConfig;
