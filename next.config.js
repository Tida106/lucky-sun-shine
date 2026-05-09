/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // BASE_PATH is set by configure-pages action ('' for custom domains).
  basePath: process.env.BASE_PATH ?? '',
  assetPrefix: process.env.BASE_PATH ?? '',
  env: {
    NEXT_PUBLIC_BASE_PATH: process.env.BASE_PATH ?? '',
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://lucky-sun-shine.com',
  },
  trailingSlash: true,
};

module.exports = nextConfig;
