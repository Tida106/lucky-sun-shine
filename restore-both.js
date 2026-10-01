const { execSync } = require("child_process");
const fs = require("fs");

try {
    const files = execSync(`git ls-files`, { encoding: 'utf8' }).split("\n").map(f => f.trim()).filter(Boolean);
    
    // 誕生日石の記事を「日本語版」と「英語版」の両方特定
    const jpFiles = files.filter(f => f.includes("birthday-stone-365") && !f.includes(".en.") && !f.includes("node_modules"));
    const enFiles = files.filter(f => f.includes("birthday-stone-365") && f.includes(".en.") && !f.includes("node_modules"));
    
    // 確実な安全圏（9月29日）のコミットを取得
    const safeCommit = execSync(`git rev-list -n 1 --before="2026-09-29 23:59:59" HEAD`, { encoding: 'utf8' }).trim();
    
    // 1. 日本語版の復元
    if (jpFiles.length > 0) {
        const jpContent = execSync(`git show ${safeCommit}:${jpFiles[0]}`, { encoding: 'utf8' });
        fs.writeFileSync(jpFiles[0], jpContent, "utf8");
        console.log(`✅ 日本語版を復元しました: ${jpFiles[0]}`);
    }
    
    // 2. 英語版の復元
    if (enFiles.length > 0) {
        const enContent = execSync(`git show ${safeCommit}:${enFiles[0]}`, { encoding: 'utf8' });
        fs.writeFileSync(enFiles[0], enContent, "utf8");
        console.log(`✅ 英語版を復元しました: ${enFiles[0]}`);
    }
} catch (e) {
    console.error("エラー:", e.message);
}
