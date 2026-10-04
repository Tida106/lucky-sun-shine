// 電話占いデスティニー（A8.net経由）の共通CTAコンポーネント。
// パワースポット記事・九星気学診断ページなど、複数箇所から同じ
// アフィリエイトリンクを使うためここに共通化している。
const A8_LINK = 'https://px.a8.net/svt/ejp?a8mat=4BCJJV+2W6VN6+1SZG+5ZMCI';
const A8_IMPRESSION = 'https://www14.a8.net/0.gif?a8mat=4BCJJV+2W6VN6+1SZG+5ZMCI';

export default function PhoneFortuneCTA({
  lead,
  buttonText = '電話占いデスティニーで相談してみる',
  note = '今なら無料登録で最大2,450円分のお試し鑑定サービス中!!💛',
  className = '',
}) {
  return (
    <div
      className={`p-6 md:p-8 bg-amber-50 rounded-2xl border border-amber-100 flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-sm ${className}`}
    >
      <div className="flex-shrink-0 w-24">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/mascot-sun.png" alt="太陽ちゃん" className="w-full h-auto drop-shadow-sm" />
      </div>
      <div className="flex-1 text-gray-800 leading-relaxed text-sm md:text-base text-center sm:text-left">
        <p className="mb-4 font-bold whitespace-pre-line">{lead}</p>

        <div className="my-5 flex flex-wrap items-center justify-center sm:justify-start gap-2">
          <a
            href={A8_LINK}
            rel="nofollow"
            className="inline-block bg-orange-400 text-white font-bold py-3 px-6 rounded-full hover:bg-orange-500 hover:shadow-md transition-all duration-300"
          >
            {buttonText}
          </a>
          <span className="text-[10px] font-bold tracking-widest text-ink-500 bg-white border border-amber-200 rounded px-1.5 py-0.5">
            PR
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img border="0" width="1" height="1" src={A8_IMPRESSION} alt="" />
        </div>

        <p className="text-sm font-bold text-orange-600 mt-2">{note}</p>
      </div>
    </div>
  );
}
