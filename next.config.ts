import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["fawn-meet-directly.ngrok-free.app"],
  images: {
    remotePatterns: [
      {
        hostname: "randomuser.me",
      },
    ],
  },
};

export default nextConfig;
