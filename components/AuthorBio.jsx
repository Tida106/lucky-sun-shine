// Author signature block for the bottom of every article.
// Pulls from `lib/site.js` so updates ripple everywhere.
import Link from 'next/link';
import { author } from '@/lib/site';

export default function AuthorBio({ compact = false }) {
  return (
    <aside className={`not-prose mt-12 rounded-2xl bg-gradient-to-br from-amber-50 to-rose-50 dark:from-amber-900/40 dark:to-rose-900/40 border border-amber-200 dark:border-amber-700 ${compact ? 'p-4' : 'p-6'}`}>
      <div className="flex items-start gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={author.avatar}
          alt={`${author.name} のアバター`}
          width={compact ? 64 : 80}
          height={compact ? 64 : 80}
          className="flex-shrink-0 rounded-full bg-white shadow-sm"
          loading="lazy"
        />
        <div className="min-w-0">
          <div className="text-xs text-amber-700 dark:text-amber-300 font-bold tracking-widest">
            この記事を書いた人
          </div>
          <div className="mt-1 font-display text-lg font-bold text-ink-900 dark:text-amber-50">
            {author.name}
          </div>
          <p className="mt-2 text-sm text-ink-700 dark:text-amber-100 leading-relaxed">
            {author.bio}
          </p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <Link
              href="/operator/"
              className="px-3 py-1 rounded-full bg-white dark:bg-ink-900 border border-amber-200 dark:border-amber-700 text-amber-800 dark:text-amber-200 hover:bg-amber-50 dark:hover:bg-ink-700"
            >
              運営者プロフィール →
            </Link>
            <Link
              href={author.contact}
              className="px-3 py-1 rounded-full bg-white dark:bg-ink-900 border border-amber-200 dark:border-amber-700 text-amber-800 dark:text-amber-200 hover:bg-amber-50 dark:hover:bg-ink-700"
            >
              お問い合わせ
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
