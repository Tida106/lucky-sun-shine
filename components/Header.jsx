'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { mainCategories as categories, getCategoryTitle } from '@/lib/categories';
import CategoryIcon from './CategoryIcon';
import Logo from './Logo';
import SunMascot from './SunMascot';
import { SearchIcon, YoutubeIcon, InstagramIcon } from './icons/NavIcons';

const INSTAGRAM_URL = 'https://www.instagram.com/lucky.sun.shine/';

// 現在のパスからロケールを判定する。
function localeFromPathname(pathname) {
  if (pathname.startsWith('/zh-tw')) return 'zh-tw';
  if (pathname.startsWith('/en')) return 'en';
  return 'ja';
}

// 言語切り替えボタンの行き先。各言語版は "/", "/{locale}/blog/[slug]/"
// (翻訳がある記事のみ)、"/{locale}/omikuji/" のように存在するページが
// 限られるため、それ以外のパス(タグ・カテゴリ・検索・固定ページ等)では
// 必ず実在するその言語のトップページにフォールバックする。これを怠ると、
// 全タグ/カテゴリページの切り替えボタンが存在しないページを指して
// 404になる。
function langHref(pathname, currentLocale, targetLocale, slugSets) {
  // 静的書き出しの404ページでは usePathname() が実URLではなく内部プレース
  // ホルダー "/_not-found" を返すため、そのまま使うと存在しないパスへの
  // リンクになってしまう。その場合は常にトップへのリンクとして扱う。
  if (pathname.startsWith('/_not-found')) {
    return targetLocale === 'ja' ? '/' : `/${targetLocale}/`;
  }
  if (currentLocale === targetLocale) return pathname;

  // まず現在のパスから「中立なパス情報」を取り出す。
  let blogSlug = null;
  let isOmikuji = false;
  let isKyusei = false;
  if (currentLocale === 'ja') {
    const m = pathname.match(/^\/blog\/([a-z0-9-]+)\/?$/i);
    if (m) blogSlug = m[1];
    isOmikuji = /^\/omikuji\/?$/.test(pathname);
    isKyusei = /^\/kyusei\/?$/.test(pathname);
  } else {
    const m = pathname.match(new RegExp(`^/${currentLocale}/blog/([a-z0-9-]+)/?$`, 'i'));
    if (m) blogSlug = m[1];
    isOmikuji = new RegExp(`^/${currentLocale}/omikuji/?$`).test(pathname);
    isKyusei = new RegExp(`^/${currentLocale}/kyusei/?$`).test(pathname);
  }

  const prefix = targetLocale === 'ja' ? '' : `/${targetLocale}`;

  if (blogSlug) {
    const targetSlugSet = targetLocale === 'ja' ? null : slugSets[targetLocale];
    // ja は常に存在する(他言語版は必ず元のja記事を持つ)。他言語への切替は
    // その言語版が実在する場合のみ。
    if (targetLocale === 'ja' || targetSlugSet?.has(blogSlug)) {
      return `${prefix}/blog/${blogSlug}/`;
    }
    return `${prefix}/`;
  }
  if (isOmikuji) {
    return `${prefix}/omikuji/`;
  }
  // /kyusei/ は ja・en のみ実在する(繁体中文は未対応のためトップにフォールバック)
  if (isKyusei && (targetLocale === 'ja' || targetLocale === 'en')) {
    return `${prefix}/kyusei/`;
  }
  return `${prefix}/`;
}

export default function Header({ enSlugs = [], zhTwSlugs = [] }) {
  const pathname = usePathname() || '';
  const locale = localeFromPathname(pathname);
  const isEn = locale === 'en';
  const isZhTw = locale === 'zh-tw';
  const slugSets = { en: new Set(enSlugs), 'zh-tw': new Set(zhTwSlugs) };

  // 各言語のテキストとURLの切り替え辞書
  // /en/search/, /en/recommend-youtube/, /en/about-mascot/, /en/category/
  // 等はまだ存在しないため、英語ロケールでも日本語版へのリンクのままに
  // する(新たな404を防ぐ)。/en/omikuji/ は実在するのでそのまま。
  // 繁体中文版は /zh-tw/about-mascot/ と /zh-tw/omikuji/ のみ独自に実在
  // するため、そのページだけ専用リンクに切り替える。
  const t = {
    home: isZhTw ? '/zh-tw/' : isEn ? '/en/' : '/',
    search: '/search/',
    youtubeLink: '/recommend-youtube/',
    youtubeText: isZhTw ? '推薦 YouTube 頻道' : isEn ? 'Recommended YouTube' : 'おすすめYouTubeチャンネル',
    mascotLink: isZhTw ? '/zh-tw/about-mascot/' : '/about-mascot/',
    mascotText: isZhTw ? '☀️太陽醬是誰？' : isEn ? 'Who is Sun-chan?' : '☀️太陽ちゃんって？',
    mascotTitle: isZhTw
      ? 'Lucky Sun Shine 官方吉祥物「太陽醬」介紹'
      : isEn
        ? 'About our mascot Sun-chan'
        : 'Lucky Sun Shine の公式マスコット 太陽ちゃんを紹介',
    omikujiLink: isZhTw ? '/zh-tw/omikuji/' : isEn ? '/en/omikuji/' : '/omikuji/',
    omikujiText: isZhTw ? '抽籤' : isEn ? 'Fortune' : 'おみくじ',
    omikujiTitle: isZhTw ? '抽太陽醬的運勢籤' : isEn ? 'Draw a fortune slip' : '太陽ちゃんのおみくじを引く',
    // /kyusei/ は ja・en のみ実在する(繁体中文は未対応)
    kyuseiLink: isEn ? '/en/kyusei/' : '/kyusei/',
    kyuseiText: isEn ? 'Nine Star Ki' : '九星気学',
    kyuseiTitle: isEn ? 'Find your main star from your birth date' : '生年月日から本命星をチェック',
    searchTitle: isZhTw ? '站內搜尋' : isEn ? 'Search' : 'サイト内検索',
    logoAria: isZhTw ? '回到 Lucky Sun Shine 首頁' : isEn ? 'To Lucky Sun Shine Top' : 'Lucky Sun Shine トップへ',
  };

  const getCategoryUrl = (slug) => `/category/${slug}/`;

  const LANG_OPTIONS = [
    { locale: 'ja', label: 'JP' },
    { locale: 'en', label: 'EN' },
    { locale: 'zh-tw', label: '繁中' },
  ];

  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-white/80 border-b border-amber-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link prefetch={false} href={t.home} className="group inline-flex items-center shrink-0" aria-label={t.logoAria}>
          <Logo
            size={28}
            wordmarkClassName="text-base md:text-lg group-hover:text-amber-700 transition-colors"
            className="transition-transform group-hover:[&_svg]:rotate-12 [&_svg]:transition-transform [&_svg]:duration-500"
          />
        </Link>
        {/* 折り返し行数は後読みのWebフォント(fonts.css)の適用前後で変わるため、
            最終的な高さを予約してヘッダー下の本文がずれない(CLS)ようにする。
            値は各言語のフォント読み込み後の実測値(ja/en=3行, zh-tw=2行)。 */}
        <nav className={`hidden md:flex items-center gap-x-5 gap-y-1 text-sm font-medium text-ink-700 flex-wrap justify-end ${isZhTw ? 'lg:min-h-[58px] xl:min-h-[68px]' : 'lg:min-h-[92px]'}`}>
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={getCategoryUrl(c.slug)}
              prefetch={false}
              className="link-underline inline-flex items-center gap-1.5 hover:text-amber-700 transition-colors whitespace-nowrap"
            >
              <CategoryIcon slug={c.slug} className="w-4 h-4 text-amber-600" />
              {getCategoryTitle(c, locale)}
            </Link>
          ))}
          <Link prefetch={false}
            href={t.youtubeLink}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 hover:bg-red-100 transition-colors whitespace-nowrap"
          >
            <YoutubeIcon className="w-4 h-4" />
            {t.youtubeText}
          </Link>
          <Link prefetch={false}
            href={t.mascotLink}
            className="ml-2 lg:ml-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-amber-300 text-amber-800 hover:bg-rose-100 hover:text-amber-900 hover:shadow-[0_0_14px_rgba(245,158,11,0.45)] transition-all whitespace-nowrap"
            title={t.mascotTitle}
          >
            <SunMascot size={24} className="shrink-0" alt="" />
            <span>{isEn && '☀️ '}{t.mascotText}</span>
          </Link>
          <Link prefetch={false}
            href={t.omikujiLink}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-800 hover:bg-amber-200 hover:text-amber-900 hover:shadow-[0_0_14px_rgba(245,158,11,0.45)] transition-all whitespace-nowrap font-bold"
            title={t.omikujiTitle}
          >
            <span aria-hidden="true">🎋</span>
            <span>{t.omikujiText}</span>
          </Link>
          {!isZhTw && (
            <Link prefetch={false}
              href={t.kyuseiLink}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-100 border border-violet-300 text-violet-800 hover:bg-violet-200 hover:text-violet-900 transition-all whitespace-nowrap font-bold"
              title={t.kyuseiTitle}
            >
              <span aria-hidden="true">🔮</span>
              <span>{t.kyuseiText}</span>
            </Link>
          )}
        </nav>
        <div className="flex items-center gap-2 shrink-0">
          <div className="inline-flex items-center rounded-full bg-sky-100 border border-sky-300 overflow-hidden mr-1 text-xs font-bold">
            {LANG_OPTIONS.map((opt) => (
              <Link prefetch={false}
                key={opt.locale}
                href={langHref(pathname, locale, opt.locale, slugSets)}
                className={`inline-flex items-center justify-center h-9 px-2.5 whitespace-nowrap transition-colors ${
                  locale === opt.locale
                    ? 'bg-sky-300 text-sky-900'
                    : 'text-sky-700 hover:bg-sky-200'
                }`}
                aria-current={locale === opt.locale ? 'true' : undefined}
                title={`Switch to ${opt.label}`}
              >
                {opt.label}
              </Link>
            ))}
          </div>
          <Link prefetch={false}
            href={t.search}
            aria-label={t.searchTitle}
            className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-amber-200 hover:bg-amber-50 transition-colors text-[#C9A96E] hover:text-[#9C7A47]"
            title={t.searchTitle}
          >
            <SearchIcon className="w-[18px] h-[18px]" />
          </Link>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Lucky Sun Shine の Instagram を開く"
            title="Instagram"
            className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-amber-200 hover:bg-amber-50 transition-colors text-[#C9A96E] hover:text-[#9C7A47]"
          >
            <InstagramIcon className="w-[18px] h-[18px]" />
          </a>
        </div>
      </div>
      <nav className="md:hidden border-t border-amber-100 bg-white/90">
        <div className="max-w-6xl mx-auto px-2 py-2 flex overflow-x-auto gap-1 text-xs">
          {categories.map((c) => (
            <Link prefetch={false}
              key={c.slug}
              href={getCategoryUrl(c.slug)}
              className="inline-flex items-center gap-1 whitespace-nowrap px-3 py-1.5 rounded-full bg-amber-50 text-amber-900 hover:bg-amber-100"
            >
              <CategoryIcon slug={c.slug} className="w-3.5 h-3.5 text-amber-600" />
              {getCategoryTitle(c, locale)}
            </Link>
          ))}
          <Link prefetch={false}
            href={t.youtubeLink}
            className="inline-flex items-center gap-1.5 whitespace-nowrap px-3 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-700 hover:bg-red-100"
          >
            <YoutubeIcon className="w-3.5 h-3.5" />
            {t.youtubeText}
          </Link>
          <Link prefetch={false}
            href={t.mascotLink}
            className="ml-2 inline-flex items-center gap-1.5 whitespace-nowrap px-3 py-1.5 rounded-full bg-rose-50 border border-amber-300 text-amber-800 hover:bg-rose-100 hover:shadow-[0_0_10px_rgba(245,158,11,0.4)] transition-all"
            title={t.mascotTitle}
          >
            <SunMascot size={18} className="shrink-0" alt="" />
            <span>{isEn && '☀️ '}{t.mascotText}</span>
          </Link>
          <Link prefetch={false}
            href={t.omikujiLink}
            className="inline-flex items-center gap-1.5 whitespace-nowrap px-3 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-800 hover:bg-amber-200 hover:shadow-[0_0_10px_rgba(245,158,11,0.4)] transition-all font-bold"
            title={t.omikujiTitle}
          >
            <span aria-hidden="true">🎋</span>
            <span>{t.omikujiText}</span>
          </Link>
          {!isZhTw && (
            <Link prefetch={false}
              href={t.kyuseiLink}
              className="inline-flex items-center gap-1.5 whitespace-nowrap px-3 py-1.5 rounded-full bg-violet-100 border border-violet-300 text-violet-800 hover:bg-violet-200 font-bold"
              title={t.kyuseiTitle}
            >
              <span aria-hidden="true">🔮</span>
              <span>{t.kyuseiText}</span>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}