'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { categories, getCategoryTitle } from '@/lib/categories';
import CategoryIcon from '@/components/CategoryIcon';
import { SearchIcon } from '@/components/icons/NavIcons';

// Next.js の静的書き出しでは not-found.jsx は常に1つの静的HTMLとして
// プリレンダーされるため、サーバー側ではロケールを判定できない。
// usePathname() でクライアント側のURLから判定し、表示文言だけを
// 言語別に出し分ける(リンク先は各言語で確実に存在するトップ・検索・
// カテゴリページのみを使うので、静的な初期HTML自体はそのまま有効)。
export default function NotFound() {
  const pathname = usePathname() || '';
  const isZhTw = pathname.startsWith('/zh-tw');
  const isEn = !isZhTw && pathname.startsWith('/en');
  const locale = isZhTw ? 'zh-tw' : isEn ? 'en' : 'ja';

  const t = isZhTw
    ? {
        title: '找不到這個頁面',
        body: '網址可能已變更或該頁面已被刪除。',
        body2: '請從首頁或以下分類尋找文章。',
        home: '/zh-tw/',
        homeLabel: '回到首頁',
        search: '/search/',
        searchLabel: '站內搜尋',
        categoryHeading: '依分類瀏覽',
      }
    : isEn
      ? {
          title: 'Page Not Found',
          body: 'The URL may have changed, or the page may have been removed.',
          body2: 'Please search from the top page, or browse one of the categories below.',
          home: '/en/',
          homeLabel: 'Back to Top',
          search: '/search/',
          searchLabel: 'Search',
          categoryHeading: 'Browse by Category',
        }
      : {
          title: 'ページが見つかりませんでした',
          body: 'URLが変更されたか、削除された可能性があります。',
          body2: 'トップページから、または以下のカテゴリから記事をお探しください。',
          home: '/',
          homeLabel: 'トップへ戻る',
          search: '/search/',
          searchLabel: 'サイト内検索',
          categoryHeading: 'カテゴリから探す',
        };

  return (
    <section className="max-w-2xl mx-auto px-4 py-16 text-center">
      <p className="text-amber-700 text-xs font-bold tracking-widest">404</p>
      <h1 className="mt-3 font-display text-4xl md:text-5xl font-extrabold text-ink-900">
        {t.title}
      </h1>
      <p className="mt-4 text-ink-700 leading-relaxed">
        {t.body}<br />
        {t.body2}
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href={t.home}
          className="px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-bold transition-colors"
        >
          {t.homeLabel}
        </Link>
        <Link
          href={t.search}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-amber-200 hover:bg-amber-50 font-bold"
        >
          <SearchIcon className="w-4 h-4 text-[#C9A96E]" />
          {t.searchLabel}
        </Link>
      </div>

      <div className="mt-10">
        <h2 className="text-sm font-bold text-ink-700 mb-3">{t.categoryHeading}</h2>
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}/`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-amber-200 text-sm hover:bg-amber-50"
            >
              <CategoryIcon slug={c.slug} className={`w-3.5 h-3.5 ${c.pastel.accent}`} />
              {getCategoryTitle(c, locale)}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
