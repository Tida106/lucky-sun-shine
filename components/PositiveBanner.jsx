import Sparkles from './icons/Sparkles';
import SunMascot from './SunMascot';

// セクション間に挿入するポジティブメッセージバナー。
// パステルグラデーション背景・両端の Sparkles・濃ゴールド(#9C7A47)の Noto Serif JP メッセージで
// セクションごとに色味だけ差し替えて使う。高さ 100〜140px、上下に余白を確保。
// 左端に太陽ちゃん(80px)を配置する。

const TONES = {
  pink: 'from-pink-100 via-rose-100 to-pink-50',
  peach: 'from-orange-100 via-amber-100 to-orange-50',
  cream: 'from-amber-50 via-yellow-50 to-amber-100',
  gold: 'from-amber-200 via-amber-100 to-yellow-100',
};

export default function PositiveBanner({ message, tone = 'pink' }) {
  const gradient = TONES[tone] || TONES.pink;

  // 太陽ちゃんを absolute で左端に大きく (80 / md:96) 配置し、中央エリアには
  // [Sparkle][文字][Sparkle] を flex + justify-center で並べる「戻したい」レイアウト。
  // 太陽ちゃんは absolute、文字・Sparkles は flex の content area (pl-24 で太陽ちゃん
  // 領域を確保) に分離されているため、4 要素は絶対に重ならない。
  //
  // サイズ:
  // - 太陽ちゃん: スマホ 80px / PC 96px (目立つサイズ)
  // - 文字: スマホ text-xl (20px) / PC text-3xl (30px)
  // - Sparkles: スマホ w-4 h-4 (16px) / PC w-5 h-5 (20px)。文字に近い位置に gap-2/md:gap-3
  //
  // スマホ 1 行制約について:
  //   text-xl × 10 文字 (≒ 200px) + Sparkles + gap は太陽ちゃん absolute (pl-24 確保) の
  //   content area (約 220px @360px viewport) に Sparkles 2 つ込みでは収まらない。
  //   見切れ (overflow clip) は避けるべきため、md:whitespace-nowrap で PC のみ 1 行強制、
  //   スマホは長文 (10 文字級) のみ 2 行折り返し許容。min-h-[140px] md:min-h-[110px] で
  //   1 行短文と 2 行長文が混在しても 4 バナーが同一高さに揃う。

  return (
    <section className="my-12 md:my-16 px-4" aria-label={message}>
      <div
        className={`relative max-w-5xl mx-auto rounded-2xl bg-gradient-to-r ${gradient} shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden min-h-[140px] md:min-h-[110px]`}
      >
        {/* 太陽ちゃん：左端に大きく */}
        <div className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 pointer-events-none">
          <SunMascot size={80} className="md:!w-24 md:!h-24" alt="" />
        </div>
        <div className="flex items-center justify-center gap-2 md:gap-3 pl-24 pr-3 md:pl-28 md:pr-10 py-6 md:py-10">
          <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-amber-700 shrink-0" />
          <p
            className="font-display font-bold text-center text-xl md:text-3xl md:whitespace-nowrap leading-snug tracking-wide"
            style={{ color: '#9C7A47' }}
          >
            {message}
          </p>
          <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-amber-700 shrink-0" />
        </div>
      </div>
    </section>
  );
}
