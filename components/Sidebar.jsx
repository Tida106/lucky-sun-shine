import Link from 'next/link';
import PopularPosts from './PopularPosts';
import TableOfContents from './TableOfContents';
import { SearchIcon } from './icons/NavIcons';
import { mainCategories } from '@/lib/categories';
import { series, accentClasses } from '@/lib/series';
import CategoryIcon from './CategoryIcon';
import SunOrnament from './icons/SunOrnament';

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

function SeriesSection({ s, locale = 'ja' }) {
  const isEn = locale === 'en';
  const a = accentClasses(s.accent);
  const isOpen = DEFAULT_OPEN_SERIES.has(s.id);
  
  // 英語の場合はリンク先も /en/blog/... に切り替える
  const blogPrefix = isEn ? '/en/blog/' : '/blog/';

  return (
    <details className={`group rounded-xl border border-amber-100 bg-white/80 ${a.bar} border-l-4`} open={isOpen}>
      <summary className="flex items-center justify-between cursor-pointer list-none px-3 py-2 hover:bg-amber-50/80 rounded-xl transition-colors">
        <span className="text-sm font-bold text-ink-900">
          {/* ※シリーズ名(星座など)は後日lib/series.jsで英語辞書化するまでは日本語表示になります */}
          {s.label}
        </span>
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
            href={`${blogPrefix}${s.hubSlug}/`}
            className={`block mb-2 px-3 py-1.5 rounded-lg text-xs font-bold ${a.chip} hover:opacity-90 transition-opacity`}
          >
            ☀️ {isEn ? 'View Full Guide' : (s.hubLabel || '総合ガイドを見る')} →
          </Link>
        )}
        <ul className="space-y-0.5">
          {s.items.map((it) => (
            <li key={it.slug}>
              <Link
                href={`${blogPrefix}${it.slug}/`}
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

// カテゴリ名の英語変換用辞書（ご提示いただいた4カテゴリを紐付け）
const categoryEnMap = {
  'パワーストーン': 'Power Stones',
  'パワースポット': 'Power Spots',
  '開運グッズ': 'Lucky Items',
  '運気アップ習慣': 'Good Luck Habits',
};

export default function Sidebar({ headings, locale = 'ja' }) {
  const isEn = locale === 'en';

  // UIテキストの英語/日本語 切り替え辞書
  const t = {
    search: isEn ? "Search" : "サイト内検索",
    searchDesc: isEn
      ? "Search by power stone names, fortunes, locations, etc."
      : "パワーストーン名・運勢・地名などで横断検索できます。",
    categories: isEn ? "Categories" : "カテゴリで探す",
    hubs: isEn ? "Explore by Theme" : "ハブから探す",
    hubsDesc: isEn
      ? "Explore articles by themes like zodiac signs, birthstones, feng shui, shrines, etc."
      : "星座・誕生石・干支・運気・神社など、テーマ別にまとめたハブから記事を辿れます。",
    tags: isEn ? "View all tags →" : "タグ一覧から探す →",
  };

  // リンク先URLのプレフィックス切り替え（英語サイト内でクリックしても日本語ページに戻されないための最重要設定）
  const searchUrl = isEn ? '/en/search/' : '/search/';
  const tagUrl = isEn ? '/en/tags/' : '/tags/';
  const catPrefix = isEn ? '/en/category/' : '/category/';
  const blogPrefix = isEn ? '/en/blog/' : '/blog/';

  return (
    <aside className="space-y-6">
      {/* 0. 追従目次 (小コンポーネントにもlocaleを渡す) */}
      {headings && headings.length > 0 && (
        <TableOfContents headings={headings} variant="sticky" locale={locale} />
      )}

      {/* 1. サイト内検索 */}
      <div className="rounded-2xl bg-white border border-amber-200 p-5">
        <Link href={searchUrl} className="inline-flex items-center gap-2 text-sm font-bold text-ink-900 hover:text-amber-700">
          <SearchIcon className="w-4 h-4 text-[#C9A96E]" />
          {t.search}
        </Link>
        <p className="mt-1 text-xs text-ink-500">
          {t.searchDesc}
        </p>
      </div>

      {/* 2. カテゴリで探す */}
      <div className="rounded-2xl bg-white border border-amber-200 p-5">
        <CardHeading>{t.categories}</CardHeading>
        <ul className="space-y-2">
          {mainCategories.map((c) => {
            const title = isEn ? (categoryEnMap[c.title] || c.title) : c.title;
            return (
              <li
                key={c.slug}
                className={`rounded-xl border border-amber-100 ${c.pastel.bg} px-3 py-2`}
              >
                <Link
                  href={`${catPrefix}${c.slug}/`}
                  className={`flex items-center gap-2 font-bold text-sm ${c.pastel.accent} ${c.pastel.accentHover}`}
                >
                  <CategoryIcon slug={c.slug} className="w-4 h-4 shrink-0" />
                  <span>{title}</span>
                </Link>
                {c.pillarSlug && (
                  <Link
                    href={`${blogPrefix}${c.pillarSlug}/`}
                    className="mt-1 block pl-6 text-[11px] text-ink-700 hover:text-amber-700"
                  >
                    └ {isEn ? 'View Pillar Article' : c.pillarTitle} →
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* 3. ハブから探す */}
      <div className="rounded-2xl bg-white border border-amber-200 p-5">
        <CardHeading>{t.hubs}</CardHeading>
        <p className="mt-[-0.5rem] mb-3 text-[11px] text-ink-500 leading-relaxed">
          {t.hubsDesc}
        </p>
        <div className="space-y-2">
          {series.map((s) => (
            <SeriesSection key={s.id} s={s} locale={locale} />
          ))}
        </div>
        <p className="mt-3 text-[11px] text-ink-500 leading-relaxed">
          <Link href={tagUrl} className="underline hover:text-amber-700">{t.tags}</Link>
        </p>
      </div>

      {/* 4. 編集部おすすめ (小コンポーネントにもlocaleを渡す) */}
      <PopularPosts limit={5} locale={locale} />
    </aside>
  );
}