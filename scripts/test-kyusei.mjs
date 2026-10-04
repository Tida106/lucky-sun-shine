// 九星気学・本命星計算のテストスクリプト。
// 実行: node scripts/test-kyusei.mjs
import { honmeiseiNumber, getStar, favorableDirections, yearChart } from '../lib/kyusei.js';

let pass = 0;
let fail = 0;

function check(label, actual, expected) {
  const ok = actual === expected;
  console.log(`${ok ? 'OK  ' : 'FAIL'} ${label}: got ${actual}, expected ${expected}`);
  if (ok) pass++;
  else fail++;
}

// 指定された6パターン
check('1990年6月1日生', getStar(honmeiseiNumber(1990, 6, 1)).name, '一白水星');
check('1999年6月1日生', getStar(honmeiseiNumber(1999, 6, 1)).name, '一白水星');
check('2000年6月1日生', getStar(honmeiseiNumber(2000, 6, 1)).name, '九紫火星');
check('2024年6月1日生', getStar(honmeiseiNumber(2024, 6, 1)).name, '三碧木星');
check('2025年6月1日生', getStar(honmeiseiNumber(2025, 6, 1)).name, '二黒土星');
check('2026年6月1日生', getStar(honmeiseiNumber(2026, 6, 1)).name, '一白水星');

// 立春（簡易2/4）区分: 1月・2月3日生まれは前年の星になる
check('2000年1月15日生 (前年=1999扱い)', getStar(honmeiseiNumber(2000, 1, 15)).name, '一白水星');
check('2000年2月3日生 (前年=1999扱い)', getStar(honmeiseiNumber(2000, 2, 3)).name, '一白水星');
check('2000年2月4日生 (当年扱い)', getStar(honmeiseiNumber(2000, 2, 4)).name, '九紫火星');
check('2025年1月1日生 (前年=2024扱い)', getStar(honmeiseiNumber(2025, 1, 1)).name, '三碧木星');

console.log(`\n${pass} passed, ${fail} failed`);

// 2026年の年盤・吉方位を出力（目視確認用）
console.log('\n--- 2026年 年盤 ---');
console.log(yearChart(2026));

console.log('\n--- 2026年 本命星別 吉方位 ---');
for (let n = 1; n <= 9; n++) {
  const dirs = favorableDirections(n, 2026).map((d) => d.label);
  console.log(`${getStar(n).name}: ${dirs.join('・') || '(なし)'}`);
}

if (fail > 0) process.exit(1);
