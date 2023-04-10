/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    customKey: process.env.API_KEY,
    auth: process.env.AUTH,
    userName: process.env.USERNAME,
    password: process.env.PASSWORD,
  },

  reactStrictMode: true,
};

module.exports = nextConfig;
