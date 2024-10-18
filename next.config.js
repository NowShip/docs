/** @type {import('next').NextConfig} */

const { withContentlayer } = require("next-contentlayer2");

const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "images.unsplash.com" }],
  },
};

module.exports = withContentlayer(nextConfig);
