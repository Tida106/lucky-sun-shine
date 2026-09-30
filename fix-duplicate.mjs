import fs from "fs";
const file = "app/en/page.jsx";
if (fs.existsSync(file)) {
    let text = fs.readFileSync(file, "utf8");
    // 私のスクリプトで誤って先頭に追加してしまった重複分だけを綺麗に削除
    text = text.replace(/<PostCard(?:\s+locale="en")+/g, '<PostCard');
    fs.writeFileSync(file, text, "utf8");
    console.log("✨ 重複エラーを解消しました！");
}
