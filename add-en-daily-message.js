const fs = require("fs");
const filePath = "components/DailyMessage.jsx";
let content = fs.readFileSync(filePath, "utf8");

const oldImports = `import { useEffect, useState } from 'react';
import SunMascot from './SunMascot';
import messages from '@/data/daily-messages.json';`;

const newImports = `import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import SunMascot from './SunMascot';
import messagesJa from '@/data/daily-messages.json';
import messagesEn from '@/data/daily-messages.en.json';`;

const oldBody = `export default function DailyMessage() {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const i = Math.floor(Math.random() * messages.length);
    setMessage(messages[i] || messages[0]);
  }, []);`;

const newBody = `export default function DailyMessage() {
  const pathname = usePathname() || '';
  const isEn = pathname.startsWith('/en');
  const messages = isEn ? messagesEn : messagesJa;
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const i = Math.floor(Math.random() * messages.length);
    setMessage(messages[i] || messages[0]);
  }, [isEn]);`;

let changed = false;

if (content.includes(oldImports)) {
  content = content.replace(oldImports, newImports);
  changed = true;
}
if (content.includes(oldBody)) {
  content = content.replace(oldBody, newBody);
  changed = true;
}

// ラベルと見出しの英語化
content = content.replace(
  ">\n          DAILY MESSAGE\n        </p>",
  ">\n          {isEn ? 'DAILY MESSAGE' : 'DAILY MESSAGE'}\n        </p>"
);
content = content.replace(
  /太陽ちゃんからの今日のひとこと[^\n<]*/,
  (m) => `{isEn ? "A word from Sun-chan today" : "${m}"}`
);
content = content.replace(
  'alt="太陽ちゃん（I BELIEVE U!）"',
  'alt={isEn ? "Sun-chan (I BELIEVE U!)" : "太陽ちゃん（I BELIEVE U!）"}'
);

fs.writeFileSync(filePath, content, "utf8");
console.log("変更適用:", changed ? "成功" : "一部見つからず（要確認）");
