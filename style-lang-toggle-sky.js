const fs = require("fs");
const filePath = "components/Header.jsx";
let content = fs.readFileSync(filePath, "utf8");

const oldClass = `className="inline-flex items-center justify-center h-9 px-3 rounded-full bg-amber-100 border border-amber-300 hover:bg-amber-200 transition-colors text-amber-800 text-xs font-bold mr-1"`;
const newClass = `className="inline-flex items-center justify-center h-9 px-3 rounded-full bg-sky-100 border border-sky-300 hover:bg-sky-200 hover:shadow-[0_0_12px_rgba(56,189,248,0.5)] transition-all text-sky-700 text-xs font-bold mr-1"`;

if (content.includes(oldClass)) {
  content = content.replace(oldClass, newClass);
  fs.writeFileSync(filePath, content, "utf8");
  console.log("スタイル変更: 成功");
} else {
  console.log("該当箇所が見つかりませんでした（既に変更済みか、別のコードの可能性）");
}
