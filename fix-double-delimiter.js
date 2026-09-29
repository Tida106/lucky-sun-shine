const fs = require("fs");
const path = require("path");

const POSTS_DIR = path.join(process.cwd(), "content", "posts");
const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith(".en.md"));
let fixedCount = 0;
const fixedFiles = [];

for (const file of files) {
  const filePath = path.join(POSTS_DIR, file);
  const raw = fs.readFileSync(filePath, "utf8");
  const lines = raw.split("\n");

  if (lines[0].trim() !== "---") continue;

  // 2つ目の --- を探す（frontmatterの終端候補）
  let firstEnd = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === "---") { firstEnd = i; break; }
  }
  if (firstEnd === -1) continue;

  // その直後が空行→---（余分な区切り線）になっているケースを削除
  let j = firstEnd + 1;
  let removed = false;
  // 直後の空行はスキップして確認
  let k = j;
  while (k < lines.length && lines[k].trim() === "") k++;
  if (k < lines.length && lines[k].trim() === "---") {
    // firstEnd+1 〜 k の行（空行＋余分な---）を削除
    lines.splice(firstEnd + 1, k - firstEnd);
    removed = true;
  }

  if (removed) {
    fs.writeFileSync(filePath, lines.join("\n"), "utf8");
    fixedCount++;
    fixedFiles.push(file);
  }
}

console.log(`修正件数: ${fixedCount}`);
fixedFiles.forEach(f => console.log(" - " + f));
