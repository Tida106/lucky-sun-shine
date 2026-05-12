import Link from 'next/link';
import { categories } from '@/lib/categories';
import CategoryIcon from './CategoryIcon';
import Logo from './Logo';
import { YoutubeIcon, InstagramIcon } from './icons/NavIcons';
import { site } from '@/lib/site';

const INSTAGRAM_URL = 'https://www.instagram.com/lucky.sun.shine/';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-amber-200 bg-gradient-to-b from-amber-50 to-amber-100 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10 grid gap-8 md:grid-cols-3">
        <div>
          <Logo size={32} wordmarkClassName="text-base" />
          <p className="mt-3 text-sm text-ink-700 leading-relaxed">{site.tagline}</p>

          <Link
            href="/recommend-youtube/"
            className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white text-sm font-bold shadow-sm transition-colors"
          >
            <YoutubeIcon className="w-4 h-4" />
            おすすめYouTubeチャンネル
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
          <h3 className="font-bold text-ink-900 mb-2">カテゴリ</h3>
          <ul className="space-y-1 text-sm">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/category/${c.slug}/`} className="link-underline inline-flex items-center gap-1.5 hover:text-amber-700">
                  <CategoryIcon slug={c.slug} className="w-3.5 h-3.5 text-amber-600" />
                  {c.title}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/recommend-youtube/" className="inline-flex items-center gap-1.5 hover:text-amber-700">
                <YoutubeIcon className="w-3.5 h-3.5 text-red-600" />
                おすすめYouTubeチャンネル
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
          <h3 className="font-bold text-ink-900 mb-2">サイト情報</h3>
          <ul className="space-y-1 text-sm">
            <li><Link href="/about/" className="hover:text-amber-700">このサイトについて</Link></li>
            <li><Link href="/editorial-policy/" className="hover:text-amber-700">記事作成方針</Link></li>
            <li><Link href="/privacy/" className="hover:text-amber-700">プライバシーポリシー</Link></li>
            <li><Link href="/disclaimer/" className="hover:text-amber-700">免責事項</Link></li>
            <li><Link href="/contact/" className="hover:text-amber-700">お問い合わせ</Link></li>
            <li><Link href="/recommend-youtube/" className="hover:text-amber-700">おすすめYouTubeチャンネル</Link></li>
            <li><Link href="/tags/" className="hover:text-amber-700">タグ一覧</Link></li>
            <li><Link href="/search/" className="hover:text-amber-700">サイト内検索</Link></li>
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
