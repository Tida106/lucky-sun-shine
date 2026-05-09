#!/usr/bin/env node
// Bulk Markdown generator for the structured-data driven articles:
//   - data/luck-by-need.js   → 10 articles (powerstones)
//   - data/birthstones.js    → 12 articles (powerstones)
//   - data/zodiac.js         → 12 articles (powerstones)
//   - data/eto.js            → 12 articles (powerstones)
// Idempotent — only writes if a file with the same slug doesn't already
// exist. Pass --force to overwrite (and clean up older-dated dupes).
const fs = require('node:fs');
const path = require('node:path');
const { lucks } = require('../data/luck-by-need');
const { birthstones } = require('../data/birthstones');
const { zodiac } = require('../data/zodiac');
const { eto } = require('../data/eto');

const args = process.argv.slice(2);
const FORCE = args.includes('--force');
const dateArg = args.find((a) => a.startsWith('--date='));
const today = dateArg ? dateArg.slice('--date='.length) : new Date().toISOString().slice(0, 10);

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');
fs.mkdirSync(POSTS_DIR, { recursive: true });

function writeMd(slug, content) {
  const fname = `${today}-${slug}.md`;
  const fpath = path.join(POSTS_DIR, fname);
  const existing = fs.readdirSync(POSTS_DIR).find((f) => f.endsWith(`-${slug}.md`));
  if (existing && !FORCE) return false;
  if (existing && existing !== fname) {
    fs.unlinkSync(path.join(POSTS_DIR, existing));
  }
  fs.writeFileSync(fpath, content);
  return true;
}

let written = 0;
let skipped = 0;

// =============================================================
// 1. 悩み別おすすめ石 (10)
// =============================================================
for (const item of lucks) {
  const title = `【${item.need}】${item.titleSuffix}`;
  const desc = `${item.need}を高めたい人に向けて、本当に効くと言われるパワーストーン10種を紹介。各石の意味・相性・使い方まで解説します。`;
  const fm = `---
title: "${title}"
description: "${desc.slice(0, 140)}"
date: "${today}"
category: "powerstones"
tags: [${item.tags.map((t) => `"${t}"`).join(', ')}]
slug: "${item.slug}"
draft: false
---
`;
  const lines = [];
  lines.push(`## はじめに`);
  lines.push('');
  lines.push(item.intro);
  lines.push('');
  lines.push(`## ${item.emoji} ${item.need}におすすめのパワーストーン10選`);
  lines.push('');
  for (const [i, s] of item.stones.entries()) {
    lines.push(`### ${i + 1}. ${s.name}`);
    lines.push('');
    lines.push(s.why);
    lines.push('');
  }
  lines.push(`## ${item.need}を高める使い方`);
  lines.push('');
  for (const t of item.tips) lines.push(`- ${t}`);
  lines.push('');
  lines.push(`## 浄化方法の基本`);
  lines.push('');
  lines.push('複数の石を組み合わせる場合、定期的な浄化がより重要になります。');
  lines.push('');
  lines.push('- **水晶さざれ石の上に置く**：もっとも安全で全石対応');
  lines.push('- **ホワイトセージの煙にくぐらせる**：1〜2分で十分');
  lines.push('- **月光浴**：満月の夜に窓辺に置く');
  lines.push('');
  lines.push('> 水・塩・直射日光に弱い石もあるため、必ず**個別の石の浄化方法**を確認してから行ってください。');
  lines.push('');
  lines.push('## まとめ');
  lines.push('');
  lines.push(`- ${item.need}に効くとされるパワーストーンは多様。**自分の状況に合う1〜2石**を選ぶのが現実的。`);
  lines.push('- まずは王道の **' + item.stones.slice(0, 2).map((s) => s.name).join('・') + '** から試してみるのも◎。');
  lines.push('- 単独より、**水晶**と組み合わせるとエネルギーが安定します。');
  lines.push('');
  lines.push('身につけ続けることで、自分の状態に**気づき**やすくなる――それがパワーストーンとの一番の付き合い方です。');

  if (writeMd(item.slug, fm + '\n' + lines.join('\n') + '\n')) written++; else skipped++;
}

// =============================================================
// 2. 誕生石 (12)
// =============================================================
const monthName = (m) => `${m}月`;
for (const item of birthstones) {
  const title = `${monthName(item.month)}の誕生石｜${item.primary}の意味と効果・選び方`;
  const desc = `${monthName(item.month)}の誕生石「${item.primary}」の意味・効果・身につけ方・相性のよい石まで総合的に解説します。`;
  const fm = `---
title: "${title}"
description: "${desc.slice(0, 140)}"
date: "${today}"
category: "powerstones"
tags: ["誕生石", "${item.primary.split('（')[0]}", "${monthName(item.month)}"]
slug: "${item.slug}"
draft: false
---
`;
  const lines = [];
  lines.push('## はじめに');
  lines.push('');
  lines.push(item.intro);
  lines.push('');
  lines.push('## 基本情報');
  lines.push('');
  lines.push('| 項目 | 内容 |');
  lines.push('|---|---|');
  lines.push(`| 月 | **${monthName(item.month)}** |`);
  lines.push(`| 誕生石 | ${item.primary} |`);
  lines.push(`| カラー | ${item.color} |`);
  lines.push(`| 石言葉 | ${item.keywords.join('・')} |`);
  lines.push(`| 主なご利益 | ${item.benefit} |`);
  lines.push('');
  lines.push('## 誕生石としての意味');
  lines.push('');
  lines.push(`${monthName(item.month)}に生まれた人に、生涯のお守りとして寄り添うのが**誕生石**の伝統です。${item.primary}は、${item.keywords.join('・')}を象徴する石として、人生の節目で力を貸してくれると言われています。`);
  lines.push('');
  lines.push('## おすすめの身につけ方');
  lines.push('');
  lines.push('- **誕生月の月初めから1ヶ月、毎日身につける**：誕生日エネルギーの吸収。');
  lines.push('- **ペンダントやリングで日常に**：肌に直接触れるアクセサリーが◎。');
  lines.push('- **誕生日にプレゼントとして贈られた石は特に縁深い**');
  lines.push('- **眠るときも枕元に**：誕生月の間は特に意識的に。');
  lines.push('');
  lines.push('## 相性のよい石');
  lines.push('');
  lines.push(`${item.primary}と組み合わせると効果がより安定すると言われる石を紹介します。`);
  lines.push('');
  for (const r of item.related) lines.push(`- **${r}**`);
  lines.push('');
  lines.push('## 浄化方法');
  lines.push('');
  lines.push('- 水晶さざれ石・ホワイトセージ・月光浴が無難');
  lines.push('- 個別の石によっては水・塩・日光NGの場合があるので、**石ごとの推奨方法**を確認してください');
  lines.push('');
  lines.push('## まとめ');
  lines.push('');
  lines.push(`- ${monthName(item.month)}の誕生石は **${item.primary}**。`);
  lines.push(`- ${item.keywords.join('・')}を象徴する石として、生涯のお守りに。`);
  lines.push(`- 相性のよい ${item.related.slice(0, 2).join('・')} と組み合わせると効果が安定。`);
  lines.push('');
  lines.push('誕生月のお祝いは、自分自身を労う良い機会。誕生石を身につけて、新しい1年のスタートを切ってみてください。');

  if (writeMd(item.slug, fm + '\n' + lines.join('\n') + '\n')) written++; else skipped++;
}

// =============================================================
// 3. 星座 (12)
// =============================================================
for (const item of zodiac) {
  const title = `${item.sign}（${item.signEn}）におすすめのパワーストーン｜性格と相性を読み解く`;
  const desc = `${item.sign}（${item.period}）の性格・運勢を支えるおすすめパワーストーンを${item.primary}を中心に紹介。星座別の選び方を解説します。`;
  const fm = `---
title: "${title}"
description: "${desc.slice(0, 140)}"
date: "${today}"
category: "powerstones"
tags: ["星座", "${item.sign}", "${item.primary}"]
slug: "${item.slug}"
draft: false
---
`;
  const lines = [];
  lines.push('## はじめに');
  lines.push('');
  lines.push(item.intro);
  lines.push('');
  lines.push('## 基本情報');
  lines.push('');
  lines.push('| 項目 | 内容 |');
  lines.push('|---|---|');
  lines.push(`| 星座 | **${item.sign}（${item.signEn}）** |`);
  lines.push(`| 期間 | ${item.period} |`);
  lines.push(`| 性格の特徴 | ${item.traits} |`);
  lines.push(`| メインの石 | ${item.primary} |`);
  lines.push('');
  lines.push(`## ${item.sign}とパワーストーンの関係`);
  lines.push('');
  lines.push(`${item.sign}は「**${item.traits}**」を象徴する星座です。星座のエネルギーと共鳴する石を身につけることで、自分本来の強みが活きやすくなると言われています。`);
  lines.push('');
  lines.push(`## ${item.sign}に最も合う石：${item.primary}`);
  lines.push('');
  lines.push(`${item.primary}は${item.sign}の本質的なエネルギーと深く共鳴する1石です。日常の身につけ方は、ペンダント・ブレスレット・ポケットの中の小さなタンブル石など、自分のスタイルに合わせて選んでください。`);
  lines.push('');
  lines.push('## 合わせて持ちたい相性◎の石');
  lines.push('');
  for (const s of item.secondary) lines.push(`- **${s}**`);
  lines.push('');
  lines.push('## 使い方のヒント');
  lines.push('');
  lines.push('- **誕生日の月（太陽が星座を通過する時期）に身につける**と最も共鳴しやすい');
  lines.push('- メインの1石＋相性石1〜2個の組み合わせで、エネルギーを補完');
  lines.push('- 月の満ち欠けに合わせて月光浴で浄化');
  lines.push('');
  lines.push('## まとめ');
  lines.push('');
  lines.push(`- ${item.sign}は**${item.traits}**の星座。`);
  lines.push(`- 最も共鳴するメインの石は **${item.primary}**。`);
  lines.push(`- 合わせて **${item.secondary.slice(0, 2).join('・')}** を持つと相互補完で安定。`);
  lines.push('');
  lines.push(`${item.sign}としての自分らしさを発揮したいときに。${item.primary}を1つ、お守りとして手元に置いてみてください。`);

  if (writeMd(item.slug, fm + '\n' + lines.join('\n') + '\n')) written++; else skipped++;
}

// =============================================================
// 4. 干支 (12)
// =============================================================
for (const item of eto) {
  const title = `${item.name}年生まれにおすすめのパワーストーン｜干支×石の相性`;
  const desc = `${item.name}年生まれの性格と運勢を支えるおすすめパワーストーンを${item.primary}を中心に紹介。干支別の選び方を解説します。`;
  const fm = `---
title: "${title}"
description: "${desc.slice(0, 140)}"
date: "${today}"
category: "powerstones"
tags: ["干支", "${item.name.split('（')[0]}", "${item.primary}"]
slug: "${item.slug}"
draft: false
---
`;
  const lines = [];
  lines.push('## はじめに');
  lines.push('');
  lines.push(item.intro);
  lines.push('');
  lines.push('## 基本情報');
  lines.push('');
  lines.push('| 項目 | 内容 |');
  lines.push('|---|---|');
  lines.push(`| 干支 | **${item.name}** |`);
  lines.push(`| 性格の特徴 | ${item.traits} |`);
  lines.push(`| メインの石 | ${item.primary} |`);
  lines.push('');
  lines.push(`## ${item.name}年生まれとパワーストーンの関係`);
  lines.push('');
  lines.push(`${item.name}年生まれは「**${item.traits}**」を象徴する干支です。日本では古来、生まれた年の干支に由来するお守りを持つ習慣があり、パワーストーンも同様の考え方で選ぶことができます。`);
  lines.push('');
  lines.push(`## 最も合う石：${item.primary}`);
  lines.push('');
  lines.push(`${item.primary}は${item.name}年生まれの本質と深く共鳴する1石です。常に身につけるアクセサリーとしても、お守りとしてポーチに入れて持ち歩くのも良い使い方です。`);
  lines.push('');
  lines.push('## 合わせて持ちたい相性◎の石');
  lines.push('');
  for (const s of item.secondary) lines.push(`- **${s}**`);
  lines.push('');
  lines.push('## 使い方のヒント');
  lines.push('');
  lines.push('- **新年・誕生日に新しい1石を迎える**：1年のお守りとして');
  lines.push('- 厄年や勝負どころには**メイン石＋相性石**をセットで');
  lines.push('- 1年の終わりに感謝を込めて浄化、新しい年へ');
  lines.push('');
  lines.push('## まとめ');
  lines.push('');
  lines.push(`- ${item.name}年生まれは**${item.traits}**の象徴。`);
  lines.push(`- 最も共鳴するメインの石は **${item.primary}**。`);
  lines.push(`- 合わせて **${item.secondary.slice(0, 2).join('・')}** を持つと相互補完で安定。`);
  lines.push('');
  lines.push('干支は12年で巡る大切な区切り。自分の干支の石を1つ持っておくと、人生の節目で頼れるお守りになります。');

  if (writeMd(item.slug, fm + '\n' + lines.join('\n') + '\n')) written++; else skipped++;
}

console.log(`✓ generate-content — wrote ${written}, skipped ${skipped}`);
