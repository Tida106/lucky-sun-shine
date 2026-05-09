import { site } from '@/lib/site';

export const metadata = {
  title: '運営者情報',
  description: `${site.name} の運営者情報・編集方針・コンタクト先を掲載しています。`,
  alternates: { canonical: '/operator/' },
};

export default function OperatorPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12 prose-article">
      <h1 className="font-display text-3xl font-extrabold text-ink-900 not-prose">運営者情報</h1>

      <h2>サイト名</h2>
      <p>{site.name}（{site.url}）</p>

      <h2>運営者</h2>
      <p>{site.author}</p>

      <h2>サイト概要</h2>
      <p>
        パワーストーン・パワースポット・開運グッズ・運気アップ習慣の4カテゴリを軸に、
        日々の暮らしに「ちょっといい兆し」を取り入れるための情報を発信する総合メディアです。
      </p>

      <h2>編集方針</h2>
      <ul>
        <li>科学的・歴史的な背景を踏まえつつ、誰にでも実践しやすい形で紹介します。</li>
        <li>断定的な効果の保証は行いません。最終判断は読者ご自身でお願いします。</li>
        <li>記事は事実関係を確認のうえ公開し、必要に応じて随時更新します。</li>
        <li>商品紹介には Amazon・楽天等のアフィリエイトリンクが含まれる場合があります。</li>
      </ul>

      <h2>記事の作成プロセス</h2>
      <ul>
        <li>各カテゴリの専門書籍・公式情報・複数の信頼できる一次資料に基づいて執筆しています。</li>
        <li>科学的根拠がない事項については「〜と言われる／〜とされる」と明示しています。</li>
        <li>体験談やレビューは個人の感想であり、効果を保証するものではありません。</li>
      </ul>

      <h2>お問い合わせ</h2>
      <p>
        記事内容のご指摘・取材依頼・広告掲載に関するお問い合わせは
        <a href="/contact/">お問い合わせフォーム</a> よりお願いいたします。
      </p>

      <h2>運営開始</h2>
      <p>2026年5月</p>
    </article>
  );
}
