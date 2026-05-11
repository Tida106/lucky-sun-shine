import Link from 'next/link';
import { categories } from '@/lib/categories';
import CategoryIcon from './CategoryIcon';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import { SearchIcon, YoutubeIcon } from './icons/NavIcons';

export default function Header() {
  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-white/80 dark:bg-ink-900/80 border-b border-amber-200 dark:border-amber-700">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link href="/" className="group inline-flex items-center" aria-label="Lucky Sun Shine トップへ">
          <Logo
            size={28}
            wordmarkClassName="text-base md:text-lg group-hover:text-amber-700 dark:group-hover:text-amber-100 transition-colors"
            className="transition-transform group-hover:[&_svg]:rotate-12 [&_svg]:transition-transform [&_svg]:duration-500"
          />
        </Link>
        <nav className="hidden md:flex items-center gap-x-5 gap-y-1 text-sm font-medium text-ink-700 dark:text-amber-100 flex-wrap justify-end">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}/`}
              className="link-underline inline-flex items-center gap-1.5 hover:text-amber-700 dark:hover:text-amber-300 transition-colors whitespace-nowrap"
            >
              <CategoryIcon slug={c.slug} className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              {c.title}
            </Link>
          ))}
          <Link
            href="/recommend-youtube/"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors whitespace-nowrap"
          >
            <YoutubeIcon className="w-4 h-4" />
            おすすめYouTubeチャンネル
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/search/"
            aria-label="サイト内検索"
            className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-amber-200 dark:border-amber-700 hover:bg-amber-50 dark:hover:bg-ink-700 transition-colors text-[#C9A96E] hover:text-[#9C7A47] dark:text-amber-400 dark:hover:text-amber-200"
            title="検索"
          >
            <SearchIcon className="w-[18px] h-[18px]" />
          </Link>
          <ThemeToggle />
        </div>
      </div>
      <nav className="md:hidden border-t border-amber-100 dark:border-amber-800 bg-white/90 dark:bg-ink-900/90">
        <div className="max-w-6xl mx-auto px-2 py-2 flex overflow-x-auto gap-1 text-xs">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}/`}
              className="inline-flex items-center gap-1 whitespace-nowrap px-3 py-1.5 rounded-full bg-amber-50 dark:bg-ink-700 text-amber-900 dark:text-amber-200 hover:bg-amber-100 dark:hover:bg-ink-500"
            >
              <CategoryIcon slug={c.slug} className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              {c.title}
            </Link>
          ))}
          <Link
            href="/recommend-youtube/"
            className="inline-flex items-center gap-1.5 whitespace-nowrap px-3 py-1.5 rounded-full bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/50"
          >
            <YoutubeIcon className="w-3.5 h-3.5" />
            おすすめYouTubeチャンネル
          </Link>
        </div>
      </nav>
    </header>
  );
}
