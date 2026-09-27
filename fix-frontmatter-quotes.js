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

  let inFrontmatter = false;
  let frontmatterEndIndex = -1;
  let changed = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === "---") {
      if (!inFrontmatter) {
        inFrontmatter = true;
        continue;
      } else {
        frontmatterEndIndex = i;
        break;
      }
    }
    if (!inFrontmatter) continue;

    // title: または description: で始まり、まだクォートで囲まれていない行を対象にする
    const match = line.match(/^(title|description):\s*(.*)$/);
    if (match) {
      const key = match[1];
      let value = match[2].trim();
      // 既にクォートで囲まれている場合はスキップ
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        continue;
      }
      // 値の中の " をエスケープしてダブルクォートで囲む
      const escaped = value.replace(/"/g, '\\"');
      lines[i] = `${key}: "${escaped}"`;
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, lines.join("\n"), "utf8");
    fixedCount++;
    fixedFiles.push(file);
  }
}

console.log(`修正件数: ${fixedCount}`);
fixedFiles.forEach(f => console.log(" - " + f));
