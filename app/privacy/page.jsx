import { site } from '@/lib/site';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
  title: 'プライバシーポリシー',
  description: `${site.name} のプライバシーポリシーです。Cookie・Google Analytics・広告配信の取り扱いについて記載しています。`,
  alternates: { canonical: '/privacy/' },
};

export default function PrivacyPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12 prose-article">
      <Breadcrumbs items={[{ name: 'プライバシーポリシー' }]} className="not-prose mb-6" />
      <h1 className="font-display text-3xl font-extrabold text-ink-900 not-prose">
        プライバシーポリシー
      </h1>

      <h2>個人情報の取り扱い</h2>
      <p>
        当サイト「{site.name}」（{site.url}）は、お問い合わせフォーム等を通じて取得した個人情報を、
        ご連絡・ご返信・本人確認以外の目的で利用することはありません。
        また、ご本人の同意なく第三者に提供することはいたしません。
      </p>

      <h2>アクセス解析ツールについて</h2>
      <p>
        当サイトでは、サイトの利用状況を把握するために Google が提供するアクセス解析ツール
        「Google Analytics（GA4）」を利用する場合があります。
        この Google Analytics はトラフィックデータの収集のために Cookie を使用しています。
        このトラフィックデータは匿名で収集されており、個人を特定するものではありません。
        この機能は Cookie を無効にすることで収集を拒否することができますので、
        お使いのブラウザの設定をご確認ください。
      </p>
      <p>
        詳しくは <a href="https://marketingplatform.google.com/about/analytics/terms/jp/" rel="noopener" target="_blank">Google Analytics 利用規約</a>
        および <a href="https://policies.google.com/privacy" rel="noopener" target="_blank">Google プライバシーポリシー</a> をご覧ください。
      </p>

      <h2>広告の配信について</h2>
      <p>
        当サイトでは、第三者配信の広告サービス（Google AdSense、Amazon アソシエイト、楽天アフィリエイト等）を
        利用する場合があります。これらの広告配信事業者は、ユーザーの興味に応じた商品やサービスの広告を表示するため、
        当サイトや他サイトへのアクセスに関する情報「Cookie」（氏名・住所・メールアドレス・電話番号等は含まれません）を使用することがあります。
      </p>
      <p>
        Google による広告（Google AdSense）に使用される Cookie を無効にする方法、
        および第三者配信事業者による Cookie 使用のオプトアウトについては、
        <a href="https://policies.google.com/technologies/ads" rel="noopener" target="_blank">広告 – ポリシーと規約 – Google</a> をご覧ください。
      </p>
      <p>
        当サイトは、Amazon.co.jp を宣伝しリンクすることによってサイトが紹介料を獲得できる手段を提供することを目的に設定された
        アフィリエイトプログラムである、Amazon アソシエイト・プログラムの参加者です。
      </p>

      <h2>Cookie について</h2>
      <p>
        Cookie とは、ウェブサイトを利用したときに、ブラウザとサーバーとの間で送受信した利用履歴や入力内容などを、
        お客様のコンピュータにファイルとして保存しておく仕組みです。
        次回同じページにアクセスすると、Cookie の情報を使って、ページの運営者はお客様ごとに表示を変えることができます。
        ブラウザの設定で Cookie を無効にすることが可能です。
      </p>

      <h2>免責事項</h2>
      <p>
        当サイトの掲載情報の正確性には注意を払っていますが、内容の正確性・安全性を保証するものではありません。
        記載された情報を利用したことにより生じた不利益等について、当サイトは責任を負いかねます。
        詳細は <a href="/disclaimer/">免責事項</a> をご覧ください。
      </p>

      <h2>著作権について</h2>
      <p>
        当サイトに掲載されている文章・画像等の著作権は当サイトまたは元の権利者に帰属します。無断転載を禁じます。
      </p>

      <h2>プライバシーポリシーの変更</h2>
      <p>
        当サイトは、必要に応じて本プライバシーポリシーの内容を変更することがあります。
        変更後の内容は、本ページに掲載した時点から有効となります。
      </p>

      <h2>お問い合わせ</h2>
      <p>
        本プライバシーポリシーに関するお問い合わせは、<a href="/contact/">お問い合わせフォーム</a> よりお願いいたします。
      </p>
    </article>
  );
}
