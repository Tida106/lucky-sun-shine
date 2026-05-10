import Link from 'next/link';
import { categories } from '@/lib/categories';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-white/80 dark:bg-ink-900/80 border-b border-amber-200 dark:border-amber-700">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl group-hover:rotate-12 transition-transform">☀️</span>
          <span className="font-display text-xl font-bold tracking-wide text-amber-900 dark:text-amber-200">
            Lucky Sun Shine
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-x-5 gap-y-1 text-sm font-medium text-ink-700 dark:text-amber-100 flex-wrap justify-end">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}/`}
              className="hover:text-amber-700 dark:hover:text-amber-300 transition-colors whitespace-nowrap"
            >
              <span className="mr-1">{c.icon}</span>
              {c.title}
            </Link>
          ))}
          <Link
            href="/recommend-youtube/"
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors whitespace-nowrap"
          >
            <span aria-hidden="true">📺</span>
            おすすめYouTubeチャンネル
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/search/"
            aria-label="サイト内検索"
            className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-amber-200 dark:border-amber-700 hover:bg-amber-50 dark:hover:bg-ink-700 transition-colors text-amber-700 dark:text-amber-300"
            title="検索"
          >
            🔍
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
              className="whitespace-nowrap px-3 py-1.5 rounded-full bg-amber-50 dark:bg-ink-700 text-amber-900 dark:text-amber-200 hover:bg-amber-100 dark:hover:bg-ink-500"
            >
              {c.icon} {c.title}
            </Link>
          ))}
          <Link
            href="/recommend-youtube/"
            className="whitespace-nowrap px-3 py-1.5 rounded-full bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/50"
          >
            📺 おすすめYouTubeチャンネル
          </Link>
        </div>
      </nav>
    </header>
  );
}
