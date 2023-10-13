/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ["i.ytimg.com"],
    },
    output: "standalone",
    env: {
      API_URL: process.env.API_URL,
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    },
  };
  
  module.exports = nextConfig;
  