// 全カテゴリ・全シリーズが一覧できる回遊サイドバー。
// 構成:
//   1. サイト内検索リンク
//   2. カテゴリで探す(メイン4カテゴリ + ピラー記事へのショートカット)
//   3. ハブから探す(星座/誕生石/干支/運気/風水/開運グッズ/神社×2 を <details> で展開)
//   4. 編集部おすすめ(既存 PopularPosts)
//
// クライアントJSなしで実装。長いリスト(12星座/12誕生石/12干支/10運気)は
// <details> による折りたたみで初期表示の縦長さを抑える。
import Link from 'next/link';
import PopularPosts from './PopularPosts';
import TableOfContents from './TableOfContents';
import { SearchIcon } from './icons/NavIcons';
import { mainCategories } from '@/lib/categories';
import { series, accentClasses } from '@/lib/series';
import CategoryIcon from './CategoryIcon';
import SunOrnament from './icons/SunOrnament';

// 初期表示で開いておくシリーズ。短いものは開く・長いものは閉じる、
// で初期表示の縦長さを8〜10カテゴリ分くらいに抑える。
const DEFAULT_OPEN_SERIES = new Set(['lucky-goods', 'shrine-benefit', 'shrine-region', 'fengshui']);

function CardHeading({ children }) {
  return (
    <>
      <h3 className="font-display text-lg font-bold text-ink-900 flex items-center gap-2">
        <SunOrnament className="w-5 h-5 text-amber-500 shrink-0" />
        <span>{children}</span>
      </h3>
      <span aria-hidden="true" className="heading-rule mt-2 mb-4 ml-7" />
    </>
  );
}

function SeriesSection({ s }) {
  const a = accentClasses(s.accent);
  const isOpen = DEFAULT_OPEN_SERIES.has(s.id);
  return (
    <details className={`group rounded-xl border border-amber-100 bg-white/80 ${a.bar} border-l-4`} open={isOpen}>
      <summary className="flex items-center justify-between cursor-pointer list-none px-3 py-2 hover:bg-amber-50/80 rounded-xl transition-colors">
        <span className="text-sm font-bold text-ink-900">{s.label}</span>
        <span
          aria-hidden="true"
          className="shrink-0 text-amber-600 text-xs transition-transform duration-200 group-open:rotate-180"
        >
          ▼
        </span>
      </summary>
      <div className="px-3 pb-3 pt-1">
        {s.hubSlug && (
          <Link
            href={`/blog/${s.hubSlug}/`}
            className={`block mb-2 px-3 py-1.5 rounded-lg text-xs font-bold ${a.chip} hover:opacity-90 transition-opacity`}
          >
            ☀️ {s.hubLabel || '総合ガイドを見る'} →
          </Link>
        )}
        <ul className="space-y-0.5">
          {s.items.map((it) => (
            <li key={it.slug}>
              <Link
                href={`/blog/${it.slug}/`}
                className={`block px-2 py-1 rounded text-xs text-ink-700 ${a.hover} transition-colors`}
              >
                {it.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
}

export default function Sidebar({ headings }) {
  return (
    <aside className="space-y-6">
      {/* 0. 記事ページのみ: 追従目次。ハイライトはクライアント側で更新。 */}
      {headings && headings.length > 0 && (
        <TableOfContents headings={headings} variant="sticky" />
      )}

      {/* 1. サイト内検索 */}
      <div className="rounded-2xl bg-white border border-amber-200 p-5">
        <Link href="/search/" className="inline-flex items-center gap-2 text-sm font-bold text-ink-900 hover:text-amber-700">
          <SearchIcon className="w-4 h-4 text-[#C9A96E]" />
          サイト内検索
        </Link>
        <p className="mt-1 text-xs text-ink-500">
          パワーストーン名・運勢・地名などで横断検索できます。
        </p>
      </div>

      {/* 2. カテゴリで探す — メイン4カテゴリ＋ピラー記事のショートカット */}
      <div className="rounded-2xl bg-white border border-amber-200 p-5">
        <CardHeading>カテゴリで探す</CardHeading>
        <ul className="space-y-2">
          {mainCategories.map((c) => (
            <li
              key={c.slug}
              className={`rounded-xl border border-amber-100 ${c.pastel.bg} px-3 py-2`}
            >
              <Link
                href={`/category/${c.slug}/`}
                className={`flex items-center gap-2 font-bold text-sm ${c.pastel.accent} ${c.pastel.accentHover}`}
              >
                <CategoryIcon slug={c.slug} className="w-4 h-4 shrink-0" />
                <span>{c.title}</span>
              </Link>
              {c.pillarSlug && (
                <Link
                  href={`/blog/${c.pillarSlug}/`}
                  className="mt-1 block pl-6 text-[11px] text-ink-700 hover:text-amber-700"
                >
                  └ {c.pillarTitle} →
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* 3. ハブから探す — 各シリーズを折りたたみで一覧化 */}
      <div className="rounded-2xl bg-white border border-amber-200 p-5">
        <CardHeading>ハブから探す</CardHeading>
        <p className="mt-[-0.5rem] mb-3 text-[11px] text-ink-500 leading-relaxed">
          星座・誕生石・干支・運気・神社など、テーマ別にまとめたハブから記事を辿れます。
        </p>
        <div className="space-y-2">
          {series.map((s) => (
            <SeriesSection key={s.id} s={s} />
          ))}
        </div>
        <p className="mt-3 text-[11px] text-ink-500 leading-relaxed">
          <Link href="/tags/" className="underline hover:text-amber-700">タグ一覧から探す →</Link>
        </p>
      </div>

      {/* 4. 編集部おすすめ — 既存の PopularPosts(キュレーション) */}
      <PopularPosts limit={5} />
    </aside>
  );
}
