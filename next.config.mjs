/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["example.com"],
    deviceSizes: [320, 640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96],
    loader: "default",
  },
};

export default nextConfig;
