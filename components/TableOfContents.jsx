'use client';
import { useEffect, useRef, useState } from 'react';

// 記事の見出し(h2/h3)から自動生成する目次。
// - lib/posts.js#extractHeadings がレンダリング済みHTMLから抽出した
//   {level, id, label}[] を受け取る。
// - IntersectionObserver で本文の見出し要素を監視し、現在位置に応じて
//   アクティブな項目をハイライトする。
// - variant に応じて見た目を切り替える:
//     'inline'  : 記事本文上部の折りたたみ(モバイル/狭幅向け、details)
//     'sticky'  : サイドバー先頭の常時表示パネル(PC・サイドバー位置で sticky)
// - クライアントJSはハイライトとリンククリックのみ。SSR/静的書き出しに優しい。

export default function TableOfContents({
  headings,
  variant = 'sticky',
  className = '',
}) {
  const [activeId, setActiveId] = useState(null);
  const lastSeenRef = useRef(null);

  useEffect(() => {
    if (!headings || headings.length === 0) return;
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return;

    const els = headings
      .map((h) => document.getElementById(h.id))
      .filter(Boolean);
    if (els.length === 0) return;

    // ビューポート上端から 20% 下、下端から 70% 上を「アクティブ帯」とする。
    // 該当帯に最後に入った見出しを現在地として扱う。これだと記事中ほどで
    // 大きな図表がある場合でも、見出しの切り替わりが直感的になる。
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            lastSeenRef.current = entry.target.id;
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 },
    );

    els.forEach((el) => observer.observe(el));
    // 初期値: 一番上の見出しを既定でアクティブに(まだスクロール前の状態)。
    setActiveId((cur) => cur || els[0].id);
    return () => observer.disconnect();
  }, [headings]);

  if (!headings || headings.length === 0) return null;

  const isInline = variant === 'inline';

  const itemList = (
    <ul className="space-y-1">
      {headings.map((h) => {
        const isActive = activeId === h.id;
        return (
          <li
            key={h.id}
            className={h.level === 3 ? 'pl-3' : ''}
          >
            <a
              href={`#${h.id}`}
              className={[
                'block py-1 pl-2 pr-2 rounded text-xs leading-snug transition-colors',
                h.level === 3 ? 'text-[11px] text-ink-600' : 'text-ink-800',
                isActive
                  ? 'bg-amber-100 text-amber-900 font-bold border-l-2 border-amber-500'
                  : 'border-l-2 border-transparent hover:bg-amber-50 hover:text-amber-800',
              ].join(' ')}
            >
              {h.label}
            </a>
          </li>
        );
      })}
    </ul>
  );

  if (isInline) {
    // モバイル向け折りたたみ。details/summary でクライアントJS最小。
    // 初期は閉じておき、長い記事でファーストビューを邪魔しない。
    return (
      <details
        className={`not-prose group rounded-2xl border-2 border-amber-300 bg-amber-50/60 shadow-[0_2px_12px_rgba(245,158,11,0.08)] overflow-hidden ${className}`}
      >
        <summary className="cursor-pointer list-none flex items-center justify-between px-4 py-3 text-sm font-bold text-ink-900 hover:bg-amber-100/60 transition-colors">
          <span className="inline-flex items-center gap-2">
            <span aria-hidden="true">📑</span>
            <span>目次（タップで開閉）</span>
          </span>
          <span
            aria-hidden="true"
            className="text-amber-700 text-xs transition-transform duration-200 group-open:rotate-180"
          >
            ▼
          </span>
        </summary>
        <nav aria-label="目次" className="px-3 pb-3 pt-1">
          {itemList}
        </nav>
      </details>
    );
  }

  // サイドバー先頭の常時表示パネル(PC)。
  // 親側で sticky にしているため、ここでは max-h と内部スクロールを担保する。
  return (
    <aside
      className={`rounded-2xl bg-white border border-amber-200 p-5 ${className}`}
      aria-label="記事の目次"
    >
      <h3 className="font-display text-sm font-bold text-ink-900 flex items-center gap-2 mb-3">
        <span aria-hidden="true">📑</span>
        <span>この記事の目次</span>
      </h3>
      <nav
        // ビューポート内に収まらないほど長いTOCでも、サイドバー全体を
        // 押し下げないよう独自スクロール領域にする。
        className="max-h-[60vh] overflow-y-auto pr-1"
      >
        {itemList}
      </nav>
    </aside>
  );
}
