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
    // Single-video embed: 寒川神社の紹介動画(八方除けで知られる相模国一之宮)。
    // 神社・開運スポット紹介として政治・陰謀色のない代表動画を選定。
    videoId: 'HJ4HqVCUgeE',
    featuredVideoTitle: '2025年に絶対に行きたい、すべての災いを取り除く最強の神社（寒川神社）',
    genre: '都市伝説・神社・パワースポット考察',
    color: 'from-purple-100 to-rose-100',
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
    uploadsPlaylistId: 'UU0Wv49l3qlIdFX69FKD3y1g',
    genre: '神社・神話・開運',
    color: 'from-amber-100 to-emerald-100',
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
  {
    name: '島田秀平のお開運巡り',
    handle: '公式チャンネル',
    url: 'https://www.youtube.com/channel/UCRRc9jvc6LP-MO2Cf0E7ZZA',
    // Single-video embed: 高千穂・天岩戸神社の最強開運スポット紹介。
    // 天照大神神話の聖地で、純粋な神社/パワースポット紹介として代表的。
    videoId: 'HjY1WB7TV9E',
    featuredVideoTitle: '高千穂 天岩戸神社のここが最強開運スポット',
    genre: '開運・手相占い・パワースポット',
    color: 'from-sky-100 to-indigo-100',
    accent: 'bg-indigo-600 hover:bg-indigo-700',
    icon: '🔮',
    intro: `芸能人手相占い師として知られる島田秀平氏が運営する開運チャンネル。
    手相占いの基礎から、パワースポット紹介、専門家を招いた開運対談まで幅広く配信しています。
    芸能界仕込みの軽快なトークでエンタメ性が高く、占いや開運初心者でも入りやすいのが魅力。
    毎週火曜19時更新で、ゲストにシウマ氏など人気占い師も多数登場します。`,
    targets: [
      '占いや開運に興味があるけれど、難しい話は苦手な人',
      'エンタメ感覚で楽しく運気を学びたい人',
      '手相占いの基礎を初歩から知りたい人',
      'シウマ氏など人気占い師の話をまとめて聴きたい人',
    ],
  },
  {
    name: '細木かおりチャンネル',
    handle: '@kaori_channel',
    url: 'https://www.youtube.com/@kaori_channel',
    // 当初 uploadsPlaylistId で最新動画を表示する設定にしていたが、
    // 表示されたエピソードが「埋め込み禁止」設定で再生不可となるため、
    // iframe を出さずチャンネルカード型のフォールバックに切り替えた。
    // (videoId / uploadsPlaylistId のいずれかが正しく埋め込み可能と
    //  確認できたら設定し直す)
    embedDisabled: true,
    genre: '六星占術・人生相談',
    color: 'from-rose-100 to-orange-100',
    accent: 'bg-rose-600 hover:bg-rose-700',
    icon: '🌟',
    intro: `細木数子の六星占術を継承した細木かおり氏が運営する公式チャンネル。
    「日本を幸せにしたい！」をテーマに、六星占術の知識や活用方法、
    恋愛・仕事・家族の悩み相談まで幅広く配信。基本週3回更新で、
    星人別の運勢や開運アドバイスがわかりやすく学べます。
    YouTubeの収益は全額「スマイルプロジェクト」に寄付されており、
    社会貢献にも力を入れているチャンネル。占いを通じて
    人生を前向きに歩みたい方におすすめです。`,
    targets: [
      '六星占術に興味がある人',
      '人生の悩みに占いの視点でアドバイスが欲しい人',
      '星人別の運勢を知りたい人',
      '社会貢献にも共感できるチャンネルを応援したい人',
    ],
  },
];

// Trending パワーストーン videos — picked up for buzz/参考性, no business
// relationship with the creators. Same iframe pattern as the channel
// cards above; rendered as a separate section so SEO can index them as
// VideoObject items.
const trendingVideos = [
  {
    title: 'ヒカルが山梨・昇仙峡でルチルクォーツを購入',
    videoId: '_T43UuqhRe8',
    url: 'https://www.youtube.com/watch?v=_T43UuqhRe8',
    intro: `日本トップクラスのYouTuberヒカル氏が、水晶の聖地・山梨県昇仙峡を訪れ、パワーストーンの代表格「ルチルクォーツ」を購入する動画。この動画をきっかけに、ヒカル氏の運気が上昇したと話題になり、ルチルクォーツの知名度が一気に高まりました。パワーストーンに興味があるなら一度は見ておきたい一本です。`,
  },
  {
    title: 'ヒカルがストーンマーケット会長の10億円豪邸にお泊まり',
    videoId: '-8FO4F7bAYY',
    url: 'https://www.youtube.com/watch?v=-8FO4F7bAYY',
    intro: `パワーストーン専門店「ストーンマーケット」を一代で築き上げた中村泰二郎会長（現在はヒカル氏が社長就任）の福岡の大豪邸を訪れる動画。希少な原石コレクションや、パワーストーンビジネスのスケールに圧倒される内容で、開運・パワーストーンとお金の関係性を考えさせられる一本です。`,
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

  // Each trending video gets its own VideoObject schema — Google indexes
  // these for the video carousel. Thumbnail follows the public YouTube
  // CDN pattern (hqdefault is always available).
  const videoObjectSchemas = trendingVideos.map((v) => ({
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: v.title,
    description: v.intro.replace(/\s+/g, ' ').trim(),
    thumbnailUrl: [`https://i.ytimg.com/vi/${v.videoId}/hqdefault.jpg`],
    uploadDate: '2024-01-01',
    contentUrl: v.url,
    embedUrl: `https://www.youtube-nocookie.com/embed/${v.videoId}`,
  }));

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'ホーム',                   item: `${site.url}/` },
      { '@type': 'ListItem', position: 2, name: 'おすすめYouTubeチャンネル', item: `${site.url}/recommend-youtube/` },
    ],
  };

  return (
    <article className="max-w-6xl mx-auto px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {videoObjectSchemas.map((s, i) => (
        <script
          key={`video-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}

      {/* Breadcrumb */}
      <nav aria-label="パンくずリスト" className="text-xs text-ink-500 mb-6">
        <Link href="/" className="hover:text-amber-700">トップ</Link>
        <span className="mx-1">/</span>
        <span className="text-ink-700">おすすめYouTubeチャンネル</span>
      </nav>

      {/* Hero */}
      <header className="text-center mb-10">
        <p className="text-amber-700 text-xs font-bold tracking-widest">
          RECOMMEND
        </p>
        <h1 className="mt-2 font-display text-3xl md:text-4xl font-extrabold text-ink-900 leading-tight">
          開運に役立つ<br className="md:hidden" />
          おすすめYouTubeチャンネル
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-sm md:text-base text-ink-700 leading-relaxed">
          記事だけでは伝わらない神社の空気感、語り手の熱量、現地の景色――。
          動画でしか得られない情報も、開運を深めるうえで大きな助けになります。
        </p>
      </header>

      {/* Intro */}
      <section className="rounded-2xl bg-gradient-to-br from-amber-50 to-rose-50 border border-amber-200 p-5 md:p-6 mb-10">
        <p className="text-sm text-ink-700 leading-relaxed">
          このページでは、{site.publisherName} が実際に視聴している中から、
          <strong>開運・神社・パワースポット</strong> 系で
          「<strong>これは本当に学びになる</strong>」と感じる3つのチャンネルを厳選して紹介します。
          記事と動画、両方をうまく組み合わせると、開運の理解は一気に立体的になります。
        </p>
      </section>

      {/* Channel cards — mobile: 1col / tablet+: 2col(2x2) / xl: 4col(1row).
          Switched away from 3-col since the 4th channel was added — 2x2 on
          standard desktops keeps each card readable; xl screens get 4-across. */}
      <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {channels.map((c) => (
          <article
            key={c.name}
            className={`rounded-2xl border border-amber-200 bg-gradient-to-br ${c.color} overflow-hidden flex flex-col`}
          >
            {/* Live YouTube embed: 単一動画指定があればそれを、なければ
                uploads プレイリストの最新動画。どちらも使えない
                (embedDisabled) チャンネルは、チャンネルアート風の
                フォールバックを描画して埋め込みエラーを避ける。 */}
            <div className="relative aspect-video bg-ink-900 overflow-hidden">
              {!c.embedDisabled && (c.videoId || c.uploadsPlaylistId) ? (
                <iframe
                  src={
                    c.videoId
                      ? `https://www.youtube-nocookie.com/embed/${c.videoId}?rel=0`
                      : `https://www.youtube-nocookie.com/embed/videoseries?list=${c.uploadsPlaylistId}&rel=0`
                  }
                  title={`${c.name} のYouTube動画${c.featuredVideoTitle ? `：${c.featuredVideoTitle}` : ''}`}
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                />
              ) : (
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener nofollow"
                  className={`absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br ${c.color} text-ink-900 hover:brightness-110 transition`}
                  aria-label={`${c.name} を YouTube で開く`}
                >
                  <span className="text-4xl" aria-hidden="true">{c.icon}</span>
                  <span className="font-display font-bold text-base md:text-lg">{c.name}</span>
                  <span className="text-xs text-ink-700">
                    YouTubeチャンネルを開く →
                  </span>
                </a>
              )}
            </div>

            {/* Body */}
            <div className="p-5 md:p-6 flex flex-col flex-1">
              <div className="text-xs font-bold text-amber-700 tracking-wider">
                {c.genre}
              </div>
              <h2 className="mt-1 font-display text-xl md:text-2xl font-extrabold text-ink-900 flex items-center gap-2">
                <span aria-hidden="true">{c.icon}</span>
                <span>{c.name}</span>
              </h2>
              <div className="text-xs text-ink-500 mt-0.5">
                {c.handle}
              </div>

              <p className="mt-3 text-sm text-ink-700 leading-relaxed whitespace-pre-line">
                {c.intro}
              </p>

              <div className="mt-4">
                <div className="text-xs font-bold text-ink-900 mb-2">
                  こんな人におすすめ
                </div>
                <ul className="space-y-1.5">
                  {c.targets.map((t) => (
                    <li key={t} className="text-sm text-ink-700 flex gap-2">
                      <span className="text-amber-600 flex-shrink-0">✓</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 pt-4 border-t border-amber-200/60">
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
                <p className="mt-2 text-[11px] text-ink-500 text-center">
                  YouTube に移動します
                </p>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* Trending パワーストーン videos — separated from the channel
          cards above by a divider so the section is identifiable on its
          own while reusing the same visual language. */}
      <section className="mt-16">
        <div className="text-center mb-8">
          <div
            aria-hidden="true"
            className="mx-auto w-24 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mb-6"
          />
          <p className="text-amber-700 text-xs font-bold tracking-widest">
            TRENDING
          </p>
          <h2 className="mt-2 font-display text-2xl md:text-3xl font-extrabold text-ink-900">
            話題のパワーストーン動画
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-sm text-ink-700 leading-relaxed">
            パワーストーンの世界をエンタメ視点で楽しめる、SNSで話題になった動画をピックアップしました。
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {trendingVideos.map((v) => (
            <article
              key={v.videoId}
              className="rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-rose-50 overflow-hidden flex flex-col"
            >
              <div className="relative aspect-video bg-ink-900 overflow-hidden">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${v.videoId}?rel=0`}
                  title={v.title}
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                />
              </div>

              <div className="p-5 md:p-6 flex flex-col flex-1">
                <div className="text-xs font-bold text-amber-700 tracking-wider">
                  PICK UP
                </div>
                <h3 className="mt-1 font-display text-lg md:text-xl font-extrabold text-ink-900 leading-snug">
                  {v.title}
                </h3>

                <p className="mt-3 text-sm text-ink-700 leading-relaxed">
                  {v.intro}
                </p>

                <div className="mt-5 pt-4 border-t border-amber-200/60">
                  <a
                    href={v.url}
                    target="_blank"
                    rel="noopener nofollow"
                    className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-bold text-sm shadow-sm transition-colors"
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6a3 3 0 0 0-2.1 2.1C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z"/>
                    </svg>
                    YouTubeで見る
                    <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Shop intro — affiliate link to 楽天 search for ストーンマーケット.
            Tracking ID is appended from NEXT_PUBLIC_RAKUTEN_AFB the same
            way RakutenLink does it (see components/affiliate/RakutenLink.jsx).
            */}
        {(() => {
          const rawUrl = 'https://search.rakuten.co.jp/search/mall/%E3%82%B9%E3%83%88%E3%83%BC%E3%83%B3%E3%83%9E%E3%83%BC%E3%82%B1%E3%83%83%E3%83%88+%E3%83%AB%E3%83%81%E3%83%AB/';
          const afb = process.env.NEXT_PUBLIC_RAKUTEN_AFB;
          const shopUrl = afb
            ? `${rawUrl}${rawUrl.includes('?') ? '&' : '?'}scid=af_${encodeURIComponent(afb)}`
            : rawUrl;

          return (
            <aside className="mt-10 relative rounded-2xl border-2 border-amber-300 bg-gradient-to-br from-amber-50 via-white to-rose-50 p-5 md:p-6 overflow-hidden">
              {/* 太陽モチーフのアクセント */}
              <span
                aria-hidden="true"
                className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br from-amber-300/40 to-rose-300/40 blur-2xl"
              />
              <span
                aria-hidden="true"
                className="absolute top-4 right-4 text-amber-400/70"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                </svg>
              </span>

              <div className="relative">
                <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest text-amber-700">
                  <span>SHOP</span>
                  <span className="px-1.5 py-0.5 rounded bg-amber-200 text-amber-900 text-[10px]">PR</span>
                </div>
                <h3 className="mt-2 font-display text-xl md:text-2xl font-extrabold text-ink-900 leading-snug">
                  動画で紹介されたパワーストーンを探す
                </h3>
                <p className="mt-3 text-sm text-ink-700 leading-relaxed">
                  動画で話題になった「ルチルクォーツ」をはじめ、本格的なパワーストーンを取り扱う専門店「ストーンマーケット」は、全国74店舗を展開するパワーストーン・天然石の老舗ブランド。2024年にYouTuberヒカル氏が社長に就任したことでも注目を集めています。楽天市場から、ヒカル氏監修モデルや人気のルチルクォーツブレスレットなど、関連商品をチェックできます。
                </p>

                <div className="mt-5">
                  <a
                    href={shopUrl}
                    target="_blank"
                    rel="noopener sponsored nofollow"
                    className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-bold text-sm shadow-sm transition-colors"
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                      <path d="M3 3h2.5l2 11h11l2-8H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                      <circle cx="9" cy="20" r="1.4" />
                      <circle cx="18" cy="20" r="1.4" />
                    </svg>
                    楽天市場でストーンマーケット商品を見る
                    <span aria-hidden="true">→</span>
                  </a>
                  <p className="mt-2 text-[11px] text-ink-500">
                    <span className="inline-block px-1 mr-1 rounded bg-amber-200 text-amber-900 text-[10px] font-bold align-middle">PR</span>
                    楽天市場に移動します（アフィリエイトリンク）
                  </p>
                </div>
              </div>
            </aside>
          );
        })()}

        <p className="mt-6 text-xs text-ink-500 leading-relaxed">
          ※ 掲載動画は運営者が話題性・参考性の観点で紹介するものであり、各チャンネル・運営者・販売店との提携関係はありません。動画の内容や情報の正確性については各動画制作者にご確認ください。本ページにはアフィリエイトリンクを含みます。
        </p>
      </section>

      {/* How to use this page */}
      <section className="mt-12 rounded-2xl bg-white border border-amber-200 p-6">
        <h2 className="font-display text-xl font-bold text-ink-900 flex items-center gap-2">
          <span>🎬</span> 動画と記事を組み合わせるコツ
        </h2>
        <ol className="mt-4 space-y-2 text-sm text-ink-700">
          <li><strong>1. まず動画で空気感をつかむ</strong> — 神社や場所のエネルギーは、映像と語りで一気に体感できます。</li>
          <li><strong>2. 当サイトの記事で詳細を確認</strong> — 参拝順序・アクセス・おすすめの石まで、文字情報のほうが整理しやすい部分を補完。</li>
          <li><strong>3. 実際に訪れる前のチェックリスト化</strong> — 動画と記事を行き来しながら、自分のメモをまとめておくと現地での体験が深まります。</li>
        </ol>
      </section>

      {/* Related Lucky Sun Shine articles */}
      <section className="mt-12">
        <h2 className="font-display text-2xl font-bold text-ink-900 mb-4 flex items-center gap-2">
          <span>📖</span> 合わせて読みたい当サイトの記事
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {RELATED.map((r) => (
            <li key={r.href}>
              <Link
                href={r.href}
                className="block p-4 rounded-xl bg-white border border-amber-200 hover:border-amber-400 hover:shadow-sm transition-all"
              >
                <span className="text-xs text-amber-700 font-bold">記事</span>
                <span className="block mt-1 text-sm font-bold text-ink-900 leading-snug">
                  {r.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Disclaimer */}
      <section className="mt-12 text-xs text-ink-500 leading-relaxed">
        <p>
          ※ 紹介しているチャンネルは{site.publisherName}の視聴体験に基づく推薦であり、
          各チャンネルの運営者様とは資本関係・PR関係はありません。
          各チャンネル内で発信される情報の正確性・効果については、各チャンネル運営者の責任に帰属します。
        </p>
      </section>
    </article>
  );
}
