const fs = require("fs");
const filePath = "lib/posts.js";
let content = fs.readFileSync(filePath, "utf8");

if (content.includes("jaData")) {
  console.log("既に修正済み");
} else {
  const before = "const slug = data.slug || baseName;";
  const after = `let slug = data.slug || baseName;
    if (isEn) {
      for (const ext of ['.md', '.mdx']) {
        const jaPath = path.join(POSTS_DIR, baseName + ext);
        if (fs.existsSync(jaPath)) {
          const jaData = matter(fs.readFileSync(jaPath, 'utf8')).data;
          slug = jaData.slug || baseName;
          break;
        }
      }
    }`;
  if (content.includes(before)) {
    content = content.replace(before, after);
    fs.writeFileSync(filePath, content, "utf8");
    console.log("slug修正: 成功");
  } else {
    console.log("該当箇所が見つかりません");
  }
}
