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
  // 静的ページ生成をシングルワーカー・プロセスベースに固定する。
  // Windows環境でワーカープールを並列化すると、ページ数が増えるにつれて
  // アクセス違反クラッシュ(0xC0000005)やメモリ不足で落ちる事象が頻発した
  // ため、ビルド時間よりも安定性を優先する。
  experimental: {
    cpus: 1,
    workerThreads: false,
  },
};

module.exports = nextConfig;
