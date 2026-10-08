'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { mainCategories as categories, getCategoryTitle } from '@/lib/categories';
import CategoryIcon from './CategoryIcon';
import Logo from './Logo';
import SunMascot from './SunMascot';
import { YoutubeIcon, InstagramIcon } from './icons/NavIcons';
import { site } from '@/lib/site';

const INSTAGRAM_URL = 'https://www.instagram.com/lucky.sun.shine/';

export default function Footer({ localizedCategories = { en: [], 'zh-tw': [] } }) {
  const pathname = usePathname() || '';
  const isZhTw = pathname.startsWith('/zh-tw');
  const isEn = !isZhTw && pathname.startsWith('/en');
  const locale = isZhTw ? 'zh-tw' : isEn ? 'en' : 'ja';
  // カテゴリ一覧は言語別ページがある。英語・繁體中文は、その言語の翻訳記事が1件以上ある
  // (=ページが実在する)カテゴリだけ表示し、言語別URLにリンクする(ヘッダーと同じ一覧)。
  const categoryPrefix = isZhTw ? '/zh-tw' : isEn ? '/en' : '';
  const visibleCategories =
    locale === 'ja' ? categories : categories.filter((c) => (localizedCategories[locale] || []).includes(c.slug));
  const year = new Date().getFullYear();

  // /en/about/, /en/tags/, /zh-tw/about/, /zh-tw/tags/ 等はまだ存在
  // しないため、英語・繁体中文ロケールでもリンク先は日本語版のまま
  // (表示テキストだけ翻訳する)。/en/credits/, /en/privacy/,
  // /en/disclosure/ は英語版ページが実在するため、英語ロケールでは
  // そちらにリンクする。/zh-tw/about-mascot/ は繁体中文版ページが
  // 実在するため、繁体中文ロケールではそちらにリンクする。
  const t = {
    messageLabel: isZhTw ? '太陽醬的話' : isEn ? 'A Message from Sun-chan' : '太陽ちゃんからのメッセージ',
    messageTitle: isZhTw ? '謝謝你來訪！' : isEn ? 'Thanks for stopping by!' : '来てくれてありがとう！',
    messageBody: isZhTw
      ? '不管是順利的日子，還是平凡無奇的一天，太陽都一直守護著你。Lucky Sun Shine 想成為輕輕推你一把、陪你往前走的地方。'
      : isEn
        ? 'On good days and ordinary days alike, the sun is always watching over you. Lucky Sun Shine is here to gently nudge you forward.'
        : 'うまくいかない日も、なんでもない日も、お日さまはちゃんとあなたを見てるよ。Lucky Sun Shine は、そんなあなたの背中をそっと押すための場所です。',
    tagline: isZhTw ? '水晶、能量景點與開運的綜合指南。' : isEn ? 'Your guide to crystals, power spots, and good luck.' : site.tagline,
    youtube: isZhTw ? '推薦 YouTube 頻道' : isEn ? 'Recommended YouTube' : 'おすすめYouTubeチャンネル',
    categoriesHeading: isZhTw ? '分類' : isEn ? 'Categories' : 'カテゴリ',
    siteInfoHeading: isZhTw ? '網站資訊' : isEn ? 'Site Info' : 'サイト情報',
    about: isZhTw ? '關於本站' : isEn ? 'About This Site' : 'このサイトについて',
    vision: isZhTw ? 'Lucky Sun Shine 的理念' : isEn ? 'Our Vision' : 'Lucky Sun Shineの想い',
    mascot: isZhTw ? '太陽醬小檔案' : isEn ? 'About Sun-chan' : '太陽ちゃんプロフィール',
    editorialPolicy: isZhTw ? '編輯方針' : isEn ? 'Editorial Policy' : '記事作成方針',
    privacy: isZhTw ? '隱私權政策' : isEn ? 'Privacy Policy' : 'プライバシーポリシー',
    disclaimer: isZhTw ? '免責聲明' : isEn ? 'Disclaimer' : '免責事項',
    disclosure: isEn ? 'Affiliate Disclosure' : 'アフィリエイトプログラムに関する表示',
    contact: isZhTw ? '聯絡我們' : isEn ? 'Contact' : 'お問い合わせ',
    credits: isZhTw ? '圖片版權說明' : isEn ? 'Image Credits' : '画像クレジット',
    tags: isZhTw ? '全部標籤' : isEn ? 'All Tags' : 'タグ一覧',
    search: isZhTw ? '站內搜尋' : isEn ? 'Search' : 'サイト内検索',
    rights: 'All rights reserved.',
  };

  return (
    <footer className="border-t border-amber-200 bg-gradient-to-b from-amber-50 to-amber-100 mt-16">
      {/* 太陽ちゃんからのメッセージ — フッター上部の親しみゾーン */}
      <div className="max-w-5xl mx-auto px-4 pt-10">
        <div className="relative rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 via-white to-rose-50 px-5 py-6 md:px-8 md:py-7 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
          <div className="flex items-start gap-4 md:gap-6">
            <SunMascot
              size={84}
              className="shrink-0 md:!w-28 md:!h-28"
              alt={isZhTw ? '太陽醬（雙手合十）' : isEn ? 'Sun-chan (hands together)' : '太陽ちゃん（合掌）'}
              src="/images/mascot-sun-thanks.png"
            />
            <div className="min-w-0">
              <p className="inline-flex items-center gap-2 text-amber-700 text-[11px] font-bold tracking-widest">
                <span>{t.messageLabel}</span>
              </p>
              <p className="mt-2 font-display font-bold text-lg md:text-xl text-ink-900 leading-snug">
                {t.messageTitle}
              </p>
              <p className="mt-2 text-sm text-ink-700 leading-relaxed">
                {t.messageBody}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-10 grid gap-8 md:grid-cols-3">
        <div>
          <Logo size={32} wordmarkClassName="text-base" />
          <p className="mt-3 text-sm text-ink-700 leading-relaxed">{t.tagline}</p>

          <Link prefetch={false}
            href="/recommend-youtube/"
            className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white text-sm font-bold shadow-sm transition-colors"
          >
            <YoutubeIcon className="w-4 h-4" />
            {t.youtube}
            <span aria-hidden="true">→</span>
          </Link>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Lucky Sun Shine の Instagram を開く"
            className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-300 bg-white text-amber-700 hover:bg-amber-50 hover:text-amber-900 text-sm font-bold shadow-sm transition-colors"
          >
            <InstagramIcon className="w-4 h-4 text-amber-600" />
            Instagram
            <span aria-hidden="true">→</span>
          </a>
        </div>
        <div>
          <h3 className="font-bold text-ink-900 mb-2">{t.categoriesHeading}</h3>
          <ul className="space-y-1 text-sm">
            {visibleCategories.map((c) => (
              <li key={c.slug}>
                <Link prefetch={false} href={`${categoryPrefix}/category/${c.slug}/`} className="link-underline inline-flex items-center gap-1.5 hover:text-amber-700">
                  <CategoryIcon slug={c.slug} className="w-3.5 h-3.5 text-amber-600" />
                  {getCategoryTitle(c, locale)}
                </Link>
              </li>
            ))}
            <li>
              <Link prefetch={false} href="/recommend-youtube/" className="inline-flex items-center gap-1.5 hover:text-amber-700">
                <YoutubeIcon className="w-3.5 h-3.5 text-red-600" />
                {t.youtube}
              </Link>
            </li>
            <li>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-amber-700"
              >
                <InstagramIcon className="w-3.5 h-3.5 text-amber-600" />
                Instagram
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-ink-900 mb-2">{t.siteInfoHeading}</h3>
          <ul className="space-y-1 text-sm">
            <li><Link prefetch={false} href="/about/" className="hover:text-amber-700">{t.about}</Link></li>
            <li><Link prefetch={false} href="/about-our-vision/" className="hover:text-amber-700">{t.vision}</Link></li>
            <li><Link prefetch={false} href={isZhTw ? '/zh-tw/about-mascot/' : '/about-mascot/'} className="hover:text-amber-700">{t.mascot}</Link></li>
            <li><Link prefetch={false} href="/editorial-policy/" className="hover:text-amber-700">{t.editorialPolicy}</Link></li>
            <li><Link prefetch={false} href={isEn ? '/en/privacy/' : '/privacy/'} className="hover:text-amber-700">{t.privacy}</Link></li>
            <li><Link prefetch={false} href="/disclaimer/" className="hover:text-amber-700">{t.disclaimer}</Link></li>
            {!isZhTw && (
              <li><Link prefetch={false} href={isEn ? '/en/disclosure/' : '/disclosure/'} className="hover:text-amber-700">{t.disclosure}</Link></li>
            )}
            <li><Link prefetch={false} href="/contact/" className="hover:text-amber-700">{t.contact}</Link></li>
            <li><Link prefetch={false} href={isEn ? '/en/credits/' : '/credits/'} className="hover:text-amber-700">{t.credits}</Link></li>
            <li><Link prefetch={false} href="/recommend-youtube/" className="hover:text-amber-700">{t.youtube}</Link></li>
            <li><Link prefetch={false} href="/tags/" className="hover:text-amber-700">{t.tags}</Link></li>
            <li><Link prefetch={false} href="/search/" className="hover:text-amber-700">{t.search}</Link></li>
            <li><a href="/rss.xml" className="hover:text-amber-700">RSS</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-amber-200 py-4 text-center text-xs text-ink-500">
        © {year} {site.name}. {t.rights}
      </div>
    </footer>
  );
}
