// Optional sidebar. Used on selected pages (search, single post on
// wider viewports). Keeps it simple — popular posts + search prompt.
import PopularPosts from './PopularPosts';
import Link from 'next/link';
import { SearchIcon } from './icons/NavIcons';

export default function Sidebar() {
  return (
    <aside className="space-y-6">
      <div className="rounded-2xl bg-white border border-amber-200 p-5">
        <Link href="/search/" className="inline-flex items-center gap-2 text-sm font-bold text-ink-900 hover:text-amber-700">
          <SearchIcon className="w-4 h-4 text-[#C9A96E]" />
          サイト内検索
        </Link>
        <p className="mt-1 text-xs text-ink-500">
          パワーストーン名・運勢・地名などで横断検索できます。
        </p>
      </div>
      <PopularPosts limit={5} />
    </aside>
  );
}
