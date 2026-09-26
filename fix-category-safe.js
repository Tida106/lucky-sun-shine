const fs = require("fs");
const path = require("path");

const POSTS_DIR = path.join(process.cwd(), "content", "posts");
const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith(".md") || f.endsWith(".mdx"));
const changed = [];

for (const file of files) {
  const filePath = path.join(POSTS_DIR, file);
  const raw = fs.readFileSync(filePath, "utf8");
  if (/^category:\s*"powerspot"\s*$/m.test(raw)) {
    const updated = raw.replace(/^category:\s*"powerspot"\s*$/m, "category: \"powerspots\"");
    fs.writeFileSync(filePath, updated, "utf8");
    changed.push(file);
  }
}

console.log("修正件数:", changed.length);
changed.forEach(f => console.log(" -", f));
