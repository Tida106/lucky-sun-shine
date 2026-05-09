# content/ — 記事の置き場

ここに `.md` ファイルを置くと自動で記事化されます。

## ファイル名規則
`YYYY-MM-DD-slug.md` を推奨（例: `2026-05-09-rose-quartz-meaning.md`）。
URL は `/blog/<slug>/` になります（frontmatter の `slug` が優先）。

## frontmatter
```yaml
---
title: "記事タイトル"
description: "メタディスクリプション（120字前後）"
date: "2026-05-09"
category: "powerstones"  # powerstones | powerspots | lucky-goods | luck-habits
tags: ["タグ1", "タグ2"]
draft: false             # 公開時は false / true で非公開
---
```

## 本文 Tips
- `## 大見出し` `### 中見出し` を使うと、左側にオレンジのアクセント線が入ります。
- リスト・表・引用・コードブロックは GFM 互換。
- アフィリエイトリンクは `[商品名](https://...)` の通常リンクで OK。必要に応じ `rel="sponsored"` を付ける場合は HTML を直接記述。
