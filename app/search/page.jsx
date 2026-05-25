import SearchBox from '@/components/SearchBox';
import Breadcrumbs from '@/components/Breadcrumbs';
import Sidebar from '@/components/Sidebar';

export const metadata = {
  title: 'サイト内検索',
  description: 'Lucky Sun Shine のサイト内検索。パワーストーン・パワースポット・開運グッズ・運気アップ習慣の記事を横断検索できます。',
  alternates: { canonical: '/search/' },
};

export default function SearchPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 grid lg:grid-cols-[minmax(0,1fr)_320px] gap-10">
      <section className="min-w-0">
        <Breadcrumbs items={[{ name: 'サイト内検索' }]} className="mb-6" />
        <header className="mb-6 text-center">
          <p className="text-amber-700 text-xs font-bold tracking-widest">SEARCH</p>
          <h1 className="font-display text-3xl font-extrabold mt-2 text-ink-900">
            サイト内検索
          </h1>
          <p className="mt-2 text-sm text-ink-500">
            記事タイトル・タグ・本文から検索します
          </p>
        </header>
        <SearchBox autofocus />
        <p className="mt-6 text-xs text-ink-500 text-center">
          うまく見つからないときは、右のサイドバーからカテゴリ・ハブ・シリーズで辿ってみてください☀️
        </p>
      </section>

      <div className="hidden lg:block">
        <div className="sticky top-24">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
