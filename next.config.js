/** @type {import('next').NextConfig} */
const nextConfig = {
  env: { customKey: process.env.API_KEY },

  reactStrictMode: true,
};

module.exports = nextConfig;
