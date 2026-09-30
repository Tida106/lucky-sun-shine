import fs from 'fs';
import path from 'path';

const dir = 'content/posts';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.en.md'));
let fixedCount = 0;

for (const file of files) {
  const filePath = path.join(dir, file);
  let text = fs.readFileSync(filePath, 'utf-8');

  if (text.includes('```yaml')) {
    text = text.replace(/^(---\r?\n)+```yaml\r?\n/, '---\n');
    text = text.replace(/\r?\n```\r?\n/, '\n---\n');
    text = text.replace(/\r?\n---\r?\n---\r?\n/, '\n---\n');
    fs.writeFileSync(filePath, text, 'utf-8');
    fixedCount++;
  }
}
console.log(`\n✨ ${fixedCount} 個の英語記事データを完璧に修復しました！\n`);
