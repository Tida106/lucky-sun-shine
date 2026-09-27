'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { categories } from '@/lib/categories';
import CategoryIcon from './CategoryIcon';
import Logo from './Logo';
import SunMascot from './SunMascot';
import { YoutubeIcon, InstagramIcon } from './icons/NavIcons';
import { site } from '@/lib/site';

const INSTAGRAM_URL = 'https://www.instagram.com/lucky.sun.shine/';

// カテゴリ名の英語変換用辞書
const categoryEnMap = {
  'パワーストーン': 'Power Stones',
  'パワースポット': 'Power Spots',
  '開運グッズ': 'Lucky Items',
  '運気アップ習慣': 'Good Luck Habits',
};

export default function Footer() {
  const pathname = usePathname() || '';
  const isEn = pathname.startsWith('/en');
  const year = new Date().getFullYear();

  // UIテキストの英語・日本語 切り替え辞書
  const t = {
    messageLabel: isEn ? 'Message from Sun-chan' : '太陽ちゃんからのメッセージ',
    messageTitle: isEn ? 'Thank you for visiting!' : '来てくれてありがとう！',
    messageBody: isEn
      ? "Whether you're having a rough day or just an ordinary one, the sun is always watching over you. Lucky Sun Shine is here to give you a gentle, warm push forward."
      : "うまくいかない日も、なんでもない日も、お日さまはちゃんとあなたを見てるよ。Lucky Sun Shine は、そんなあなたの背中をそっと押すための場所です。",
    tagline: isEn ? "Power stones, power spots, and good luck habits to brighten your daily life." : site.tagline,
    youtube: isEn ? 'Recommended YouTube' : 'おすすめYouTubeチャンネル',
    categories: isEn ? 'Categories' : 'カテゴリ',
    siteInfo: isEn ? 'Site Info' : 'サイト情報',
    about: isEn ? 'About Us' : 'このサイトについて',
    vision: isEn ? 'Our Vision' : 'Lucky Sun Shineの想い',
    mascot: isEn ? 'About Sun-chan' : '太陽ちゃんプロフィール',
    editorial: isEn ? 'Editorial Policy' : '記事作成方針',
    privacy: isEn ? 'Privacy Policy' : 'プライバシーポリシー',
    disclaimer: isEn ? 'Disclaimer' : '免責事項',
    contact: isEn ? 'Contact Us' : 'お問い合わせ',
    tags: isEn ? 'All Tags' : 'タグ一覧',
    search: isEn ? 'Search' : 'サイト内検索',
  };

  // リンク先URLを英語環境に合わせて切り替えるヘルパー
  const getUrl = (path) => (isEn && !path.startsWith('/en') ? `/en${path}` : path);

  return (
    <footer className="border-t border-amber-200 bg-gradient-to-b from-amber-50 to-amber-100 mt-16">
      {/* 太陽ちゃんからのメッセージ — フッター上部の親しみゾーン */}
      <div className="max-w-5xl mx-auto px-4 pt-10">
        <div className="relative rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 via-white to-rose-50 px-5 py-6 md:px-8 md:py-7 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
          <div className="flex items-start gap-4 md:gap-6">
            <SunMascot
              size={84}
              className="shrink-0 md:!w-28 md:!h-28"
              alt={isEn ? "Sun-chan" : "太陽ちゃん（合掌）"}
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

          <Link
            href={getUrl('/recommend-youtube/')}
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
            aria-label={isEn ? "Open Lucky Sun Shine Instagram" : "Lucky Sun Shine の Instagram を開く"}
            className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-300 bg-white text-amber-700 hover:bg-amber-50 hover:text-amber-900 text-sm font-bold shadow-sm transition-colors"
          >
            <InstagramIcon className="w-4 h-4 text-amber-600" />
            Instagram
            <span aria-hidden="true">→</span>
          </a>
        </div>
        <div>
          <h3 className="font-bold text-ink-900 mb-2">{t.categories}</h3>
          <ul className="space-y-1 text-sm">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={getUrl(`/category/${c.slug}/`)} className="link-underline inline-flex items-center gap-1.5 hover:text-amber-700">
                  <CategoryIcon slug={c.slug} className="w-3.5 h-3.5 text-amber-600" />
                  {isEn ? (categoryEnMap[c.title] || c.title) : c.title}
                </Link>
              </li>
            ))}
            <li>
              <Link href={getUrl('/recommend-youtube/')} className="inline-flex items-center gap-1.5 hover:text-amber-700">
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
          <h3 className="font-bold text-ink-900 mb-2">{t.siteInfo}</h3>
          <ul className="space-y-1 text-sm">
            <li><Link href={getUrl('/about/')} className="hover:text-amber-700">{t.about}</Link></li>
            <li><Link href={getUrl('/about-our-vision/')} className="hover:text-amber-700">{t.vision}</Link></li>
            <li><Link href={getUrl('/about-mascot/')} className="hover:text-amber-700">{t.mascot}</Link></li>
            <li><Link href={getUrl('/editorial-policy/')} className="hover:text-amber-700">{t.editorial}</Link></li>
            <li><Link href={getUrl('/privacy/')} className="hover:text-amber-700">{t.privacy}</Link></li>
            <li><Link href={getUrl('/disclaimer/')} className="hover:text-amber-700">{t.disclaimer}</Link></li>
            <li><Link href={getUrl('/contact/')} className="hover:text-amber-700">{t.contact}</Link></li>
            <li><Link href={getUrl('/recommend-youtube/')} className="hover:text-amber-700">{t.youtube}</Link></li>
            <li><Link href={getUrl('/tags/')} className="hover:text-amber-700">{t.tags}</Link></li>
            <li><Link href={getUrl('/search/')} className="hover:text-amber-700">{t.search}</Link></li>
            <li><a href="/rss.xml" className="hover:text-amber-700">RSS</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-amber-200 py-4 text-center text-xs text-ink-500">
        © {year} {site.name}. All rights reserved.
      </div>
    </footer>
  );
}