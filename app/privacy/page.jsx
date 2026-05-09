import { site } from '@/lib/site';

export const metadata = {
  title: 'プライバシーポリシー',
  description: `${site.name} のプライバシーポリシーです。`,
};

export default function PrivacyPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12 prose-article">
      <h1 className="font-display text-3xl font-extrabold text-ink-900">プライバシーポリシー</h1>
      <h2>個人情報の取り扱い</h2>
      <p>
        当サイト「{site.name}」は、お問い合わせフォーム等を通じて取得した個人情報を、
        ご連絡・ご返信・本人確認以外の目的で利用することはありません。
      </p>
      <h2>アクセス解析ツール</h2>
      <p>
        当サイトでは Google Analytics を利用してアクセス情報を取得する場合があります。
        Cookie によって取得される情報には個人を特定する情報は含まれません。
      </p>
      <h2>広告の配信について</h2>
      <p>
        当サイトでは Amazon アソシエイト・楽天アフィリエイト等の第三者配信の広告サービスを利用する場合があります。
        これらの広告配信事業者は、ユーザーの興味に応じた商品やサービスの広告を表示するため、
        Cookie を使用することがあります。
      </p>
      <h2>免責事項</h2>
      <p>
        当サイトの掲載情報の正確性には注意を払っていますが、内容の正確性・安全性を保証するものではありません。
        記載された情報を利用したことにより生じた不利益等について、当サイトは責任を負いかねます。
      </p>
      <h2>著作権について</h2>
      <p>
        当サイトに掲載されている文章・画像等の著作権は当サイトまたは元の権利者に帰属します。無断転載を禁じます。
      </p>
    </article>
  );
}
