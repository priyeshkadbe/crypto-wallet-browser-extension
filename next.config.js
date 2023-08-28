/** @type {import('next').NextConfig} */
// import dotenv from "dotenv";
// dotenv.config()
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized:true
  },
  async rewrites() {
    return [
      {
        source: "/:any*",
        destination: "/",
      },
    ];
  },
};

module.exports = nextConfig;
