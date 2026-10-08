import fs from 'node:fs';
import path from 'node:path';

// ビルド時に「実在する固定ページ(動的でないルート)」の一覧を作る。
// app/ 配下の page.jsx / page.js があるディレクトリを、そのままURLパスとみなす
// (静的書き出しで out/ 配下に作られるページと一致する)。
// 言語切り替えボタンが「今のページの別言語版があるか」を判定するのに使う。
// 動的ルート([slug] など)は、記事の実在判定(lib/posts.js)が別にあるので除外する。
const APP_DIR = path.join(process.cwd(), 'app');
const PAGE_FILES = new Set(['page.jsx', 'page.js', 'page.tsx']);

let _cache = null;

export function getStaticRoutes() {
  if (_cache) return _cache;
  const routes = [];
  const walk = (dir, segments) => {
    let entries = [];
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    if (entries.some((e) => e.isFile() && PAGE_FILES.has(e.name))) {
      routes.push(segments.length ? `/${segments.join('/')}/` : '/');
    }
    for (const e of entries) {
      if (!e.isDirectory()) continue;
      if (e.name.startsWith('[') || e.name.startsWith('_') || e.name.startsWith('(')) continue;
      walk(path.join(dir, e.name), [...segments, e.name]);
    }
  };
  walk(APP_DIR, []);
  _cache = routes.sort();
  return _cache;
}
