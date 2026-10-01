import fs from "fs";
const file = "app/en/page.jsx";
if (fs.existsSync(file)) {
    let text = fs.readFileSync(file, "utf8");
    // 重複エラーを防ぐため、まだ locale が無い PostCard にだけ確実に locale="en" を追加
    text = text.replace(/<PostCard(?![^>]*locale=)/g, '<PostCard locale="en"');
    fs.writeFileSync(file, text, "utf8");
    console.log("✨ トップページからの英語化の合図を完璧にセットしました！");
}
