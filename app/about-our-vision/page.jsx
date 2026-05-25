import Link from 'next/link';
import { site } from '@/lib/site';
import SunMascot from '@/components/SunMascot';
import Sparkles from '@/components/icons/Sparkles';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
  title: 'Lucky Sun Shineの想い',
  description:
    'なぜ Lucky Sun Shine を立ち上げたのか、読者の方にどうなってほしいか、サイトに込めた哲学を綴ったページです。',
  alternates: { canonical: '/about-our-vision/' },
  openGraph: {
    type: 'article',
    title: `Lucky Sun Shineの想い | ${site.name}`,
    description:
      'なぜ Lucky Sun Shine を立ち上げたのか、読者の方にどうなってほしいか、サイトに込めた哲学を綴ったページです。',
    url: `${site.url}/about-our-vision/`,
  },
};

export default function AboutOurVisionPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <Breadcrumbs items={[{ name: 'Lucky Sun Shineの想い' }]} className="mb-6" />

      <header className="text-center mb-10">
        <p className="inline-flex items-center justify-center gap-2 text-amber-700 text-xs font-bold tracking-widest">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>OUR VISION</span>
          <Sparkles className="w-4 h-4 text-amber-600" />
        </p>
        <h1 className="mt-2 font-display text-3xl md:text-4xl font-extrabold text-ink-900 leading-tight">
          Lucky Sun Shineの想い
        </h1>
        <p className="mt-4 max-w-xl mx-auto text-sm md:text-base text-ink-700 leading-relaxed">
          このサイトをなぜ作ったのか、読んでくれているあなたにどうなってほしいか。
          ここでは、Lucky Sun Shine の根っこにある気持ちを正直に書きました。
        </p>
      </header>

      {/* Why */}
      <section className="rounded-2xl bg-gradient-to-br from-amber-50 via-white to-rose-50 border border-amber-200 p-6 md:p-8">
        <div className="flex items-start gap-4 md:gap-6">
          <SunMascot size={88} className="shrink-0 md:!w-28 md:!h-28" alt="" priority />
          <div className="min-w-0">
            <p className="text-amber-700 text-[11px] font-bold tracking-widest">WHY</p>
            <h2 className="mt-1 font-display text-xl md:text-2xl font-extrabold text-ink-900 leading-snug">
              誰もが太陽のように、明るく毎日を過ごせるように。
            </h2>
            <p className="mt-3 text-sm md:text-base text-ink-700 leading-relaxed">
              世の中には、運気を「あおる」情報や、逆に「ぜんぶ気のせい」と切り捨てる情報があふれています。
              でも本当に必要なのは、その間で<strong>そっと背中を押してくれる存在</strong>ではないかと考えました。
              開運やパワーストーンは、上手に付き合えば暮らしの太陽になります。
              Lucky Sun Shine は、その太陽をすこしずつあなたの日常に届ける場所として始まりました。
            </p>
          </div>
        </div>
      </section>

      {/* For */}
      <section className="mt-10 prose-article">
        <h2>読んでくれているあなたへ</h2>
        <p>
          このサイトを訪れてくれたあなたが、記事を読んだあとに
          <strong>「自分にもいいところがあるかも」「明日はもう少し動いてみよう」</strong>
          ――そんなふうに、自分の魅力にちいさく気づいてくれたら、それが私たちの一番の願いです。
        </p>
        <p>
          パワーストーンや神社、運気アップ習慣は、あなたの毎日を魔法のように変えるものではありません。
          けれど、「自分は大丈夫」と思い直すきっかけや、もう一歩だけ進む勇気をくれる
          <strong>お守りのような存在</strong>にはなれると信じています。
        </p>

        <h2>サイトに流れる3つの哲学</h2>
        <ol>
          <li>
            <strong>あなたは、存在しているだけで価値がある。</strong>
            <br />
            何かを達成していなくても、誰かに認められていなくても、それは変わりません。
          </li>
          <li>
            <strong>あなたには、絶対魅力がある。</strong>
            <br />
            気づいているかどうかの違いだけ。気づくためのヒントを、ここに集めます。
          </li>
          <li>
            <strong>あなたは、絶対運がいい。</strong>
            <br />
            運は「気分」と地続きです。気分が上がれば、運気も自然に上がっていきます。
          </li>
        </ol>

        <h2>このサイトでやること、やらないこと</h2>
        <ul>
          <li><strong>やること</strong>：開運の歴史や言い伝えを丁寧に紹介し、暮らしに取り入れやすい形に整えてお届けすること。</li>
          <li><strong>やること</strong>：効果を断定せず「〜と言われています」を徹底し、選ぶ判断はあなたに残すこと。</li>
          <li><strong>やらないこと</strong>：「これを買えば絶対に運気が上がる」のような過度な煽り。</li>
          <li><strong>やらないこと</strong>：医療・金銭判断の代わりになるような断定的なアドバイス。</li>
        </ul>

        <h2>最後に</h2>
        <p>
          うまくいかない日も、なんでもない日も、お日さまはちゃんとあなたを見ています。
          ふと立ち寄ったときに、ほんの少しでも前を向ける――
          そんな場所として、Lucky Sun Shine をこれからも丁寧に育てていきます。
        </p>
        <p className="not-prose mt-6 text-sm text-ink-500">
          ※ このページには編集長個人のプロフィールは掲載していません。
          サイトの想いそのものを、{site.publisherName} としてお伝えしています。
        </p>
      </section>

      {/* CTA */}
      <section className="mt-12 grid gap-4 sm:grid-cols-2">
        <Link
          href="/about/"
          className="block rounded-2xl border border-amber-200 bg-white p-5 hover:bg-amber-50 transition-colors"
        >
          <div className="text-[11px] font-bold tracking-widest text-amber-700">ABOUT</div>
          <div className="mt-1 font-display text-base font-bold text-ink-900">
            このサイトについて（運営情報）
          </div>
          <p className="mt-1 text-xs text-ink-700">
            サイトの基本情報・扱う4つのテーマ・記事の約束ごとはこちら。
          </p>
        </Link>
        <Link
          href="/editorial-policy/"
          className="block rounded-2xl border border-amber-200 bg-white p-5 hover:bg-amber-50 transition-colors"
        >
          <div className="text-[11px] font-bold tracking-widest text-amber-700">POLICY</div>
          <div className="mt-1 font-display text-base font-bold text-ink-900">
            記事作成方針
          </div>
          <p className="mt-1 text-xs text-ink-700">
            効果断定を避ける表現ルール、参考にする一次資料、更新の考え方など。
          </p>
        </Link>
      </section>
    </article>
  );
}
