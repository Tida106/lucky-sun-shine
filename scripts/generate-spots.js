#!/usr/bin/env node
// Generate Markdown posts for every entry in data/powerspots.js.
// Mirror of generate-stones.js.
const fs = require('node:fs');
const path = require('node:path');
const { spots } = require('../data/powerspots');

const args = process.argv.slice(2);
const FORCE = args.includes('--force');
const dateArg = args.find((a) => a.startsWith('--date='));
const today = dateArg ? dateArg.slice('--date='.length) : new Date().toISOString().slice(0, 10);

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');
fs.mkdirSync(POSTS_DIR, { recursive: true });

function frontmatter(spot) {
  const title = `${spot.nameJa}の参拝ガイド｜${spot.prefecture}のパワースポット完全攻略`;
  // address already starts with prefecture, so don't double-print it.
  const place = spot.address.startsWith(spot.prefecture) ? spot.address : `${spot.prefecture}${spot.address}`;
  const desc = `${spot.nameJa}（${place}）の歴史・ご利益・参拝のポイント・おすすめのパワーストーン・周辺スポットまでを総合的に解説します。`;
  return `---
title: "${title}"
description: "${desc.slice(0, 140)}"
date: "${today}"
category: "powerspots"
tags: [${spot.tags.map((t) => `"${t}"`).join(', ')}]
slug: "${spot.slug}"
draft: false
---
`;
}

function body(spot) {
  const lines = [];
  const push = (s) => lines.push(s);

  push('## はじめに');
  push('');
  push(spot.intro);
  push('');

  push('## 基本情報');
  push('');
  push('| 項目 | 内容 |');
  push('|---|---|');
  push(`| 名称 | ${spot.nameJa} |`);
  push(`| 所在地 | ${spot.address} |`);
  push(`| 種別 | ${spot.type} |`);
  push(`| 創建・由来 | ${spot.founded} |`);
  push(`| 主祭神／本尊 | ${spot.enshrined} |`);
  if (spot.officialUrl) push(`| 公式サイト | ${spot.officialUrl} |`);
  push('');

  push('## ご利益');
  push('');
  for (const b of spot.benefits) push(`- **${b}**`);
  push('');

  push('## アクセス');
  push('');
  push(spot.access);
  if (spot.parkingNote) {
    push('');
    push(`**駐車場**：${spot.parkingNote}`);
  }
  push('');

  push('## 見どころ');
  push('');
  for (const h of spot.highlights) push(`- ${h}`);
  push('');

  push('## 参拝のポイント');
  push('');
  for (const r of spot.ritualPoints) push(`- ${r}`);
  push('');

  push('## おすすめのパワーストーン');
  push('');
  push(`${spot.nameJa}の参拝に持っていくと、神域のエネルギーと共鳴しやすいとされる石を紹介します。`);
  push('');
  push('| 石 | 相性の理由 |');
  push('|---|---|');
  for (const s of spot.recommendedStones) push(`| **${s.name}** | ${s.reason} |`);
  push('');

  push('## 周辺の合わせて訪れたいスポット');
  push('');
  for (const n of spot.nearby) push(`- ${n}`);
  push('');

  push('## おすすめの時期・時間');
  push('');
  push(spot.bestTime);
  push('');

  push('## 参拝マナーの基本');
  push('');
  push('1. 鳥居・山門をくぐる前に一礼');
  push('2. 参道の中央は神様の通り道、端を歩く');
  push('3. 手水舎で左手 → 右手 → 口 → 左手 → 柄杓を清める');
  push('4. 神社は二拝二拍手一拝（一部の神社は作法が異なる、当該記事の参拝のポイントを参照）');
  push('5. 個人的な願いは控えめに、感謝を中心に');
  push('');

  push('## まとめ');
  push('');
  push(`- ${spot.nameJa}は${spot.prefecture}を代表するパワースポットの1つ。`);
  push(`- 主なご利益は **${spot.benefits.slice(0, 2).join('・')}** など。`);
  push(`- 参拝には ${spot.recommendedStones.slice(0, 2).map((s) => s.name).join('・')} などのパワーストーンが相性◎。`);
  push(`- 訪れるなら **${spot.bestTime.split('。')[0]}** が特におすすめ。`);
  push('');
  push(`日々の暮らしに行き詰まりを感じたとき、人生の節目に立ったとき。${spot.nameJa}の凛とした空気は、そっと背中を押してくれるはずです。`);

  return lines.join('\n');
}

let written = 0;
let skipped = 0;
for (const spot of spots) {
  const fname = `${today}-${spot.slug}.md`;
  const fpath = path.join(POSTS_DIR, fname);
  const existing = fs
    .readdirSync(POSTS_DIR)
    .find((f) => f.endsWith(`-${spot.slug}.md`));
  if (existing && !FORCE) {
    skipped++;
    continue;
  }
  if (existing && existing !== fname) {
    fs.unlinkSync(path.join(POSTS_DIR, existing));
  }
  const md = `${frontmatter(spot)}\n${body(spot)}\n`;
  fs.writeFileSync(fpath, md);
  written++;
}

console.log(`✓ generate-spots — wrote ${written}, skipped ${skipped} (total spots: ${spots.length})`);
