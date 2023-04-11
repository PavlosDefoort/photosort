/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    userName: process.env.USERNAME,
    password: process.env.PASSWORD,
    auth: process.env.AUTH,
  },

  reactStrictMode: true,
};

module.exports = nextConfig;
