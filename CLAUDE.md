# Lucky Sun Shine — Claude Code 運用ガイド

## サイト基本情報
- サイト名: Lucky Sun Shine
- 公開URL: https://lucky-sun-shine.com
- GitHub: https://github.com/Tida106/lucky-sun-shine
- デプロイ先: GitHub Pages（カスタムドメイン）
- 技術スタック: Next.js 15 (App Router) / static export / Tailwind CSS / Markdown
- ターゲット: 日本語話者 / 開運・スピリチュアル系の初〜中級ユーザー

## ディレクトリ構成

```
lucky-sun-shine/
├── app/                       Next.js App Router
│   ├── layout.jsx             共通レイアウト（ヘッダー・フッター）
│   ├── page.jsx               トップページ
│   ├── blog/[slug]/page.jsx   個別記事
│   ├── category/[slug]/page.jsx  カテゴリ一覧
│   ├── tag/[slug]/page.jsx    タグ別一覧
│   ├── about/                 サイトについて
│   ├── privacy/               プライバシーポリシー
│   └── contact/               お問い合わせ
├── components/                共通コンポーネント
├── content/posts/             ★ 記事Markdown（AIで量産する場所）
├── lib/
│   ├── posts.js               Markdown読込・パース
│   ├── categories.js          カテゴリ定義
│   └── site.js                サイト共通設定
├── public/                    静的アセット（CNAME等）
├── scripts/
│   ├── generate-sitemap.js    sitemap.xml + robots.txt
│   ├── generate-rss.js        rss.xml
│   └── new-post.js            記事スカフォールド
└── .github/workflows/deploy-pages.yml  自動デプロイ
```

## カテゴリ（4種・lib/categories.js が真実の唯一の源）
1. `powerstones` — パワーストーン
2. `powerspots` — パワースポット
3. `lucky-goods` — 開運グッズ
4. `luck-habits` — 運気アップ習慣

## 記事を増やす（AI量産の基本フロー）

### 1. テンプレートからコピー
```bash
npm run new:post -- "天然石ローズクォーツの効果と意味" powerstones "ローズクォーツ,恋愛運"
```
→ `content/posts/YYYY-MM-DD-slug.md` が `draft: true` で生成される。

### 2. 編集
本文を書く。完成したら `draft: true` を `false` または削除。

### 3. push → 自動デプロイ
`main` への push で GitHub Actions が走り、約2〜3分で本番反映。

## frontmatter 仕様

```markdown
---
title: "記事タイトル"
description: "120字前後のメタディスクリプション"
date: "2026-05-09"
category: "powerstones"        # 必須・上記4種のいずれか
tags: ["ローズクォーツ", "恋愛運"]
slug: "rose-quartz-meaning"     # 任意・省略時はファイル名から自動
cover: "/images/posts/xxx.jpg"  # 任意
draft: false                    # 公開時は false（または削除）
---
```

## 作業ルール
- 記事は **必ず** `content/posts/*.md` に置く（コードに混ぜない）。
- `category` は 4種から1つだけ選ぶ。複数該当する場合は最も中心となるものを `category` にし、残りは `tags` で表現する。
- 1記事 = 1Markdownファイル。1記事の長さは 1500〜3500字を目安。
- 効果・効能を断定しない（「〜と言われています」「〜とされる」等）。薬機法・景品表示法に触れる表現は避ける。
- アフィリエイトリンクを置く場合は `<a href="..." rel="sponsored noopener" target="_blank">` を使う。
- 作業後は必ず `git push` する。GitHub Actions が静的ビルドして Pages にデプロイする。

## ローカル開発
```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # 静的書き出し → out/
```

## カスタムドメイン
`public/CNAME` に `lucky-sun-shine.com` を記載済み。GitHub Pages 側で
- リポジトリ Settings → Pages → Custom domain に `lucky-sun-shine.com` 入力
- DNS（ドメインレジストラ）で CNAME or A レコードを GitHub Pages に向ける
  - Apex: `185.199.108.153 / .109.153 / .110.153 / .111.153`
  - www: `tida106.github.io`
が必要。

## 次にやること（運用初期）
1. ✅ GitHub Pages 有効化済み（API経由）
2. カスタムドメイン DNS 設定 → HTTPS 自動発行を待つ
3. ✅ パワーストーン50種、シード記事公開済み
4. Google Search Console / Analytics 連携
5. Adsense / 楽天 / Amazon アフィリエイト導入（要審査）

## 運用環境変数（GitHub Actions の Secrets / Variables）

ビルド時に以下が読まれる。未設定でも動くがそれぞれ機能しない。

| 変数 | 用途 | 例 |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL`     | 各ページの絶対URL生成 | `https://lucky-sun-shine.com` |
| `NEXT_PUBLIC_GA_ID`        | Google Analytics GA4 計測ID | `G-XXXXXXXXXX` |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Google Search Console の所有権確認用 metaタグの値 | `abc123...` |
| `NEXT_PUBLIC_FORMSPREE_ID` | お問い合わせフォームの Formspree ID | `xpwadkva` |

設定方法：
1. リポジトリの Settings → Secrets and variables → Actions → Variables
2. `NEXT_PUBLIC_GA_ID` 等を Variable として追加（Public な値なので Secret ではなく Variable）
3. `.github/workflows/deploy-pages.yml` の `env:` ブロックに追記する形に拡張する
4. push すると次のビルドから反映される

## 一括記事生成

```bash
npm run gen:stones                # 既存ファイルがあればスキップ
npm run gen:stones -- --force     # 強制上書き
npm run gen:stones -- --date=YYYY-MM-DD
```

`data/powerstones.js` を編集 → 上記コマンドで `content/posts/` を更新。

## 記事テンプレート

- `content/templates/powerstone.md` — パワーストーン解説用
- `content/templates/powerspot.md`  — パワースポット紹介用
