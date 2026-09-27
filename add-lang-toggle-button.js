const fs = require("fs");
const filePath = "components/Header.jsx";
let content = fs.readFileSync(filePath, "utf8");

const anchor = `        <div className="flex items-center gap-2">
          <Link
            href={t.search}`;

const withToggle = `        <div className="flex items-center gap-2">
          <Link
            href={otherLangHref}
            className="inline-flex items-center justify-center h-9 px-3 rounded-full border border-amber-200 hover:bg-amber-50 transition-colors text-[#9C7A47] text-xs font-bold"
            title={isEn ? 'Switch to Japanese' : 'Switch to English'}
          >
            {langToggleLabel}
          </Link>
          <Link
            href={t.search}`;

if (!content.includes("langToggleLabel}\\n          </Link>")) {
  content = content.replace(anchor, withToggle);
  fs.writeFileSync(filePath, content, "utf8");
  console.log("ボタン追加: 成功");
} else {
  console.log("既に追加済みでした");
}
