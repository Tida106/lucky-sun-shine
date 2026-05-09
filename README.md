# Lucky Sun Shine ☀️

パワーストーン・パワースポット・開運グッズ・運気アップ習慣の総合メディア。

🌐 **https://lucky-sun-shine.com**

## 技術構成

- Next.js 15（App Router）
- Static Export → GitHub Pages
- Tailwind CSS
- Markdown 記事管理（gray-matter + remark）

## クイックスタート

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # out/ に静的書き出し
```

## 記事を書く

```bash
npm run new:post -- "記事タイトル" powerstones "タグ1,タグ2"
```

`content/posts/YYYY-MM-DD-slug.md` が生成されます。本文を書いて `draft: false`（または `draft` 行を削除）にして push すれば自動デプロイされます。

詳しくは [CLAUDE.md](./CLAUDE.md) を参照。

## カテゴリ

| slug | 名称 |
|---|---|
| `powerstones` | パワーストーン |
| `powerspots`  | パワースポット |
| `lucky-goods` | 開運グッズ |
| `luck-habits` | 運気アップ習慣 |
