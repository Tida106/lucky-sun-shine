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

  // 4バナー間でフォントサイズ・太陽ちゃん・Sparkles・高さを完全統一する。
  // 文字: スマホ text-2xl (24px) / PC text-3xl (30px)
  // 太陽ちゃん: スマホ 64px (left-3) / PC 96px (left-7)
  // Sparkles: スマホ w-5 h-5 (20px ≒ PC 比 0.71x) / PC w-7 h-7 (28px)。常に shrink-0 で
  //   絶対に消えないよう保証し「太陽ちゃん＋キラキラ＋文字＋キラキラ」の構成をスマホでも維持
  // 高さ: スマホは text-2xl × 10 文字が 360px 幅に Sparkles 込みでは収まらないため
  //   md:whitespace-nowrap (PC のみ 1 行強制) とし、スマホは折り返し許容。
  //   min-h-[140px] で長文（2 行になる）と短文（1 行）の 4 バナーを同一高さに揃える。
  //   PC は min-h-[110px] のままで自然な 1 行高さ (≒121px) を維持。

  return (
    <section className="my-12 md:my-16 px-4" aria-label={message}>
      <div
        className={`relative max-w-5xl mx-auto rounded-2xl bg-gradient-to-r ${gradient} shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden min-h-[140px] md:min-h-[110px]`}
      >
        {/* 太陽ちゃん：左端に小さく */}
        <div className="absolute left-3 md:left-7 top-1/2 -translate-y-1/2 pointer-events-none">
          <SunMascot size={64} className="md:!w-24 md:!h-24" alt="" />
        </div>
        <div className="flex items-center justify-center gap-2 md:gap-3 pl-20 pr-2 md:pl-32 md:pr-10 py-6 md:py-10">
          <Sparkles className="w-5 h-5 md:w-7 md:h-7 text-amber-700 shrink-0" />
          <p
            className="font-display font-bold text-center text-2xl md:text-3xl md:whitespace-nowrap leading-snug tracking-wide"
            style={{ color: '#9C7A47' }}
          >
            {message}
          </p>
          <Sparkles className="w-5 h-5 md:w-7 md:h-7 text-amber-700 shrink-0" />
        </div>
      </div>
    </section>
  );
}
