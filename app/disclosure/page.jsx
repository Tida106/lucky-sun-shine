import { site } from '@/lib/site';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
  title: 'アフィリエイトプログラムに関する表示',
  description: `${site.name} のアフィリエイトプログラムに関する表示です。当サイトはAmazonアソシエイト・楽天アフィリエイト等のプログラムを利用し、記事内に広告（PRリンク）を含みます。`,
  alternates: { canonical: '/disclosure/' },
};

export default function DisclosurePage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12 prose-article">
      <Breadcrumbs items={[{ name: 'アフィリエイトプログラムに関する表示' }]} className="not-prose mb-6" />
      <h1 className="font-display text-3xl font-extrabold text-ink-900 not-prose">
        アフィリエイトプログラムに関する表示
      </h1>

      <p>
        {site.name}（{site.url}）は、<strong>Amazonアソシエイト・プログラム</strong>、
        <strong>楽天アフィリエイト</strong>、<strong>もしもアフィリエイト</strong>、
        <strong>A8.net</strong> など複数のアフィリエイトプログラムを利用しています。
        これにより、当サイトの記事内に掲載されているリンクの一部は、アフィリエイト広告（PRリンク）です。
      </p>
      <p>
        記事中でAmazon・楽天市場などの商品リンクや、占い・観光サービス等の紹介リンクをクリックし、
        商品の購入やサービスのお申し込みをされた場合、当サイトは紹介元の企業等から
        紹介料（アフィリエイト報酬）を受け取ることがあります。
        これによって<strong>読者の皆さまが支払う金額が高くなることはありません</strong>。
      </p>
      <p>
        当サイトでは、アフィリエイト広告を含むリンクやボタンの近くに小さく
        「PR」と表示しています。ステルスマーケティング（ステマ）とならないよう、
        広告を含む旨がわかるように配慮しています。
      </p>
      <p>
        当サイトでは、実際に良いと感じた商品・サービス、または読者の皆さまに役立つと
        判断した商品・サービスのみを紹介するよう努めています。
        得られた収益は、当サイトの運営・記事の充実のために活用させていただきます。
      </p>
      <p>
        アフィリエイトプログラムに関するご質問は、<a href="/contact/">お問い合わせフォーム</a>
        よりお気軽にご連絡ください。
      </p>
    </article>
  );
}
