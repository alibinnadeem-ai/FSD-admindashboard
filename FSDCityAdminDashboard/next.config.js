/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    domains: [], // Add your image domains here if needed
  },
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [],
    };
  },
}

module.exports = nextConfig
