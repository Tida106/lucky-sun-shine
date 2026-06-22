/**
 * ヒーロー画像をモバイル/タブレット用にリサイズして public/images/ に書き出す。
 * prebuild から呼ばれる。すでに出力ファイルが存在し、元画像より新しければスキップ。
 */
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const SRC = path.join(__dirname, '../public/images/hero-crystals.webp');
const OUT = [
  { file: 'hero-crystals-480.webp', width: 480, quality: 70 },
  { file: 'hero-crystals-640.webp', width: 640, quality: 75 },
  { file: 'hero-crystals-960.webp', width: 960, quality: 78 },
];

async function run() {
  if (!fs.existsSync(SRC)) {
    console.log('[optimize-hero] hero-crystals.webp not found, skipping.');
    return;
  }
  const srcMtime = fs.statSync(SRC).mtimeMs;
  for (const { file, width, quality } of OUT) {
    const dest = path.join(__dirname, '../public/images', file);
    if (fs.existsSync(dest) && fs.statSync(dest).mtimeMs >= srcMtime) {
      console.log(`[optimize-hero] ${file} up-to-date, skip.`);
      continue;
    }
    await sharp(SRC)
      .resize(width, null, { withoutEnlargement: true })
      .webp({ quality, effort: 4 })
      .toFile(dest);
    const kb = Math.round(fs.statSync(dest).size / 1024);
    console.log(`[optimize-hero] ${file} → ${kb} KB`);
  }
}

run().catch((err) => { console.error(err); process.exit(1); });
