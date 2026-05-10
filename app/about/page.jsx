import Link from 'next/link';
import { site } from '@/lib/site';
import { categories } from '@/lib/categories';

export const metadata = {
  title: 'このサイトについて',
  description: `${site.name} は、パワーストーン・パワースポット・開運グッズ・運気アップ習慣の総合メディアです。`,
  alternates: { canonical: '/about/' },
};

export default function AboutPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <header className="text-center mb-10">
        <p className="text-amber-700 dark:text-amber-300 text-xs font-bold tracking-widest">ABOUT</p>
        <h1 className="mt-2 font-display text-3xl md:text-4xl font-extrabold text-ink-900 dark:text-amber-50">
          このサイトについて
        </h1>
      </header>

      {/* Mission */}
      <section className="rounded-2xl bg-gradient-to-br from-amber-50 to-rose-50 dark:from-amber-900/40 dark:to-rose-900/40 border border-amber-200 dark:border-amber-700 p-6 md:p-8 text-center">
        <p className="font-display text-xl md:text-2xl font-bold text-ink-900 dark:text-amber-50 leading-relaxed">
          「占いより少し実用的に、<br />宗教より少しゆるく。」
        </p>
        <p className="mt-3 text-sm text-ink-700 dark:text-amber-100">
          毎日の暮らしに「ちょっといい兆し」を取り入れるためのメディアです。
        </p>
      </section>

      {/* Why we exist */}
      <section className="mt-10 prose-article">
        <h2>このサイトを作った理由</h2>
        <p>
          パワーストーンやパワースポットの情報サイトは数多くあります。けれど、その多くは
          「効果100%保証！」「絶対に運気が上がる！」のような<strong>過度な煽り</strong>か、
          逆に「全部プラセボ」と切り捨てる<strong>冷たい否定</strong>かのどちらかに偏りがちです。
        </p>
        <p>
          {site.name} は、そうした極端な距離感ではなく、
          <strong>「効果を断定しないけれど、確かに役立つお守りとしての価値がある」</strong>
          という中庸な立場から、パワーストーンと開運の文化を伝えていきたい――
          そんな思いから始まりました。
        </p>

        <h2>扱う4つのテーマ</h2>
      </section>

      <section className="grid sm:grid-cols-2 gap-4">
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
      </section>

      {/* Editorial principles, brief */}
      <section className="mt-10 prose-article">
        <h2>記事の3つの約束</h2>
        <ol>
          <li><strong>取材ベース</strong>：紹介する石は実際に手に取り、神社は実際に訪問してから書きます。</li>
          <li><strong>誠実な表現</strong>：効果を断定せず、「〜と言われる」を徹底。医療・金銭判断はご自身の責任で行うよう注釈を入れます。</li>
          <li><strong>更新主義</strong>：価格・情報は変動するもの。気づいたら随時更新し、更新日を明示します。</li>
        </ol>
        <p className="not-prose">
          <Link href="/editorial-policy/" className="inline-block text-amber-800 dark:text-amber-200 underline">
            → 詳しい記事作成方針はこちら
          </Link>
        </p>

        <h2>サイトの基本情報</h2>
        <ul>
          <li><strong>サイト名</strong>：{site.name}</li>
          <li><strong>URL</strong>：{site.url}</li>
          <li><strong>運営</strong>：{site.publisherName}</li>
          <li><strong>運営開始</strong>：2026年5月</li>
          <li><strong>記事カテゴリ</strong>：パワーストーン / パワースポット / 開運グッズ / 運気アップ習慣</li>
        </ul>

        <h2>もっと知りたい方へ</h2>
        <ul>
          <li><Link href="/editorial-policy/">記事作成方針</Link></li>
          <li><Link href="/privacy/">プライバシーポリシー</Link></li>
          <li><Link href="/disclaimer/">免責事項</Link></li>
          <li><Link href="/contact/">お問い合わせ</Link></li>
        </ul>
      </section>
    </article>
  );
}
