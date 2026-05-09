import { site } from '@/lib/site';
import { categories } from '@/lib/categories';

export const metadata = {
  title: 'このサイトについて',
  description: `${site.name} は、パワーストーン・パワースポット・開運グッズ・運気アップ習慣を扱う総合メディアです。`,
};

export default function AboutPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="font-display text-3xl font-extrabold text-ink-900">このサイトについて</h1>
      <p className="mt-6 text-ink-700 leading-relaxed">
        <strong>{site.name}</strong> は、毎日をすこしだけ明るくする「開運」をテーマにした総合メディアです。
        パワーストーンの意味、全国のパワースポット、暮らしに取り入れたい開運グッズ、そして今日から始められる運気アップ習慣まで、
        実用的でわかりやすい情報をお届けしています。
      </p>

      <h2 className="font-display text-2xl font-bold mt-10 mb-3">扱うテーマ</h2>
      <ul className="space-y-2">
        {categories.map((c) => (
          <li key={c.slug} className="flex gap-3">
            <span className="text-2xl">{c.icon}</span>
            <div>
              <div className="font-bold">{c.title}</div>
              <div className="text-sm text-ink-700">{c.tagline}</div>
            </div>
          </li>
        ))}
      </ul>

      <h2 className="font-display text-2xl font-bold mt-10 mb-3">編集方針</h2>
      <ul className="list-disc pl-6 space-y-1 text-ink-700">
        <li>科学的・歴史的な背景を踏まえつつ、誰にでも実践しやすい形で紹介します。</li>
        <li>断定的な効果の保証は行いません。最終判断は読者ご自身でお願いします。</li>
        <li>商品紹介には Amazon・楽天等のアフィリエイトリンクが含まれる場合があります。</li>
      </ul>

      <h2 className="font-display text-2xl font-bold mt-10 mb-3">運営</h2>
      <p className="text-ink-700">{site.author}</p>
    </article>
  );
}
