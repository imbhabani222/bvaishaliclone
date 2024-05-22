/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");

module.exports = withPWA({
  reactStrictMode: true,
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
  },
});

const nextConfig = {
  reactStrictMode: false,
  swcMinify: false,
  compress: true,
  compiler: { removeConsole: process.env.NODE_ENV === "production" },
  images: {
    domains: [
      "localhost",
      "dev-huetech.s3.ap-south-1.amazonaws.com",
      "zefayar-uat.s3.ap-south-1.amazonaws.com",
      "zef-prod.s3.ap-south-1.amazonaws.com",
      "d2sim86a19jkav.cloudfront.net",
      "media.zlite.in",
    ],
  },
};

module.exports = nextConfig;
