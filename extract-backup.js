const { execSync } = require("child_process");
const fs = require("fs");

try {
    const commit = execSync(`git rev-list -n 1 --before="2026-09-30 12:59:00" HEAD`).toString().trim();
    const files = execSync(`git ls-tree -r --name-only ${commit}`).toString().split("\n");
    const target = files.find(f => f.includes("birthday-stone-365") && !f.includes("node_modules"));
    
    if (target) {
        const content = execSync(`git show ${commit}:${target}`);
        fs.writeFileSync("復旧用_過去の誕生日石データ.md", content);
        console.log("✨ 過去のデータを『復旧用_過去の誕生日石データ.md』として保存しました！");
    } else {
        console.log("対象ファイルが見つかりません。");
    }
} catch (e) {
    console.error("エラー:", e.message);
}
