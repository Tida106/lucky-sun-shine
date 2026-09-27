const fs = require("fs");
const path = require("path");

const targets = [
  "2026-05-10-aso-jinja.en.md",
  "2026-05-10-birthstone-december.en.md",
  "2026-05-10-birthstone-march.en.md",
  "2026-05-10-zodiac-libra.en.md",
  "2026-05-26-sardonyx.en.md",
];

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

for (const file of targets) {
  const filePath = path.join(POSTS_DIR, file);
  const lines = fs.readFileSync(filePath, "utf8").split("\n");
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^title:\s*(.*)$/);
    if (m) {
      let value = m[1].trim();
      // 既存のシングルクォートを剥がす
      if (value.startsWith("'") && value.endsWith("'")) {
        value = value.slice(1, -1);
      }
      const escaped = value.replace(/"/g, '\\"');
      lines[i] = `title: "${escaped}"`;
      console.log(`${file}: ${lines[i]}`);
    }
  }
  fs.writeFileSync(filePath, lines.join("\n"), "utf8");
}
