/**
 * 太陽ちゃんマスコット画像(public/images/mascot-sun*.png, 320x320)の
 * 小サイズ版(160x160)を書き出す。Header の24px/18pxナビアイコンなど、
 * 小さく表示する箇所向けに、320x320フル解像度(30〜45KB)をそのまま
 * 使っていたのを避けるためのもの。2倍密度ディスプレイでも80px表示
 * までは160x160で十分な解像感を保てる。
 * prebuild から呼ばれる。すでに出力ファイルが存在し、元画像より新しければスキップ。
 */
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const DIR = path.join(__dirname, '../public/images');
const SMALL_WIDTH = 160;

function run() {
  if (!fs.existsSync(DIR)) return;
  const files = fs.readdirSync(DIR).filter((f) => /^mascot-sun(-[a-z]+)?\.png$/.test(f));
  return Promise.all(
    files.map(async (file) => {
      const src = path.join(DIR, file);
      const srcMtime = fs.statSync(src).mtimeMs;
      const baseName = file.replace(/\.png$/, '');
      const outputs = [
        { dest: path.join(DIR, `${baseName}-160.webp`), format: 'webp', options: { quality: 82 } },
        { dest: path.join(DIR, `${baseName}-160.png`), format: 'png', options: { compressionLevel: 9 } },
      ];
      for (const { dest, format, options } of outputs) {
        if (fs.existsSync(dest) && fs.statSync(dest).mtimeMs >= srcMtime) {
          console.log(`[optimize-mascot] ${path.basename(dest)} up-to-date, skip.`);
          continue;
        }
        await sharp(src)
          .resize(SMALL_WIDTH, SMALL_WIDTH, { withoutEnlargement: true })
          [format](options)
          .toFile(dest);
        const kb = Math.round(fs.statSync(dest).size / 1024);
        console.log(`[optimize-mascot] ${path.basename(dest)} → ${kb} KB`);
      }
    })
  );
}

run().catch((err) => { console.error(err); process.exit(1); });
