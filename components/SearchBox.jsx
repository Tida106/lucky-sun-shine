'use client';
// Client-side search backed by the static /search-index.json built at
// prebuild time. No external lib — a small in-browser score function
// is enough for the current corpus size (~130 posts).
import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';

function score(post, terms) {
  const haystack = [
    post.title,
    post.description,
    (post.tags || []).join(' '),
    post.body,
  ].join(' ').toLowerCase();
  let total = 0;
  for (const t of terms) {
    if (!t) continue;
    const lt = t.toLowerCase();
    if (post.title.toLowerCase().includes(lt)) total += 10;
    if ((post.tags || []).some((x) => x.toLowerCase().includes(lt))) total += 5;
    if (post.description.toLowerCase().includes(lt)) total += 3;
    if (haystack.includes(lt)) total += 1;
  }
  return total;
}

export default function SearchBox({ initialQuery = '', limit = 30, autofocus = false }) {
  const [q, setQ] = useState(initialQuery);
  const [index, setIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (index || loading) return;
    if (!q) return;
    setLoading(true);
    fetch((process.env.NEXT_PUBLIC_BASE_PATH || '') + '/search-index.json')
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('index fetch failed'))))
      .then((data) => setIndex(data))
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false));
  }, [q, index, loading]);

  const results = useMemo(() => {
    if (!index || !q.trim()) return [];
    const terms = q.trim().split(/\s+/).filter(Boolean);
    return index
      .map((p) => ({ ...p, _score: score(p, terms) }))
      .filter((p) => p._score > 0)
      .sort((a, b) => b._score - a._score)
      .slice(0, limit);
  }, [index, q, limit]);

  return (
    <div className="w-full">
      <label htmlFor="lss-search" className="sr-only">サイト内検索</label>
      <input
        id="lss-search"
        type="search"
        autoFocus={autofocus}
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="キーワードで検索（例：ローズクォーツ、金運、出雲大社）"
        className="w-full px-4 py-3 rounded-full border border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-300 outline-none bg-white"
      />

      {loading && <p className="mt-3 text-sm text-ink-500">検索インデックスを読み込み中…</p>}
      {error && <p className="mt-3 text-sm text-red-600">エラー: {error}</p>}

      {q.trim() && index && (
        <div className="mt-4">
          <p className="text-xs text-ink-500 mb-2">{results.length} 件ヒット</p>
          <ul className="divide-y divide-amber-100">
            {results.map((r) => (
              <li key={r.slug} className="py-3">
                <Link href={`/blog/${r.slug}/`} className="block hover:bg-amber-50 rounded p-2 -mx-2">
                  <div className="text-xs text-amber-700 font-bold">
                    {r.category} · {new Date(r.date).toISOString().slice(0, 10)}
                  </div>
                  <div className="font-bold text-ink-900 mt-1 leading-snug">{r.title}</div>
                  {r.description && (
                    <div className="text-sm text-ink-700 mt-1 line-clamp-2">{r.description}</div>
                  )}
                </Link>
              </li>
            ))}
            {results.length === 0 && (
              <li className="py-6 text-center text-ink-500 text-sm">
                該当する記事が見つかりませんでした。<br />
                別のキーワードでお試しください。
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
