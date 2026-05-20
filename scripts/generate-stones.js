#!/usr/bin/env node
// Generate Markdown posts for every entry in data/powerstones.js.
// Idempotent — only writes a file if it does not already exist.
// Use:  node scripts/generate-stones.js [--force] [--date=YYYY-MM-DD]
//
//   --force         overwrite existing files
//   --date=YYYY-MM-DD  override the date in frontmatter / filenames
const fs = require('node:fs');
const path = require('node:path');
const { stones } = require('../data/powerstones');
const { prices } = require('../data/powerstone-prices');

const args = process.argv.slice(2);
const FORCE = args.includes('--force');
const dateArg = args.find((a) => a.startsWith('--date='));
const today = dateArg ? dateArg.slice('--date='.length) : new Date().toISOString().slice(0, 10);

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');
fs.mkdirSync(POSTS_DIR, { recursive: true });

function frontmatter(stone) {
  // 「{石名} 意味」「{石名} 石言葉」「{石名} 効果」の3クエリを1タイトルで拾うため、
  // 中点で並べて自然な日本語に。tagline は「真実の愛の石」のような象徴ラベル。
  const title = `${stone.nameJa}の意味・石言葉・効果｜${stone.tagline}`;
  const desc = `${stone.nameJa}（${stone.nameEn}）の意味・石言葉「${stone.keywords.join('・')}」と効果、こんな人におすすめ、相性のよい石、浄化方法までを総合的に解説。${stone.tagline}の基礎と実践がこの1ページで分かります。`;
  return `---
title: "${title}"
description: "${desc.slice(0, 156)}"
date: "${today}"
category: "powerstones"
tags: [${stone.tags.map((t) => `"${t}"`).join(', ')}]
slug: "${stone.slug}"
draft: false
---
`;
}

function body(stone) {
  const lines = [];
  const push = (s) => lines.push(s);

  push('## はじめに');
  push('');
  push(stone.intro);
  push('');

  push('## 基本情報');
  push('');
  push('| 項目 | 内容 |');
  push('|---|---|');
  push(`| 石名 | ${stone.nameJa} / ${stone.nameEn} |`);
  push(`| 鉱物種 | ${stone.mineral} |`);
  push(`| 主な産地 | ${stone.origins} |`);
  push(`| モース硬度 | ${stone.hardness} |`);
  push(`| カラー | ${stone.colors} |`);
  push(`| 対応チャクラ | ${stone.chakra} |`);
  push('');

  push('## 石言葉と意味');
  push('');
  push(`${stone.nameJa}は「**${stone.keywords.join('・')}**」を象徴する石といわれています。${stone.tagline}として、世界中で長く愛されてきました。`);
  push('');

  push('### こんな人におすすめ');
  push('');
  for (const w of stone.forWhom) push(`- ${w}`);
  push('');

  push('## 効果と言われていること');
  push('');
  push('> **注意**：パワーストーンの「効果」は文化的・象徴的な意味合いです。医学的・科学的に保証されたものではありません。');
  push('');
  for (const e of stone.effects) push(`- ${e}`);
  push('');

  push('## 使い方の例');
  push('');
  push('1. **ブレスレットとして身につける**：肌に直接触れることで石とのつながりが深まると言われる。');
  push('2. **ペンダントとして胸元に**：第4チャクラ周辺にエネルギーを届けやすい。');
  push(`3. **デスクや枕元に置く**：${stone.nameJa}のエネルギーを生活空間に取り入れる伝統的な方法。`);
  push('4. **持ち歩く**：ポーチや財布にさざれ石を入れる、原石を携帯する等。');
  push('');

  push('## 相性のよい組み合わせ');
  push('');
  push('| 組み合わせ | 期待される意味 |');
  push('|---|---|');
  for (const c of stone.combos) push(`| ${stone.nameJa} × ${c.with} | ${c.meaning} |`);
  push(`| ${stone.nameJa} × 水晶 | エネルギーを増幅し、浄化作用を強める |`);
  push('');

  push('## 浄化方法');
  push('');
  push('向いている方法：');
  push('');
  for (const p of stone.purify) push(`- **${p}**`);
  push('');
  if (stone.avoid && stone.avoid.length) {
    push('避けたい方法：');
    push('');
    for (const a of stone.avoid) push(`- ${a}`);
    push('');
  }

  const price = prices[stone.slug];
  if (price) {
    push('## 価格相場');
    push('');
    push(`市販されている${stone.nameJa}の価格目安は以下のとおりです（2026年時点・A〜AAランク品）。`);
    push('');
    push('| 形状 | 相場 |');
    push('|---|---|');
    push(`| ブレスレット（8mm玉前後） | **${price.bracelet}** |`);
    push(`| タンブル・さざれ石（50g） | **${price.tumble}** |`);
    push('');
    push(`> ${price.note}`);
    push('');
    push('価格は産地・グレード・大きさによって大きく変動します。鑑別書付き・透明感や色の濃さなど、複数の店舗で比較してから選ぶのがおすすめです。');
    push('');
  }

  push('## 偽物・人工石の見分け方');
  push('');
  push('- 天然石は色ムラや微細な内包物・クラックがあるのが自然な姿。');
  push('- 透明度や発色が均一すぎる場合は、ガラスや人工石・染色処理石の可能性がある。');
  push(`- ${stone.nameJa}は人気の高い石ほど偽物が出回りやすい。鑑別書つき・信頼できる専門店での購入が安心。`);
  push('');

  push('## まとめ');
  push('');
  push(`- ${stone.nameJa}は「${stone.keywords.join('・')}」を象徴するパワーストーン。`);
  for (const e of stone.effects.slice(0, 2)) {
    const clean = e.replace(/\*\*/g, '').replace(/^[-・]\s*/, '');
    push(`- ${clean}`);
  }
  push(`- 浄化は ${stone.purify.slice(0, 2).join('・')} が向いています。${stone.avoid && stone.avoid.length ? stone.avoid[0] + ' は避けるのがおすすめ。' : ''}`);
  push('');
  push(`身につけるたびに「${stone.keywords[0]}」を思い出させてくれる――${stone.nameJa}は、そんな付き合い方ができる石です。`);

  return lines.join('\n');
}

let written = 0;
let skipped = 0;
for (const stone of stones) {
  const fname = `${today}-${stone.slug}.md`;
  const fpath = path.join(POSTS_DIR, fname);

  // Find any existing file matching this slug, regardless of date prefix.
  const existing = fs
    .readdirSync(POSTS_DIR)
    .find((f) => f.endsWith(`-${stone.slug}.md`));

  if (existing && !FORCE) {
    skipped++;
    continue;
  }

  // With --force, remove any older-dated file for this slug so we don't
  // end up with two copies of the same article on different dates.
  if (existing && existing !== fname) {
    fs.unlinkSync(path.join(POSTS_DIR, existing));
  }

  const md = `${frontmatter(stone)}\n${body(stone)}\n`;
  fs.writeFileSync(fpath, md);
  written++;
}

console.log(`✓ generate-stones — wrote ${written}, skipped ${skipped} (total stones: ${stones.length})`);
