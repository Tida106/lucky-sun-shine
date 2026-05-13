import Link from 'next/link';
import { categories } from '@/lib/categories';
import CategoryIcon from './CategoryIcon';
import Logo from './Logo';
import { SearchIcon, YoutubeIcon, InstagramIcon } from './icons/NavIcons';

const INSTAGRAM_URL = 'https://www.instagram.com/lucky.sun.shine/';

export default function Header() {
  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-white/80 border-b border-amber-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link href="/" className="group inline-flex items-center" aria-label="Lucky Sun Shine トップへ">
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
              href={`/category/${c.slug}/`}
              className="link-underline inline-flex items-center gap-1.5 hover:text-amber-700 transition-colors whitespace-nowrap"
            >
              <CategoryIcon slug={c.slug} className="w-4 h-4 text-amber-600" />
              {c.title}
            </Link>
          ))}
          <Link
            href="/recommend-youtube/"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 hover:bg-red-100 transition-colors whitespace-nowrap"
          >
            <YoutubeIcon className="w-4 h-4" />
            おすすめYouTubeチャンネル
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/search/"
            aria-label="サイト内検索"
            className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-amber-200 hover:bg-amber-50 transition-colors text-[#C9A96E] hover:text-[#9C7A47]"
            title="検索"
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
            <Link
              key={c.slug}
              href={`/category/${c.slug}/`}
              className="inline-flex items-center gap-1 whitespace-nowrap px-3 py-1.5 rounded-full bg-amber-50 text-amber-900 hover:bg-amber-100"
            >
              <CategoryIcon slug={c.slug} className="w-3.5 h-3.5 text-amber-600" />
              {c.title}
            </Link>
          ))}
          <Link
            href="/recommend-youtube/"
            className="inline-flex items-center gap-1.5 whitespace-nowrap px-3 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-700 hover:bg-red-100"
          >
            <YoutubeIcon className="w-3.5 h-3.5" />
            おすすめYouTubeチャンネル
          </Link>
        </div>
      </nav>
    </header>
  );
}
