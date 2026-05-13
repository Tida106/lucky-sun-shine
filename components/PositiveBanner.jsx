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

  // [キラキラ][太陽ちゃん][文字][キラキラ] の 4 要素を flex で横並び、
  // justify-center で全体をバナー中央に配置する単純構造。太陽ちゃんを
  // absolute から flex の inline 要素に変更したため、要素同士は絶対に重ならない。
  //
  // サイズ:
  // - 太陽ちゃん: スマホ 32px / PC 48px
  // - 文字: スマホ text-xl (20px) / PC text-3xl (30px)
  // - Sparkles: スマホ w-4 h-4 (16px) / PC w-5 h-5 (20px)
  // 間隔: スマホ gap-2 (8px) / PC gap-4 (16px)
  // 高さ: min-h-[110px] で 4 本同一

  return (
    <section className="my-12 md:my-16 px-4" aria-label={message}>
      <div
        className={`relative max-w-5xl mx-auto rounded-2xl bg-gradient-to-r ${gradient} shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden min-h-[110px]`}
      >
        <div className="flex items-center justify-center gap-2 md:gap-4 px-3 md:px-8 py-6 md:py-10">
          <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-amber-700 shrink-0" />
          <SunMascot size={32} className="shrink-0 md:!w-12 md:!h-12" alt="" />
          <p
            className="font-display font-bold text-center text-xl md:text-3xl whitespace-nowrap leading-snug tracking-wide"
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
