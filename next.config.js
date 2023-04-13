/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    bearerKey: process.env.API_KEY,
  },

  reactStrictMode: true,
};

module.exports = nextConfig;
