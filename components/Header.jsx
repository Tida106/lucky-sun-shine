import Link from 'next/link';
import { categories } from '@/lib/categories';

export default function Header() {
  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-white/80 border-b border-amber-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl group-hover:rotate-12 transition-transform">☀️</span>
          <span className="font-display text-xl font-bold tracking-wide text-amber-900">
            Lucky Sun Shine
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-ink-700">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}/`}
              className="hover:text-amber-700 transition-colors"
            >
              <span className="mr-1">{c.icon}</span>
              {c.title}
            </Link>
          ))}
        </nav>
        <Link
          href="/about/"
          className="text-sm text-ink-500 hover:text-amber-700 transition-colors"
        >
          このサイトについて
        </Link>
      </div>
      <nav className="md:hidden border-t border-amber-100 bg-white/90">
        <div className="max-w-6xl mx-auto px-2 py-2 flex overflow-x-auto gap-1 text-xs">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}/`}
              className="whitespace-nowrap px-3 py-1.5 rounded-full bg-amber-50 text-amber-900 hover:bg-amber-100"
            >
              {c.icon} {c.title}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
