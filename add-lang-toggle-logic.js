const fs = require("fs");
const filePath = "components/Header.jsx";
let content = fs.readFileSync(filePath, "utf8");

const anchor = "  const getCategoryUrl = (slug) => (isEn ? `/en/category/${slug}/` : `/category/${slug}/`);";

const toggleLogic = `  const getCategoryUrl = (slug) => (isEn ? \`/en/category/\${slug}/\` : \`/category/\${slug}/\`);

  const otherLangHref = isEn
    ? (pathname.replace(/^\\/en/, '') || '/')
    : \`/en\${pathname}\`;
  const langToggleLabel = isEn ? 'JP' : 'EN';`;

if (!content.includes("otherLangHref")) {
  content = content.replace(anchor, toggleLogic);
  fs.writeFileSync(filePath, content, "utf8");
  console.log("ロジック追加: 成功");
} else {
  console.log("既に追加済みでした");
}
