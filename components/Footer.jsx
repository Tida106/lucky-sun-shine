'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { mainCategories as categories } from '@/lib/categories';
import CategoryIcon from './CategoryIcon';
import Logo from './Logo';
import SunMascot from './SunMascot';
import { SearchIcon, YoutubeIcon, InstagramIcon } from './icons/NavIcons';

const INSTAGRAM_URL = 'https://www.instagram.com/lucky.sun.shine/';

// カテゴリ名の英語変換用辞書
const categoryEnMap = {
  'パワーストーン': 'Crystals',
  'パワースポット': 'Power Spots',
  '開運グッズ': 'Lucky Items',
  '運気アップ習慣': 'Good Luck Habits',
};

export default function Header() {
  const pathname = usePathname() || '/';
  const isEn = pathname.startsWith('/en');

  // 現在のURLから、言語切り替え用のURLを自動生成する
  // 例: /en/blog/xxx -> /blog/xxx,  /category/xxx -> /en/category/xxx
  const toggleLangUrl = isEn
    ? pathname.replace(/^\/en/, '') || '/'
    : `/en${pathname === '/' ? '' : pathname}`;

  // 英語・日本語のテキストとURLの切り替え辞書
  // /en/search/, /en/recommend-youtube/, /en/about-mascot/, /en/category/
  // はまだ存在しないため、英語ロケールでも日本語版へのリンクのままにする
  // (新たな404を防ぐ)。/en/omikuji/ は実在するのでそのまま。
  const t = {
    home: isEn ? '/en/' : '/',
    search: '/search/',
    youtubeLink: '/recommend-youtube/',
    youtubeText: isEn ? 'Recommended YouTube' : 'おすすめYouTubeチャンネル',
    mascotLink: '/about-mascot/',
    mascotText: isEn ? 'Who is Sun-chan?' : '☀️太陽ちゃんって？',
    mascotTitle: isEn ? 'About our mascot Sun-chan' : 'Lucky Sun Shine の公式マスコット 太陽ちゃんを紹介',
    omikujiLink: isEn ? '/en/omikuji/' : '/omikuji/',
    omikujiText: isEn ? 'Fortune' : 'おみくじ',
    omikujiTitle: isEn ? 'Draw a fortune slip' : '太陽ちゃんのおみくじを引く',
    searchTitle: isEn ? 'Search' : 'サイト内検索',
    logoAria: isEn ? 'To Lucky Sun Shine Top' : 'Lucky Sun Shine トップへ',
  };

  const getCategoryUrl = (slug) => `/category/${slug}/`;

  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-white/80 border-b border-amber-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link href={t.home} className="group inline-flex items-center" aria-label={t.logoAria}>
          <Logo
            size={28}
            wordmarkClassName="text-base md:text-lg group-hover:text-amber-700 transition-colors"
            className="transition-transform group-hover:[&_svg]:rotate-12 [&_svg]:transition-transform [&_svg]:duration-500"
          />
        </Link>
        
        <nav className="hidden md:flex items-center gap-x-5 gap-y-1 text-sm font-medium text-ink-700 flex-wrap justify-end">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={getCategoryUrl(c.slug)}
              className="link-underline inline-flex items-center gap-1.5 hover:text-amber-700 transition-colors whitespace-nowrap"
            >
              <CategoryIcon slug={c.slug} className="w-4 h-4 text-amber-600" />
              {isEn ? (categoryEnMap[c.title] || c.title) : c.title}
            </Link>
          ))}
          <Link
            href={t.youtubeLink}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 hover:bg-red-100 transition-colors whitespace-nowrap"
          >
            <YoutubeIcon className="w-4 h-4" />
            {t.youtubeText}
          </Link>
          <Link
            href={t.mascotLink}
            className="ml-2 lg:ml-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-amber-300 text-amber-800 hover:bg-rose-100 hover:text-amber-900 hover:shadow-[0_0_14px_rgba(245,158,11,0.45)] transition-all whitespace-nowrap"
            title={t.mascotTitle}
          >
            <SunMascot size={24} className="shrink-0" alt="" />
            <span>{isEn && '☀️ '}{t.mascotText}</span>
          </Link>
          <Link
            href={t.omikujiLink}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-800 hover:bg-amber-200 hover:text-amber-900 hover:shadow-[0_0_14px_rgba(245,158,11,0.45)] transition-all whitespace-nowrap font-bold"
            title={t.omikujiTitle}
          >
            <span aria-hidden="true">🎋</span>
            <span>{t.omikujiText}</span>
          </Link>
        </nav>

        <div className="flex items-center gap-1.5 md:gap-2">
          {/* 🌟 ここに言語切り替えボタンを追加 🌟 */}
          <Link
            href={toggleLangUrl}
            className="inline-flex items-center justify-center px-2.5 md:px-3 h-8 md:h-9 rounded-full border-2 border-amber-400 bg-amber-50 text-amber-800 hover:bg-amber-200 transition-colors text-[10px] md:text-xs font-extrabold tracking-wider shadow-sm"
            title={isEn ? "日本語ページへ" : "To English Page"}
          >
            {isEn ? 'JP' : 'EN'}
          </Link>

          <Link
            href={t.search}
            aria-label={t.searchTitle}
            className="inline-flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full border border-amber-200 hover:bg-amber-50 transition-colors text-[#C9A96E] hover:text-[#9C7A47]"
            title={t.searchTitle}
          >
            <SearchIcon className="w-[16px] h-[16px] md:w-[18px] md:h-[18px]" />
          </Link>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Lucky Sun Shine の Instagram を開く"
            title="Instagram"
            className="inline-flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full border border-amber-200 hover:bg-amber-50 transition-colors text-[#C9A96E] hover:text-[#9C7A47]"
          >
            <InstagramIcon className="w-[16px] h-[16px] md:w-[18px] md:h-[18px]" />
          </a>
        </div>
      </div>
      
      {/* スマホ用メニュー */}
      <nav className="md:hidden border-t border-amber-100 bg-white/90">
        <div className="max-w-6xl mx-auto px-2 py-2 flex overflow-x-auto gap-1 text-xs">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={getCategoryUrl(c.slug)}
              className="inline-flex items-center gap-1 whitespace-nowrap px-3 py-1.5 rounded-full bg-amber-50 text-amber-900 hover:bg-amber-100"
            >
              <CategoryIcon slug={c.slug} className="w-3.5 h-3.5 text-amber-600" />
              {isEn ? (categoryEnMap[c.title] || c.title) : c.title}
            </Link>
          ))}
          <Link
            href={t.youtubeLink}
            className="inline-flex items-center gap-1.5 whitespace-nowrap px-3 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-700 hover:bg-red-100"
          >
            <YoutubeIcon className="w-3.5 h-3.5" />
            {t.youtubeText}
          </Link>
          <Link
            href={t.mascotLink}
            className="ml-2 inline-flex items-center gap-1.5 whitespace-nowrap px-3 py-1.5 rounded-full bg-rose-50 border border-amber-300 text-amber-800 hover:bg-rose-100 hover:shadow-[0_0_10px_rgba(245,158,11,0.4)] transition-all"
            title={t.mascotTitle}
          >
            <SunMascot size={18} className="shrink-0" alt="" />
            <span>{isEn && '☀️ '}{t.mascotText}</span>
          </Link>
          <Link
            href={t.omikujiLink}
            className="inline-flex items-center gap-1.5 whitespace-nowrap px-3 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-800 hover:bg-amber-200 hover:shadow-[0_0_10px_rgba(245,158,11,0.4)] transition-all font-bold"
            title={t.omikujiTitle}
          >
            <span aria-hidden="true">🎋</span>
            <span>{t.omikujiText}</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}