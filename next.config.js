/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  trailingSlash: false,
  images: {
    domains: ["firebasestorage.googleapis.com", "storage.googleapis.co"],
  },
};

module.exports = nextConfig;
