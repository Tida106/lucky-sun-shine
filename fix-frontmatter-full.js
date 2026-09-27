const fs = require("fs");
const path = require("path");

const POSTS_DIR = path.join(process.cwd(), "content", "posts");
const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith(".en.md"));
let fixedCount = 0;
const fixedFiles = [];

function quoteIfNeeded(key, value) {
  value = value.trim();
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'")) ||
    value === ">-" || value === "|" || value === "" ||
    value.startsWith(">-") || value.startsWith("|")
  ) {
    return `${key}: ${value}`;
  }
  const escaped = value.replace(/"/g, '\\"');
  return `${key}: "${escaped}"`;
}

for (const file of files) {
  const filePath = path.join(POSTS_DIR, file);
  const raw = fs.readFileSync(filePath, "utf8");
  const lines = raw.split("\n");

  let changed = false;
  let bodyStartIndex = lines.length;

  const hasDelimiters = lines[0].trim() === "---";

  if (!hasDelimiters) {
    // frontmatter終わりを推定: キー行でも継続行(インデント)でもない
    // 最初の行をbodyの開始とみなす
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const isKeyLine = /^[a-zA-Z_]+:\s*.*$/.test(line);
      const isIndentedContinuation = /^\s+\S/.test(line) && line.trim() !== "";
      const isBlank = line.trim() === "";
      if (isKeyLine || isIndentedContinuation) {
        continue;
      }
      if (isBlank) {
        // 次の非空行がキー行かどうかで判断
        let j = i + 1;
        while (j < lines.length && lines[j].trim() === "") j++;
        if (j < lines.length && /^[a-zA-Z_]+:\s*.*$/.test(lines[j])) {
          continue; // まだfrontmatter内の空行
        } else {
          bodyStartIndex = i;
          break;
        }
      }
      bodyStartIndex = i;
      break;
    }
  }

  const frontmatterLines = hasDelimiters
    ? []
    : lines.slice(0, bodyStartIndex);
  const bodyLines = hasDelimiters
    ? []
    : lines.slice(bodyStartIndex);

  let newLines;

  if (!hasDelimiters) {
    // title, description 行のクォート修正
    const fixedFrontmatter = frontmatterLines.map((line) => {
      const m = line.match(/^(title|description):\s*(.*)$/);
      if (m) {
        return quoteIfNeeded(m[1], m[2]);
      }
      return line;
    });
    newLines = ["---", ...fixedFrontmatter, "---", ...bodyLines];
    changed = true;
  } else {
    // 既に --- がある場合、frontmatter内のtitle/descriptionだけクォート修正
    let inFm = false;
    let fmEnd = -1;
    newLines = [...lines];
    for (let i = 0; i < newLines.length; i++) {
      const line = newLines[i];
      if (line.trim() === "---") {
        if (!inFm) { inFm = true; continue; }
        else { fmEnd = i; break; }
      }
      if (!inFm) continue;
      const m = line.match(/^(title|description):\s*(.*)$/);
      if (m) {
        const fixedLine = quoteIfNeeded(m[1], m[2]);
        if (fixedLine !== line) {
          newLines[i] = fixedLine;
          changed = true;
        }
      }
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, newLines.join("\n"), "utf8");
    fixedCount++;
    fixedFiles.push(file);
  }
}

console.log(`修正件数: ${fixedCount}`);
fixedFiles.forEach(f => console.log(" - " + f));
