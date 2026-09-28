import fs from 'fs';
import path from 'path';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-3.8-flash" });
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
13. Markdownのコードブロック記号(\`\`\`)等で出力全体を囲まないこと。ファイルの中身のみをそのまま出力してください。
`;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  const files = fs.readdirSync(POSTS_DIR);
  const targetFiles = files.filter(f => f.endsWith('.md') && !f.endsWith('.en.md') && f !== '_template.md');

  let processedCount = 0;
  let skippedCount = 0;
  const createdFiles = [];

  for (const file of targetFiles) {
    const enFileName = file.replace(/\.md$/, '.en.md');
    const enFilePath = path.join(POSTS_DIR, enFileName);
    const originalFilePath = path.join(POSTS_DIR, file);

    if (fs.existsSync(enFilePath)) {
      console.log(`スキップ: ${enFileName} (既に存在します)`);
      skippedCount++;
      continue;
    }

    console.log(`翻訳中: ${file} ...`);
    try {
      const content = fs.readFileSync(originalFilePath, 'utf8');
      const result = await model.generateContent(`${promptInstruction}\n\n---\n以下が翻訳対象のファイルです:\n\n${content}`);
      let translatedText = result.response.text();

      translatedText = translatedText.replace(/^```markdown\n/, '').replace(/^```\n/, '').replace(/\n```$/, '').trim();

      fs.writeFileSync(enFilePath, translatedText, 'utf8');
      console.log(`  -> 成功: ${enFileName} を作成しました。`);
      createdFiles.push(enFileName);
      processedCount++;

      // API制限回避のため4.5秒待機
      await sleep(4500);
    } catch (error) {
      console.error(`  -> エラー: ${file} の翻訳に失敗しました。`, error.message);
    }
  }

  console.log('\n=== 完了レポート ===');
  console.log(`作成したファイル数: ${processedCount}`);
  console.log(`スキップしたファイル数: ${skippedCount}`);
  if (createdFiles.length > 0) {
    console.log('作成したファイル一覧:');
    createdFiles.forEach(f => console.log(` - ${f}`));
  }
}

main();




