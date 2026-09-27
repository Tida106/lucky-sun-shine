const fs = require("fs");
const filePath = "components/DailyMessage.jsx";
let content = fs.readFileSync(filePath, "utf8");

const oldH2 = `        <h2 className="mt-1 font-display text-lg md:text-2xl font-extrabold text-ink-900">
          太陽ちゃんからの今日のひとこと💛
        </h2>`;

const newH2 = `        <h2 className="mt-1 font-display text-lg md:text-2xl font-extrabold text-ink-900">
          {isEn ? "A word from Sun-chan today 💛" : "太陽ちゃんからの今日のひとこと💛"}
        </h2>`;

if (content.includes(oldH2)) {
  content = content.replace(oldH2, newH2);
  fs.writeFileSync(filePath, content, "utf8");
  console.log("見出し修正: 成功");
} else {
  console.log("まだ見つかりません");
}
