import Link from 'next/link';
import SunMascot from '@/components/SunMascot';
import { site } from '@/lib/site';

export const metadata = {
  title: '太陽ちゃんってどんな子？｜Lucky Sun Shineの公式マスコット',
  description:
    'Lucky Sun Shineの公式マスコット「太陽ちゃん」のプロフィールページ。あなたの毎日に光を届ける、お日さまの子をご紹介します☀️',
  alternates: { canonical: '/about-mascot/' },
  openGraph: {
    title: '太陽ちゃんってどんな子？｜Lucky Sun Shineの公式マスコット',
    description:
      'Lucky Sun Shineの公式マスコット「太陽ちゃん」のプロフィールページ。あなたの毎日に光を届ける、お日さまの子をご紹介します。',
    url: `${site.url}/about-mascot/`,
  },
};

const PROFILE_ROWS = [
  { label: '名前', value: '太陽ちゃん（たいようちゃん）' },
  { label: '肩書き', value: 'Lucky Sun Shineの公式マスコット' },
  { label: '出身', value: 'お日さまのおひざもと' },
  { label: '年齢', value: '永遠の太陽の子（年齢不詳）' },
  { label: '性別', value: 'ふんわり女の子っぽいけど、みんなの味方' },
];

const LIKES = [
  { icon: '✨', text: 'キラキラしたパワーストーン' },
  { icon: '🌅', text: '朝日と夕日' },
  { icon: '⛩️', text: '神社のしんとした空気' },
  { icon: '🍀', text: 'お守り・縁起物' },
  { icon: '💛', text: 'ほっこりする言葉' },
  { icon: '🍙', text: '美味しいごはん' },
];

const DISLIKES = [
  'どんより曇った気持ち',
  '自分のことを「ダメだ」と思う考え',
  '急ぎすぎる毎日',
];

const PERSONALITY = [
  '明るくて優しい',
  'ちょっとおっちょこちょい',
  'みんなの良いところを見つけるのが得意',
  '口癖は「あなたは大丈夫！」',
];

const SKILLS = [
  '落ち込んでる人を見つけたら、太陽の光を届けに行く',
  'パワーストーンとお話できる',
  '神社にいくと、神様と仲良くなれる',
];

const CTA_LINKS = [
  { href: '/category/powerstones/', label: 'パワーストーンの記事を見る', icon: '💎' },
  { href: '/category/powerspots/', label: 'パワースポットの記事を見る', icon: '⛩️' },
  { href: '/category/lucky-goods/', label: '開運グッズの記事を見る', icon: '🧧' },
  { href: '/category/luck-habits/', label: '運気アップ習慣の記事を見る', icon: '🌅' },
];

function SectionHeading({ children, eyebrow }) {
  return (
    <header className="text-center mb-6">
      {eyebrow ? (
        <p className="text-amber-700 text-xs font-bold tracking-widest">{eyebrow}</p>
      ) : null}
      <h2 className="mt-2 font-display text-2xl md:text-3xl font-bold text-ink-900">
        {children}
      </h2>
    </header>
  );
}

export default function AboutMascotPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      {/* ヘッダー画像 */}
      <header className="text-center">
        <p className="text-amber-700 text-xs font-bold tracking-widest">OFFICIAL MASCOT</p>
        <h1 className="mt-2 font-display text-3xl md:text-4xl font-extrabold text-ink-900">
          ☀️ 太陽ちゃんってどんな子？ ☀️
        </h1>
        <div className="mt-6 flex justify-center">
          <div className="relative inline-flex items-center justify-center rounded-full bg-gradient-to-br from-amber-100 via-yellow-50 to-rose-50 p-4 md:p-6 shadow-[0_8px_30px_rgba(245,158,11,0.18)] border border-amber-200">
            <span className="absolute -top-2 -left-2 text-2xl">✨</span>
            <span className="absolute -bottom-2 -right-2 text-2xl">✨</span>
            <SunMascot
              size={240}
              priority
              alt="太陽ちゃん — Lucky Sun Shine の公式マスコット"
              className="md:!w-72 md:!h-72"
            />
          </div>
        </div>
      </header>

      {/* 注意書き */}
      <p className="mt-8 mx-auto max-w-xl text-center text-xs md:text-sm text-ink-700 leading-relaxed rounded-xl border border-amber-200/80 bg-amber-50/70 px-4 py-3">
        ☀️ 太陽ちゃんは {site.name} の公式マスコットキャラクターです。記事は運営チームが執筆しています。
      </p>

      {/* ご挨拶 */}
      <section className="mt-12 rounded-2xl bg-gradient-to-br from-amber-50 to-rose-50 border border-amber-200 p-6 md:p-8 text-center">
        <p className="text-amber-700 text-xs font-bold tracking-widest">GREETING</p>
        <h2 className="mt-2 font-display text-2xl md:text-3xl font-bold text-ink-900">
          はじめまして！
        </h2>
        <p className="mt-4 text-base md:text-lg text-ink-800 leading-relaxed">
          こんにちは！ {site.name} のマスコット、太陽ちゃんです☀️
          <br />
          このサイトに来てくれてありがとう！
          <br />
          あなたの毎日に、ちょっとだけお日さまの光をお届けできたらうれしいな。
        </p>
      </section>

      {/* プロフィール表 */}
      <section className="mt-14">
        <SectionHeading eyebrow="PROFILE">プロフィール</SectionHeading>
        <div className="rounded-2xl bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 border border-amber-300 shadow-[0_4px_20px_rgba(0,0,0,0.04)] overflow-hidden">
          <dl className="divide-y divide-amber-200/70">
            {PROFILE_ROWS.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-1 sm:grid-cols-[10rem_1fr] gap-1 sm:gap-4 px-5 py-4"
              >
                <dt className="text-sm font-bold text-amber-800 flex items-center gap-1.5">
                  <span aria-hidden="true">☀️</span>
                  {row.label}
                </dt>
                <dd className="text-sm md:text-base text-ink-900 leading-relaxed">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 好きなもの */}
      <section className="mt-14">
        <SectionHeading eyebrow="LIKES">好きなもの</SectionHeading>
        <ul className="grid sm:grid-cols-2 gap-3">
          {LIKES.map((item) => (
            <li
              key={item.text}
              className="flex items-center gap-3 rounded-xl bg-gradient-to-br from-rose-50 to-amber-50 border border-amber-200 px-4 py-3 text-sm md:text-base text-ink-900"
            >
              <span className="text-xl shrink-0" aria-hidden="true">{item.icon}</span>
              <span className="leading-snug">{item.text}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 苦手なもの */}
      <section className="mt-14">
        <SectionHeading eyebrow="DISLIKES">苦手なもの</SectionHeading>
        <ul className="rounded-2xl bg-gradient-to-br from-sky-50 to-indigo-50 border border-sky-200 p-5 md:p-6 space-y-2">
          {DISLIKES.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 text-sm md:text-base text-ink-800"
            >
              <span className="text-amber-600 mt-0.5" aria-hidden="true">☁︎</span>
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 性格 */}
      <section className="mt-14">
        <SectionHeading eyebrow="PERSONALITY">性格</SectionHeading>
        <ul className="grid sm:grid-cols-2 gap-3">
          {PERSONALITY.map((item) => (
            <li
              key={item}
              className="rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200 px-4 py-3 text-sm md:text-base text-ink-900 leading-snug"
            >
              <span className="mr-2 text-amber-600" aria-hidden="true">✨</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* 特技 */}
      <section className="mt-14">
        <SectionHeading eyebrow="SPECIAL SKILLS">特技</SectionHeading>
        <ul className="space-y-3">
          {SKILLS.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 rounded-xl bg-gradient-to-br from-emerald-50 via-amber-50 to-rose-50 border border-amber-200 px-5 py-4 text-sm md:text-base text-ink-900 leading-relaxed"
            >
              <span className="text-2xl shrink-0" aria-hidden="true">☀️</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 使命 */}
      <section className="mt-14">
        <div className="rounded-2xl bg-gradient-to-br from-amber-100 via-yellow-50 to-rose-50 border-2 border-amber-300 p-6 md:p-8 text-center shadow-[0_4px_20px_rgba(245,158,11,0.12)]">
          <p className="text-amber-700 text-xs font-bold tracking-widest">PROMISE</p>
          <h2 className="mt-2 font-display text-2xl md:text-3xl font-bold text-ink-900">
            ✨ 太陽ちゃんからのお約束 ✨
          </h2>
          <p className="mt-5 text-base md:text-lg text-ink-800 leading-relaxed">
            読者一人ひとりの毎日が、太陽のように明るくなりますように。
            <br />
            このサイトで、開運のヒントをたくさんお届けします☀️
            <br />
            あなたは絶対大丈夫！ いつも応援してるよ💛
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="mt-16">
        <SectionHeading eyebrow="READ MORE">
          もっと運気を上げたい人はこちらから！
        </SectionHeading>
        <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
          {CTA_LINKS.map((cta) => (
            <Link
              key={cta.href}
              href={cta.href}
              className="group flex items-center justify-between gap-3 rounded-2xl bg-gradient-to-br from-amber-50 to-rose-50 border border-amber-300 px-5 py-4 hover:scale-[1.02] hover:shadow-[0_6px_20px_rgba(245,158,11,0.18)] transition-all"
            >
              <span className="flex items-center gap-3">
                <span className="text-2xl" aria-hidden="true">{cta.icon}</span>
                <span className="font-bold text-ink-900 text-sm md:text-base">
                  {cta.label}
                </span>
              </span>
              <span
                aria-hidden="true"
                className="text-amber-700 group-hover:translate-x-1 transition-transform"
              >
                →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
