import Link from 'next/link';
import PopularPosts from './PopularPosts';
import TableOfContents from './TableOfContents';
import { SearchIcon } from './icons/NavIcons';
import { mainCategories, getCategoryTitle } from '@/lib/categories';
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

function SeriesSection({ s, locale = 'ja', blogHref }) {
  const isEn = locale === 'en';
  const isZhTw = locale === 'zh-tw';
  const a = accentClasses(s.accent);
  const isOpen = DEFAULT_OPEN_SERIES.has(s.id);
  const hubLabel = isZhTw ? '查看完整指南' : isEn ? 'View Full Guide' : (s.hubLabel || '総合ガイドを見る');

  return (
    <details className={`group rounded-xl border border-amber-100 bg-white/80 ${a.bar} border-l-4`} open={isOpen}>
      <summary className="flex items-center justify-between cursor-pointer list-none px-3 py-2 hover:bg-amber-50/80 rounded-xl transition-colors">
        <span className="text-sm font-bold text-ink-900">
          {/* ※シリーズ名(星座など)は後日lib/series.jsで多言語化するまでは日本語表示になります */}
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
          <Link prefetch={false}
            href={blogHref(s.hubSlug)}
            className={`block mb-2 px-3 py-1.5 rounded-lg text-xs font-bold ${a.chip} hover:opacity-90 transition-opacity`}
          >
            ☀️ {hubLabel} →
          </Link>
        )}
        <ul className="space-y-0.5">
          {s.items.map((it) => (
            <li key={it.slug}>
              <Link prefetch={false}
                href={blogHref(it.slug)}
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

export default function Sidebar({ headings, locale = 'ja', enSlugs = [], zhTwSlugs = [] }) {
  const isEn = locale === 'en';
  const isZhTw = locale === 'zh-tw';

  // UIテキストの言語別切り替え辞書
  const t = isZhTw ? {
    search: "站內搜尋",
    searchDesc: "可依水晶名稱、運勢、地名等進行搜尋。",
    categories: "依分類瀏覽",
    hubs: "依主題瀏覽",
    hubsDesc: "星座、誕生石、生肖、風水、神社等主題分類，帶你找到更多相關文章。",
    tags: "查看所有標籤 →",
  } : {
    search: isEn ? "Search" : "サイト内検索",
    searchDesc: isEn
      ? "Search by crystal names, fortunes, locations, etc."
      : "パワーストーン名・運勢・地名などで横断検索できます。",
    categories: isEn ? "Categories" : "カテゴリで探す",
    hubs: isEn ? "Explore by Theme" : "ハブから探す",
    hubsDesc: isEn
      ? "Explore articles by themes like zodiac signs, birthstones, feng shui, shrines, etc."
      : "星座・誕生石・干支・運気・神社など、テーマ別にまとめたハブから記事を辿れます。",
    tags: isEn ? "View all tags →" : "タグ一覧から探す →",
  };

  // /en/search/ /en/tags/ /en/category/ (zh-twも同様)ページはまだ存在しないため、
  // どのロケールでもこれらは日本語版へのリンクのままにする(新たな404を防ぐ)。
  const searchUrl = '/search/';
  const tagUrl = '/tags/';
  const catPrefix = '/category/';

  // /blog/[slug]/ はその言語版記事が実在する時だけ /en/blog/[slug]/ 等に変換する。
  const enSlugSet = new Set(enSlugs);
  const zhTwSlugSet = new Set(zhTwSlugs);
  const blogHref = (slug) => {
    if (isZhTw && zhTwSlugSet.has(slug)) return `/zh-tw/blog/${slug}/`;
    if (isEn && enSlugSet.has(slug)) return `/en/blog/${slug}/`;
    return `/blog/${slug}/`;
  };

  return (
    <aside className="space-y-6">
      {/* 0. 追従目次 (小コンポーネントにもlocaleを渡す) */}
      {headings && headings.length > 0 && (
        <TableOfContents headings={headings} variant="sticky" locale={locale} />
      )}

      {/* 1. サイト内検索 */}
      <div className="rounded-2xl bg-white border border-amber-200 p-5">
        <Link prefetch={false} href={searchUrl} className="inline-flex items-center gap-2 text-sm font-bold text-ink-900 hover:text-amber-700">
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
            const title = getCategoryTitle(c, locale);
            return (
              <li
                key={c.slug}
                className={`rounded-xl border border-amber-100 ${c.pastel.bg} px-3 py-2`}
              >
                <Link prefetch={false}
                  href={`${catPrefix}${c.slug}/`}
                  className={`flex items-center gap-2 font-bold text-sm ${c.pastel.accent} ${c.pastel.accentHover}`}
                >
                  <CategoryIcon slug={c.slug} className="w-4 h-4 shrink-0" />
                  <span>{title}</span>
                </Link>
                {c.pillarSlug && (
                  <Link prefetch={false}
                    href={blogHref(c.pillarSlug)}
                    className="mt-1 block pl-6 text-[11px] text-ink-700 hover:text-amber-700"
                  >
                    └ {isZhTw ? '查看完整指南' : isEn ? 'View Pillar Article' : c.pillarTitle} →
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
            <SeriesSection key={s.id} s={s} locale={locale} blogHref={blogHref} />
          ))}
        </div>
        <p className="mt-3 text-[11px] text-ink-500 leading-relaxed">
          <Link prefetch={false} href={tagUrl} className="underline hover:text-amber-700">{t.tags}</Link>
        </p>
      </div>

      {/* 4. 編集部おすすめ (小コンポーネントにもlocaleを渡す) */}
      <PopularPosts limit={5} locale={locale} />
    </aside>
  );
}