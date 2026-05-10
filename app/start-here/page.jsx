import Link from 'next/link';
import { categories } from '@/lib/categories';
import { author } from '@/lib/site';

export const metadata = {
  title: 'はじめての方へ｜Lucky Sun Shine の歩き方',
  description:
    'Lucky Sun Shine に初めて来た方へ。このサイトで何が学べるか、目的別のおすすめ記事、運営者からの一言を案内しています。',
  alternates: { canonical: '/start-here/' },
};

const PATHS = [
  {
    title: 'パワーストーンに興味を持った人',
    emoji: '💎',
    color: 'from-rose-100 to-amber-100 dark:from-rose-900/40 dark:to-amber-900/40',
    desc: 'まずは入門3記事から。基本→選び方→浄化の順で読むと迷いません。',
    steps: [
      { href: '/blog/powerstone-beginner-guide/',  label: '1. パワーストーン入門｜全知識' },
      { href: '/blog/powerstone-how-to-choose/',   label: '2. パワーストーンの選び方完全ガイド' },
      { href: '/blog/purification-complete-guide/', label: '3. 浄化方法 完全ガイド' },
    ],
  },
  {
    title: '具体的な悩みから石を選びたい人',
    emoji: '🎯',
    color: 'from-amber-100 to-yellow-100 dark:from-amber-900/40 dark:to-yellow-900/40',
    desc: '今の自分の願いに合う石を直接探すなら、悩み別の記事から。',
    steps: [
      { href: '/blog/love-luck-stones/',         label: '恋愛運アップに本当に効く10選' },
      { href: '/blog/money-luck-stones/',        label: '金運アップに本当に効く10選' },
      { href: '/blog/work-luck-stones/',         label: '仕事運アップに本当に効く10選' },
      { href: '/tag/%E3%81%8A%E3%81%99%E3%81%99%E3%82%81%E7%9F%B3/', label: '→ 悩み別おすすめ石（全10カテゴリ）' },
    ],
  },
  {
    title: 'パワースポットを巡りたい人',
    emoji: '⛩️',
    color: 'from-emerald-100 to-teal-100 dark:from-emerald-900/40 dark:to-teal-900/40',
    desc: '全国21箇所のパワースポットを実地レポ。アクセス・参拝順序まで掲載。',
    steps: [
      { href: '/blog/ise-jingu-power-spot/', label: '伊勢神宮の参拝ガイド' },
      { href: '/blog/izumo-taisha/',         label: '出雲大社の参拝ガイド' },
      { href: '/blog/kurama-dera/',          label: '鞍馬寺の参拝ガイド（編集長のお気に入り）' },
      { href: '/category/powerspots/',       label: '→ パワースポット 全記事' },
    ],
  },
  {
    title: '日々の暮らしを少し整えたい人',
    emoji: '🌅',
    color: 'from-sky-100 to-amber-100 dark:from-sky-900/40 dark:to-amber-900/40',
    desc: '習慣・風水・月のリズムを生活に取り入れるための記事群。',
    steps: [
      { href: '/blog/morning-routine-lucky/',     label: '運気が上がる朝の習慣7つ' },
      { href: '/blog/fengshui-powerstone-basics/', label: '風水×パワーストーンの基本' },
      { href: '/blog/moon-phases-and-stones/',    label: '月の満ち欠けとパワーストーン' },
      { href: '/category/luck-habits/',           label: '→ 運気アップ習慣 全記事' },
    ],
  },
  {
    title: '誕生石・星座・干支から選びたい人',
    emoji: '✨',
    color: 'from-purple-100 to-rose-100 dark:from-purple-900/40 dark:to-rose-900/40',
    desc: '自分の生まれと結びついた石を、月別・星座別・干支別に紹介。',
    steps: [
      { href: '/tag/%E8%AA%95%E7%94%9F%E7%9F%B3/', label: '誕生石（1〜12月）一覧' },
      { href: '/tag/%E6%98%9F%E5%BA%A7/',         label: '星座別おすすめ石（12星座）' },
      { href: '/tag/%E5%B9%B2%E6%94%AF/',         label: '干支別おすすめ石（12干支）' },
    ],
  },
];

export default function StartHerePage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      {/* Hero */}
      <header className="text-center mb-10">
        <p className="text-amber-700 dark:text-amber-300 text-xs font-bold tracking-widest">START HERE</p>
        <h1 className="mt-2 font-display text-3xl md:text-4xl font-extrabold text-ink-900 dark:text-amber-50">
          はじめての方へ
        </h1>
        <p className="mt-3 text-ink-700 dark:text-amber-100">
          Lucky Sun Shine へようこそ。<br />
          このサイトで何が学べるか、目的別のおすすめの読み方を案内します。
        </p>
      </header>

      {/* Welcome from author */}
      <section className="rounded-2xl bg-gradient-to-br from-amber-50 to-rose-50 dark:from-amber-900/40 dark:to-rose-900/40 border border-amber-200 dark:border-amber-700 p-6 flex items-start gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={author.avatar} alt={author.name} width="80" height="80" className="rounded-full bg-white shadow-sm flex-shrink-0" />
        <div>
          <div className="text-xs text-amber-700 dark:text-amber-300 font-bold tracking-widest">
            EDITOR'S NOTE
          </div>
          <p className="mt-1 text-ink-700 dark:text-amber-100 leading-relaxed">
            はじめまして、編集長の <strong>{author.name}</strong> です。<br />
            このサイトは、<strong>占いより少し実用的に、宗教より少しゆるく</strong>、
            日々の暮らしに「ちょっといい兆し」を取り入れるための情報をまとめています。
            一気に読まず、興味のあるところから少しずつ覗いてみてください。
          </p>
          <Link href="/operator/" className="mt-3 inline-block text-sm text-amber-800 dark:text-amber-300 underline">
            → 編集長プロフィールを読む
          </Link>
        </div>
      </section>

      {/* What you can learn */}
      <section className="mt-10">
        <h2 className="font-display text-2xl font-bold text-ink-900 dark:text-amber-50 mb-4">
          このサイトで学べること
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}/`}
              className={`group block rounded-2xl p-5 bg-gradient-to-br ${c.color} border border-white/60 hover:scale-[1.02] transition-transform`}
            >
              <div className="text-3xl mb-2">{c.icon}</div>
              <h3 className="font-display font-bold text-lg text-ink-900">{c.title}</h3>
              <p className="mt-1 text-xs text-ink-700 leading-relaxed">{c.tagline}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Recommended reading paths */}
      <section className="mt-12">
        <h2 className="font-display text-2xl font-bold text-ink-900 dark:text-amber-50 mb-4">
          目的別・おすすめの読み方
        </h2>
        <div className="space-y-5">
          {PATHS.map((path) => (
            <div key={path.title} className={`rounded-2xl p-5 bg-gradient-to-br ${path.color} border border-amber-200 dark:border-amber-700`}>
              <h3 className="font-display text-lg font-bold text-ink-900 dark:text-amber-50 flex items-center gap-2">
                <span className="text-2xl">{path.emoji}</span> {path.title}
              </h3>
              <p className="mt-1 text-sm text-ink-700 dark:text-amber-100">{path.desc}</p>
              <ol className="mt-3 space-y-1.5">
                {path.steps.map((s) => (
                  <li key={s.href}>
                    <Link href={s.href} className="text-sm text-amber-800 dark:text-amber-200 hover:underline">
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </section>

      {/* Tips for getting the most out of the site */}
      <section className="mt-12">
        <h2 className="font-display text-2xl font-bold text-ink-900 dark:text-amber-50 mb-4">
          このサイトの使い方のコツ
        </h2>
        <ul className="space-y-2 text-ink-700 dark:text-amber-100 text-sm">
          <li>📚 <strong>1記事を最後まで</strong>：石・スポットの記事は「使い方」「相性」「注意点」までセットで読むと判断しやすくなります。</li>
          <li>🔖 <strong>関連記事をたどる</strong>：記事末の関連記事から、同じテーマの石・場所を芋づる式に見ていけます。</li>
          <li>🔍 <strong>サイト内検索</strong>：気になる石名・地名は <Link href="/search/" className="underline">サイト内検索</Link> で一括ヒット。</li>
          <li>🌙 <strong>ダークモード</strong>：右上のアイコンで切替。寝る前の閲覧は目に優しいです。</li>
          <li>📰 <strong>更新を逃さない</strong>：<a href="/rss.xml" className="underline">RSS</a> 購読、または将来のメルマガをお待ちください。</li>
        </ul>
      </section>

      {/* Contact CTA */}
      <section className="mt-12 rounded-2xl bg-amber-100 dark:bg-amber-900/40 border border-amber-200 dark:border-amber-700 p-6 text-center">
        <h2 className="font-display text-xl font-bold text-ink-900 dark:text-amber-50">
          困ったらお気軽に
        </h2>
        <p className="mt-2 text-sm text-ink-700 dark:text-amber-100">
          「自分に合う石が分からない」「この内容、本当？」――<br />
          疑問や感想があれば、いつでもお問い合わせください。
        </p>
        <Link
          href="/contact/"
          className="mt-4 inline-block px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-bold transition-colors"
        >
          ✉️ お問い合わせフォームへ
        </Link>
      </section>
    </article>
  );
}
