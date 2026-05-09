import SearchBox from '@/components/SearchBox';

export const metadata = {
  title: 'サイト内検索',
  description: 'Lucky Sun Shine のサイト内検索。パワーストーン・パワースポット・開運グッズ・運気アップ習慣の記事を横断検索できます。',
  alternates: { canonical: '/search/' },
};

export default function SearchPage() {
  return (
    <section className="max-w-3xl mx-auto px-4 py-12">
      <header className="mb-6 text-center">
        <p className="text-amber-700 dark:text-amber-300 text-xs font-bold tracking-widest">SEARCH</p>
        <h1 className="font-display text-3xl font-extrabold mt-2 text-ink-900 dark:text-amber-50">
          サイト内検索
        </h1>
        <p className="mt-2 text-sm text-ink-500 dark:text-amber-200">
          記事タイトル・タグ・本文から検索します
        </p>
      </header>
      <SearchBox autofocus />
    </section>
  );
}
