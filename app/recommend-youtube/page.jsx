import Link from 'next/link';
import { site } from '@/lib/site';

export const metadata = {
  title: '開運に役立つおすすめYouTubeチャンネル',
  description:
    '運営者が実際に視聴している、開運・神社・パワースポット情報が学べるYouTubeチャンネルを厳選して紹介します。',
  alternates: { canonical: '/recommend-youtube/' },
  openGraph: {
    type: 'article',
    title: '開運に役立つおすすめYouTubeチャンネル | Lucky Sun Shine',
    description:
      '運営者が実際に視聴している、開運・神社・パワースポット情報が学べるYouTubeチャンネルを厳選して紹介します。',
    url: `${site.url}/recommend-youtube/`,
  },
};

const channels = [
  {
    name: 'コヤッキースタジオ',
    handle: '@koyakky-st',
    url: 'https://www.youtube.com/@koyakky-st',
    genre: '都市伝説・神社・パワースポット考察',
    color: 'from-purple-100 to-rose-100 dark:from-purple-900/40 dark:to-rose-900/40',
    accent: 'bg-purple-500 hover:bg-purple-600',
    icon: '🛸',
    intro: `都市伝説をベースに、全国の神社やパワースポットをエンタメとして深掘りしてくれるチャンネル。
    視聴者が「動画を見て実際に参拝しに行きたくなる」ほどの影響力で知られ、
    神社の歴史的背景や言い伝えを「謎解き」の文脈で楽しめます。
    重い知識を肩肘張らずに吸収できるので、開運やパワースポットに興味を持ち始めた段階の人に特にハマります。`,
    targets: [
      'まずは楽しく開運・神社のことを知りたい人',
      '都市伝説やオカルトが好きで、その延長で神社にも興味がある人',
      '次の旅行先・参拝先のヒントを探している人',
      '長尺の解説動画でじっくり世界観に浸りたい人',
    ],
  },
  {
    name: '神社ソムリエのあやかりチャンネル',
    handle: '@あやかりチャンネル',
    url: 'https://www.youtube.com/@あやかりチャンネル',
    genre: '神社・神話・開運',
    color: 'from-amber-100 to-emerald-100 dark:from-amber-900/40 dark:to-emerald-900/40',
    accent: 'bg-emerald-600 hover:bg-emerald-700',
    icon: '⛩️',
    intro: `神社ソムリエ・佐々木優太氏が運営する、本格派の神社解説チャンネル。
    1万5千社以上を巡拝した経験をもとに、神社にまつわる作法、
    日本神話のわかりやすい解説、その年におすすめの開運神社などを発信しています。
    エンタメ寄りの動画では物足りない、もっと体系的・本格的に神社や開運を学びたい人に最適です。`,
    targets: [
      '神社や神道について体系的に学びたい人',
      'その年・その季節に行くべき神社を知りたい人',
      '神話・歴史の背景まで踏み込みたい人',
      'パワーストーン以外の開運の知識も広げたい人',
    ],
  },
];

const RELATED = [
  { href: '/blog/ise-jingu-power-spot/',     label: '伊勢神宮の参拝ガイド｜パワースポットとしての魅力と回り方' },
  { href: '/blog/izumo-taisha/',             label: '出雲大社の参拝ガイド｜縁結びの聖地' },
  { href: '/blog/kurama-dera/',              label: '鞍馬寺の参拝ガイド｜京都最強のパワースポット' },
  { href: '/blog/morning-routine-lucky/',    label: '運気が上がる朝の習慣7つ｜今日から始められる開運ルーティン' },
  { href: '/blog/fengshui-powerstone-basics/', label: '風水×パワーストーン｜気の流れを整える石の置き方の基本' },
];

export default function RecommendYoutubePage() {
  // ItemList JSON-LD per the SEO requirement.
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: '開運に役立つおすすめYouTubeチャンネル',
    description:
      '運営者が実際に視聴している、開運・神社・パワースポット情報が学べるYouTubeチャンネルの厳選リスト',
    url: `${site.url}/recommend-youtube/`,
    numberOfItems: channels.length,
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    itemListElement: channels.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'WebPage',
        name: c.name,
        url: c.url,
        description: c.intro.replace(/\s+/g, ' ').trim().slice(0, 200),
      },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'ホーム',                   item: `${site.url}/` },
      { '@type': 'ListItem', position: 2, name: 'おすすめYouTubeチャンネル', item: `${site.url}/recommend-youtube/` },
    ],
  };

  return (
    <article className="max-w-5xl mx-auto px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumb */}
      <nav aria-label="パンくずリスト" className="text-xs text-ink-500 dark:text-amber-200 mb-6">
        <Link href="/" className="hover:text-amber-700 dark:hover:text-amber-300">トップ</Link>
        <span className="mx-1">/</span>
        <span className="text-ink-700 dark:text-amber-100">おすすめYouTubeチャンネル</span>
      </nav>

      {/* Hero */}
      <header className="text-center mb-10">
        <p className="text-amber-700 dark:text-amber-300 text-xs font-bold tracking-widest">
          RECOMMEND
        </p>
        <h1 className="mt-2 font-display text-3xl md:text-4xl font-extrabold text-ink-900 dark:text-amber-50 leading-tight">
          開運に役立つ<br className="md:hidden" />
          おすすめYouTubeチャンネル
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-sm md:text-base text-ink-700 dark:text-amber-100 leading-relaxed">
          記事だけでは伝わらない神社の空気感、語り手の熱量、現地の景色――。
          動画でしか得られない情報も、開運を深めるうえで大きな助けになります。
        </p>
      </header>

      {/* Intro */}
      <section className="rounded-2xl bg-gradient-to-br from-amber-50 to-rose-50 dark:from-amber-900/40 dark:to-rose-900/40 border border-amber-200 dark:border-amber-700 p-5 md:p-6 mb-10">
        <p className="text-sm text-ink-700 dark:text-amber-100 leading-relaxed">
          このページでは、{site.publisherName} が実際に視聴している中から、
          <strong>開運・神社・パワースポット</strong> 系で
          「<strong>これは本当に学びになる</strong>」と感じる2つのチャンネルを厳選して紹介します。
          記事と動画、両方をうまく組み合わせると、開運の理解は一気に立体的になります。
        </p>
      </section>

      {/* Channel cards */}
      <section className="grid gap-6 md:grid-cols-2">
        {channels.map((c) => (
          <article
            key={c.name}
            className={`rounded-2xl border border-amber-200 dark:border-amber-700 bg-gradient-to-br ${c.color} overflow-hidden flex flex-col`}
          >
            {/* Thumbnail-style header */}
            <div className="relative aspect-video bg-ink-900 flex items-center justify-center overflow-hidden">
              {/* Sun rays decoration */}
              <div className="absolute inset-0 opacity-30 bg-sun-radial" />
              <div className="relative text-center text-white">
                <div className="text-6xl mb-2">{c.icon}</div>
                <div className="font-display text-lg font-bold drop-shadow">
                  {c.name}
                </div>
              </div>
              {/* YouTube badge */}
              <div className="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 shadow">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" aria-hidden="true">
                  <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6a3 3 0 0 0-2.1 2.1C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z"/>
                </svg>
                YouTube
              </div>
            </div>

            {/* Body */}
            <div className="p-5 md:p-6 flex flex-col flex-1">
              <div className="text-xs font-bold text-amber-700 dark:text-amber-300 tracking-wider">
                {c.genre}
              </div>
              <h2 className="mt-1 font-display text-xl md:text-2xl font-extrabold text-ink-900 dark:text-amber-50">
                {c.name}
              </h2>
              <div className="text-xs text-ink-500 dark:text-amber-200 mt-0.5">
                {c.handle}
              </div>

              <p className="mt-3 text-sm text-ink-700 dark:text-amber-100 leading-relaxed whitespace-pre-line">
                {c.intro}
              </p>

              <div className="mt-4">
                <div className="text-xs font-bold text-ink-900 dark:text-amber-50 mb-2">
                  こんな人におすすめ
                </div>
                <ul className="space-y-1.5">
                  {c.targets.map((t) => (
                    <li key={t} className="text-sm text-ink-700 dark:text-amber-100 flex gap-2">
                      <span className="text-amber-600 dark:text-amber-400 flex-shrink-0">✓</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 pt-4 border-t border-amber-200/60 dark:border-amber-700/60">
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener nofollow"
                  className={`inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-full ${c.accent} text-white font-bold text-sm shadow-sm transition-colors`}
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6a3 3 0 0 0-2.1 2.1C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z"/>
                  </svg>
                  チャンネルを見る
                  <span aria-hidden="true">→</span>
                </a>
                <p className="mt-2 text-[11px] text-ink-500 dark:text-amber-200 text-center">
                  YouTube に移動します
                </p>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* How to use this page */}
      <section className="mt-12 rounded-2xl bg-white dark:bg-ink-900 border border-amber-200 dark:border-amber-700 p-6">
        <h2 className="font-display text-xl font-bold text-ink-900 dark:text-amber-50 flex items-center gap-2">
          <span>🎬</span> 動画と記事を組み合わせるコツ
        </h2>
        <ol className="mt-4 space-y-2 text-sm text-ink-700 dark:text-amber-100">
          <li><strong>1. まず動画で空気感をつかむ</strong> — 神社や場所のエネルギーは、映像と語りで一気に体感できます。</li>
          <li><strong>2. 当サイトの記事で詳細を確認</strong> — 参拝順序・アクセス・おすすめの石まで、文字情報のほうが整理しやすい部分を補完。</li>
          <li><strong>3. 実際に訪れる前のチェックリスト化</strong> — 動画と記事を行き来しながら、自分のメモをまとめておくと現地での体験が深まります。</li>
        </ol>
      </section>

      {/* Related Lucky Sun Shine articles */}
      <section className="mt-12">
        <h2 className="font-display text-2xl font-bold text-ink-900 dark:text-amber-50 mb-4 flex items-center gap-2">
          <span>📖</span> 合わせて読みたい当サイトの記事
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {RELATED.map((r) => (
            <li key={r.href}>
              <Link
                href={r.href}
                className="block p-4 rounded-xl bg-white dark:bg-ink-900 border border-amber-200 dark:border-amber-700 hover:border-amber-400 hover:shadow-sm transition-all"
              >
                <span className="text-xs text-amber-700 dark:text-amber-300 font-bold">記事</span>
                <span className="block mt-1 text-sm font-bold text-ink-900 dark:text-amber-50 leading-snug">
                  {r.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Disclaimer */}
      <section className="mt-12 text-xs text-ink-500 dark:text-amber-200 leading-relaxed">
        <p>
          ※ 紹介しているチャンネルは{site.publisherName}の視聴体験に基づく推薦であり、
          各チャンネルの運営者様とは資本関係・PR関係はありません。
          各チャンネル内で発信される情報の正確性・効果については、各チャンネル運営者の責任に帰属します。
        </p>
      </section>
    </article>
  );
}
