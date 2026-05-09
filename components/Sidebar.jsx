// Optional sidebar. Used on selected pages (search, single post on
// wider viewports). Keeps it simple — popular posts + newsletter +
// search prompt.
import PopularPosts from './PopularPosts';
import Newsletter from './Newsletter';
import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="space-y-6">
      <div className="rounded-2xl bg-white dark:bg-ink-900 border border-amber-200 dark:border-amber-700 p-5">
        <Link href="/search/" className="flex items-center gap-2 text-sm font-bold text-ink-900 dark:text-amber-50 hover:text-amber-700 dark:hover:text-amber-300">
          <span>🔍</span> サイト内検索
        </Link>
        <p className="mt-1 text-xs text-ink-500 dark:text-amber-200">
          パワーストーン名・運勢・地名などで横断検索できます。
        </p>
      </div>
      <PopularPosts limit={5} />
      <Newsletter />
    </aside>
  );
}
