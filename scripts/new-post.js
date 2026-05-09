#!/usr/bin/env node
// Quick scaffold for a new Markdown post.
// Usage: npm run new:post -- "記事タイトル" powerstones tag1,tag2
const fs = require('node:fs');
const path = require('node:path');

const [, , title, category = 'powerstones', tagsCsv = ''] = process.argv;
if (!title) {
  console.error('Usage: npm run new:post -- "タイトル" <category> <tag1,tag2>');
  process.exit(1);
}

const VALID = ['powerstones', 'powerspots', 'lucky-goods', 'luck-habits'];
if (!VALID.includes(category)) {
  console.error(`Invalid category. Use one of: ${VALID.join(', ')}`);
  process.exit(1);
}

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[\s　]+/g, '-')
    .replace(/[^\w\-ぁ-んァ-ン一-龯]/g, '')
    .slice(0, 80);
}

const today = new Date().toISOString().slice(0, 10);
const slug = `${today}-${slugify(title)}`;
const tags = tagsCsv ? tagsCsv.split(',').map((t) => t.trim()).filter(Boolean) : [];

const dir = path.join(process.cwd(), 'content', 'posts');
fs.mkdirSync(dir, { recursive: true });
const filePath = path.join(dir, `${slug}.md`);

if (fs.existsSync(filePath)) {
  console.error(`Already exists: ${filePath}`);
  process.exit(1);
}

const fm = `---
title: "${title}"
description: ""
date: "${today}"
category: "${category}"
tags: [${tags.map((t) => `"${t}"`).join(', ')}]
draft: true
---

## はじめに

ここに導入文を書きます。

## 見出し1

本文。

## まとめ

まとめ。
`;

fs.writeFileSync(filePath, fm);
console.log(`✓ Created: ${filePath}`);
