const { execSync } = require("child_process");
const fs = require("fs");

console.log("🔍 全履歴をスキャンして、表が完全に残っていたデータを探しています...");

function restoreLargest(filePath) {
    if (!filePath) return;
    const commits = execSync(`git log --format="%H" -- ${filePath}`).toString().trim().split("\n");
    let maxSize = 0;
    let bestContent = "";
    
    for (const commit of commits) {
        if (!commit) continue;
        try {
            const content = execSync(`git show ${commit}:${filePath}`).toString();
            // 365日分のデータは膨大になるため、文字数が最大だった履歴が「完全な表」のデータです
            if (content.length > maxSize) {
                maxSize = content.length;
                bestContent = content;
            }
        } catch(e) {}
    }
    
    if (maxSize > 0) {
        fs.writeFileSync(filePath, bestContent, "utf8");
        console.log(`✨ ${filePath} を一番データ量が多かった完全な状態（${maxSize}文字）に復元しました！`);
    }
}

const files = execSync(`git ls-files`).toString().split("\n").map(f => f.trim());
const jp = files.find(f => f.includes("birthday-stone-365") && !f.includes(".en.") && !f.includes("node_modules"));
const en = files.find(f => f.includes("birthday-stone-365") && f.includes(".en.") && !f.includes("node_modules"));

restoreLargest(jp);
restoreLargest(en);
