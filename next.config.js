/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vapstall.ae',
      },
    ],
  },
};

module.exports = nextConfig;
