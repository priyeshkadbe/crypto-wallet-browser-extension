/** @type {import('next').NextConfig} */
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
