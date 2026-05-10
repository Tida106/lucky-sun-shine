import Link from 'next/link';
import { site, author } from '@/lib/site';

export const metadata = {
  title: '運営者プロフィール｜Lucky Sun Shine について',
  description: `Lucky Sun Shine の編集長 ${author.name} の自己紹介・サイトを始めた経緯・想いを掲載しています。`,
  alternates: { canonical: '/operator/' },
};

export default function OperatorPage() {
  // Render the long bio as paragraphs separated by blank lines.
  const paragraphs = author.fullBio.trim().split(/\n{2,}/);

  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <header className="text-center mb-10">
        <p className="text-amber-700 dark:text-amber-300 text-xs font-bold tracking-widest">OPERATOR</p>
        <h1 className="mt-2 font-display text-3xl md:text-4xl font-extrabold text-ink-900 dark:text-amber-50">
          運営者プロフィール
        </h1>
      </header>

      {/* Avatar + name card */}
      <section className="rounded-2xl bg-gradient-to-br from-amber-50 to-rose-50 dark:from-amber-900/40 dark:to-rose-900/40 border border-amber-200 dark:border-amber-700 p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={author.avatar}
          alt={`${author.name} のアバター`}
          width="160"
          height="160"
          className="rounded-full bg-white shadow-md w-32 h-32 md:w-40 md:h-40"
        />
        <div className="text-center md:text-left">
          <p className="text-xs text-amber-700 dark:text-amber-300 font-bold tracking-widest">
            EDITOR IN CHIEF
          </p>
          <h2 className="mt-1 font-display text-3xl font-extrabold text-ink-900 dark:text-amber-50">
            {author.name}
          </h2>
          <p className="mt-2 text-sm text-ink-700 dark:text-amber-100 italic">
            「{author.motto}」
          </p>
        </div>
      </section>

      {/* Bio paragraphs */}
      <section className="mt-10 prose-article">
        <h2>はじめに</h2>
        {paragraphs.map((p, i) => (
          <p
            key={i}
            // bio has **bold** markup — render minimally
            dangerouslySetInnerHTML={{
              __html: p.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>'),
            }}
          />
        ))}
      </section>

      {/* Profile facts */}
      <section className="mt-10">
        <h2 className="font-display text-2xl font-bold text-ink-900 dark:text-amber-50 mb-4">
          プロフィール
        </h2>
        <dl className="grid sm:grid-cols-2 gap-3">
          {author.facts.map((f) => (
            <div key={f.label} className="flex justify-between items-baseline gap-3 p-3 rounded-xl bg-white dark:bg-ink-900 border border-amber-200 dark:border-amber-700">
              <dt className="text-xs text-ink-500 dark:text-amber-200 font-bold tracking-wider">
                {f.label}
              </dt>
              <dd className="font-display text-lg font-bold text-amber-800 dark:text-amber-200">
                {f.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Editorial principles */}
      <section className="mt-10">
        <h2 className="font-display text-2xl font-bold text-ink-900 dark:text-amber-50 mb-4">
          このサイトを書くときに大切にしていること
        </h2>
        <ul className="space-y-3">
          {[
            { emoji: '🤝', title: '誠実さ', body: '効果を保証する書き方はしません。「〜と言われている」「〜とされる」を徹底し、根拠の弱いことは弱いと伝えます。' },
            { emoji: '👀', title: '体験ベース', body: '紹介する石は実際に手に取って、神社は実際に訪れて書くことを基本にしています。' },
            { emoji: '🔍', title: '一次情報重視', body: '神社・寺の歴史は公式サイトと現地の由緒書きを参照。鉱物の科学的事項は鑑別書や鉱物図鑑で確認します。' },
            { emoji: '📝', title: '更新主義', body: '価格や情報は変わるもの。気づいたら随時更新し、更新日を明示します。' },
            { emoji: '💸', title: '広告の透明性', body: 'アフィリエイトリンクは PR と明示し、読者が選びやすい複数選択肢を提示します。' },
          ].map((p) => (
            <li key={p.title} className="flex gap-3 items-start p-3 rounded-xl bg-amber-50 dark:bg-ink-900 border border-amber-100 dark:border-amber-800">
              <span className="text-2xl">{p.emoji}</span>
              <div>
                <div className="font-bold text-ink-900 dark:text-amber-50">{p.title}</div>
                <div className="text-sm text-ink-700 dark:text-amber-100">{p.body}</div>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-ink-500 dark:text-amber-200">
          詳しい編集方針は <Link href="/editorial-policy/" className="underline hover:text-amber-700">記事作成方針ページ</Link> をご覧ください。
        </p>
      </section>

      {/* Contact CTA */}
      <section className="mt-12 rounded-2xl bg-amber-100 dark:bg-amber-900/40 border border-amber-200 dark:border-amber-700 p-6 text-center">
        <h2 className="font-display text-xl font-bold text-ink-900 dark:text-amber-50">
          ご連絡・ご意見はお気軽に
        </h2>
        <p className="mt-2 text-sm text-ink-700 dark:text-amber-100">
          記事の感想・誤りのご指摘・取材依頼など、いつでもお待ちしています。<br />
          すべてのメッセージに目を通しています（返信に数日いただく場合があります）。
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <Link
            href="/contact/"
            className="px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-bold transition-colors"
          >
            ✉️ お問い合わせフォーム
          </Link>
          <Link
            href="/start-here/"
            className="px-5 py-2.5 rounded-full bg-white dark:bg-ink-900 border border-amber-200 dark:border-amber-700 hover:bg-amber-50 dark:hover:bg-ink-700 font-bold"
          >
            🌟 はじめての方へ
          </Link>
        </div>
      </section>

      {/* Site meta */}
      <section className="mt-10 text-sm text-ink-500 dark:text-amber-200 text-center">
        <p>
          サイト名：{site.name}（{site.url}）<br />
          運営開始：2026年5月
        </p>
      </section>
    </article>
  );
}
