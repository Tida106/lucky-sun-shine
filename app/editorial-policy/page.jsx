import Link from 'next/link';
import { site } from '@/lib/site';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
  title: '記事作成方針｜Lucky Sun Shine',
  description: 'Lucky Sun Shine の記事作成方針・取材姿勢・体験ベース執筆・更新ポリシー・広告開示について。',
  alternates: { canonical: '/editorial-policy/' },
};

export default function EditorialPolicyPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12 prose-article">
      <Breadcrumbs items={[{ name: '記事作成方針' }]} className="not-prose mb-6" />
      <header className="not-prose text-center mb-10">
        <p className="text-amber-700 text-xs font-bold tracking-widest">EDITORIAL POLICY</p>
        <h1 className="mt-2 font-display text-3xl md:text-4xl font-extrabold text-ink-900">
          記事作成方針
        </h1>
        <p className="mt-3 text-sm text-ink-700">
          {site.publisherName} が守っている記事の作り方。
        </p>
      </header>

      <h2>基本姿勢</h2>
      <p>
        Lucky Sun Shine は「<strong>占いより少し実用的に、宗教より少しゆるく</strong>」を編集方針の中心に置いています。
        パワーストーンやパワースポットを否定もせず、過度に神秘化もせず、<strong>日々の暮らしに役立つ情報</strong>として
        誠実にお届けすることを目指しています。
      </p>

      <h2>1. 取材ベース執筆</h2>
      <ul>
        <li><strong>パワーストーン記事</strong>：紹介する石は実際に編集チームが手に取り、産地違い・グレード違いを比較して書きます。鉱物専門店・ミネラルショーで触れた経験を反映しています。</li>
        <li><strong>パワースポット記事</strong>：原則として、編集チームが実際に参拝・訪問した場所のみ記事化します（一部、地域的に難しい場所は公式情報＋現地訪問者の記録を二次資料として明示）。</li>
      </ul>

      <h2>2. 一次情報の重視</h2>
      <ul>
        <li>神社・寺院の歴史・ご利益は、<strong>公式サイトと現地の由緒書き</strong>を一次資料として使用。</li>
        <li>鉱物の科学的事項（鉱物種・硬度・産地）は、<strong>鑑別書・全国宝石卸商協同組合・鉱物図鑑</strong>を参照。</li>
        <li>歴史的・文化的記述は、複数の信頼できる文献を確認のうえ記述。</li>
      </ul>

      <h2>3. 効果の表現について</h2>
      <p>
        パワーストーンの「効果」は、<strong>文化的・象徴的・伝承的な意味合い</strong>として紹介します。
        医学的・科学的・経済的な効果を保証するものではありません。
        当サイトの記事内では、必ず以下の表現を徹底しています。
      </p>
      <ul>
        <li>「〜と言われている」「〜とされる」「〜と伝えられる」</li>
        <li>断定形（「効く」「治る」「儲かる」）は使わない</li>
        <li>体調不良時は医療機関の受診を、金銭判断はご自身の責任で行うよう注釈</li>
      </ul>

      <h2>4. 公開日と更新日の明示</h2>
      <p>
        各記事の上部に <strong>公開日</strong> を、内容を改訂したときには <strong>更新日</strong> を明示しています。
        価格相場・公式サイトURL・アクセス情報など変動するデータは気づき次第更新し、その日付を記事内に反映します。
      </p>

      <h2>5. 広告・アフィリエイトの開示</h2>
      <ul>
        <li>商品紹介リンクには「<strong>PR</strong>」または「<strong>広告</strong>」を明示。</li>
        <li>Amazon・楽天・もしもアフィリエイト等のプログラムを利用しています。詳細は <Link href="/privacy/">プライバシーポリシー</Link> を参照。</li>
        <li>商品の選定は<strong>編集の判断</strong>で行い、報酬の高低で順位や紹介の有無を変えることはしません。</li>
        <li>記事は広告主の意向ではなく、<strong>読者の利益</strong>を最優先に書いています。</li>
      </ul>

      <h2>6. 訂正・撤回ポリシー</h2>
      <ul>
        <li>事実誤認・誤字脱字・古い情報のご指摘は <Link href="/contact/">お問い合わせフォーム</Link> よりお寄せください。</li>
        <li>明らかな誤りは速やかに修正し、修正日と内容を該当記事に追記します。</li>
        <li>個別の苦情・申し立てには、原則として5営業日以内に対応します。</li>
      </ul>

      <h2>7. 著作権・引用</h2>
      <ul>
        <li>当サイトの文章・画像の著作権は、当サイトまたは原権利者に帰属します。</li>
        <li>引用される場合は、引用元としてURLを明記し、引用の範囲内でお願いします。</li>
        <li>他サイトからの引用は、引用元を必ず明示し、引用の必然性を明確にして行います。</li>
      </ul>

      <h2>8. AI・自動生成について</h2>
      <p>
        記事の構成・下書きの一部に、業務効率化のため AI ツールを補助的に活用することがあります。
        ただし<strong>すべての記事は編集チームが事実確認・推敲を行ったうえで公開</strong>しています。
        AI 出力をそのまま掲載することはありません。
      </p>

      <h2>9. お問い合わせ</h2>
      <p>
        本方針へのご意見・記事内容のご指摘は、<Link href="/contact/">お問い合わせフォーム</Link> よりお気軽にどうぞ。
        いただいたご意見は、より良い記事作りに活用させていただきます。
      </p>

      <p className="not-prose mt-10 text-sm text-ink-500">
        最終改定：2026年5月10日
      </p>
    </article>
  );
}
