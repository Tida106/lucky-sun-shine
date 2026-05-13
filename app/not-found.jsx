import Link from 'next/link';
import { categories } from '@/lib/categories';
import CategoryIcon from '@/components/CategoryIcon';
import { SearchIcon } from '@/components/icons/NavIcons';

export const metadata = {
  title: '404 — ページが見つかりません',
  description: 'お探しのページは見つかりませんでした。トップページまたはカテゴリから記事をお探しください。',
};

export default function NotFound() {
  return (
    <section className="max-w-2xl mx-auto px-4 py-16 text-center">
      <p className="text-amber-700 text-xs font-bold tracking-widest">404</p>
      <h1 className="mt-3 font-display text-4xl md:text-5xl font-extrabold text-ink-900">
        ページが見つかりませんでした
      </h1>
      <p className="mt-4 text-ink-700 leading-relaxed">
        URLが変更されたか、削除された可能性があります。<br />
        トップページから、または以下のカテゴリから記事をお探しください。
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-bold transition-colors"
        >
          トップへ戻る
        </Link>
        <Link
          href="/search/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-amber-200 hover:bg-amber-50 font-bold"
        >
          <SearchIcon className="w-4 h-4 text-[#C9A96E]" />
          サイト内検索
        </Link>
      </div>

      <div className="mt-10">
        <h2 className="text-sm font-bold text-ink-700 mb-3">カテゴリから探す</h2>
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}/`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-amber-200 text-sm hover:bg-amber-50"
            >
              <CategoryIcon slug={c.slug} className={`w-3.5 h-3.5 ${c.pastel.accent}`} />
              {c.title}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
