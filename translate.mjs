import fs from 'fs';
import path from 'path';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');

const promptInstruction = `
以下のMarkdownファイル（Frontmatter含む）を英語に翻訳してください。

【厳守するルール】
1. title, description: 自然な英語に翻訳する
2. date, updated: 元の値をそのまま維持する
3. category: 値は絶対に変更しない
4. tags: 各タグを自然な英語に翻訳する
5. slug: 存在する場合は英語として自然なスラッグに変更してよい
6. author: "太陽ちゃん" は "Sun-chan" に統一する
7. draft: 値をそのまま維持する
8. 本文は直訳ではなく、海外読者に自然に伝わる英語表現にする
9. 太陽ちゃんの親しみやすいキャラクター口調は英語でも維持する
10. 見出し(##, ###)の構造はそのまま維持する
11. frontmatterやMarkdown本文中で "&" という文字は絶対に単体で使わず、必ず "and" と書く
12. リンクや画像パスがあればそのまま維持する(URLは翻訳しない)
13. Markdownのコードブロック記号(\`\`\`)等で出力全体やfrontmatterを囲まないこと。ファイルの中身のみをそのまま出力してください。
14. 出力の1行目は必ず "---" で始め、frontmatterの区切り "---" は開始と終了の2つだけにすること。
`;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Geminiの出力を整形・検証する。不正ならnullを返す
function cleanOutput(text) {
  let t = text.replace(/^\uFEFF/, '');
  // コードフェンスを全部除去（```yaml / ```markdown / ``` 何でも）
  t = t.replace(/^\s*```[a-zA-Z]*\s*$/gm, '').trim();
  // 先頭の重複 --- を1つにまとめる
  t = t.replace(/^(---\s*\r?\n)+/, '---\n');
  // 検証：frontmatterにtitleとdateが必須
  const fm = t.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fm || !/^title:/m.test(fm[1]) || !/^date:/m.test(fm[1])) return null;
  return t + '\n';
}

async function main() {
  const files = fs.readdirSync(POSTS_DIR);
  const targetFiles = files.filter(f => f.endsWith('.md') && !f.endsWith('.en.md') && f !== '_template.md');

  let processedCount = 0;
  let skippedCount = 0;
  const createdFiles = [];
  const failedFiles = [];

  for (const file of targetFiles) {
    const enFileName = file.replace(/\.md$/, '.en.md');
    const enFilePath = path.join(POSTS_DIR, enFileName);
    const originalFilePath = path.join(POSTS_DIR, file);

    if (fs.existsSync(enFilePath)) {
      skippedCount++;
      continue;
    }

    console.log(`翻訳中: ${file} ...`);
    try {
      const content = fs.readFileSync(originalFilePath, 'utf8');
      const result = await model.generateContent(`${promptInstruction}\n\n以下が翻訳対象のファイルです:\n\n${content}`);
      const cleaned = cleanOutput(result.response.text());

      if (!cleaned) {
        console.error(`  -> 不正な出力のため保存せずスキップ: ${file}`);
        failedFiles.push(file);
      } else {
        fs.writeFileSync(enFilePath, cleaned, 'utf8');
        console.log(`  -> 成功: ${enFileName}`);
        createdFiles.push(enFileName);
        processedCount++;
      }
    } catch (error) {
      console.error(`  -> エラー: ${file}`, error.message);
      failedFiles.push(file);
    }

    // API制限回避のため4.5秒待機（失敗時も待つ）
    await sleep(4500);
  }

  console.log('\n=== 完了レポート ===');
  console.log(`作成: ${processedCount} / スキップ(既存): ${skippedCount} / 失敗: ${failedFiles.length}`);
  if (createdFiles.length > 0) {
    console.log('作成したファイル:');
    createdFiles.forEach(f => console.log(` - ${f}`));
  }
  if (failedFiles.length > 0) {
    console.log('失敗したファイル（次回実行で再挑戦）:');
    failedFiles.forEach(f => console.log(` - ${f}`));
  }
}

main();