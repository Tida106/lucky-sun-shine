const fs = require("fs");
const path = require("path");

const POSTS_DIR = path.join(process.cwd(), "content", "posts");
const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith(".en.md"));
let fixedCount = 0;

for (const file of files) {
  const filePath = path.join(POSTS_DIR, file);
  const raw = fs.readFileSync(filePath, "utf8");
  if (raw.includes('description: ">-"')) {
    const updated = raw.replace(/description: ">-"/g, "description: >-");
    fs.writeFileSync(filePath, updated, "utf8");
    fixedCount++;
    console.log(" - " + file);
  }
}
console.log(`修正件数: ${fixedCount}`);
