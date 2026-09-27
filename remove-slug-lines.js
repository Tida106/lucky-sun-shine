const fs = require("fs");
const path = require("path");

const POSTS_DIR = path.join(process.cwd(), "content", "posts");
const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith(".en.md"));
let fixedCount = 0;

for (const file of files) {
  const filePath = path.join(POSTS_DIR, file);
  const lines = fs.readFileSync(filePath, "utf8").split("\n");
  const newLines = lines.filter(line => !/^slug:\s*.*/.test(line));
  if (newLines.length !== lines.length) {
    fs.writeFileSync(filePath, newLines.join("\n"), "utf8");
    fixedCount++;
  }
}
console.log(`slug行を削除したファイル数: ${fixedCount}`);
