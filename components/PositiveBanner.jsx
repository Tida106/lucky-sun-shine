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

  // PC・スマホとも 1 行強制で 4 バナー間のフォントサイズを統一する。
  // スマホは text-base (16px)、PC は text-3xl (30px)。短文（最大 10 文字）前提のため、
  // 360px 幅でも whitespace-nowrap で折り返さず収まる。

  return (
    <section className="my-12 md:my-16 px-4" aria-label={message}>
      <div
        className={`relative max-w-5xl mx-auto rounded-2xl bg-gradient-to-r ${gradient} shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden`}
        style={{ minHeight: '110px' }}
      >
        {/* 太陽ちゃん：左端に小さく */}
        <div className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 pointer-events-none">
          <SunMascot size={64} className="md:!w-20 md:!h-20" alt="" />
        </div>
        <div className="flex items-center justify-center gap-2 md:gap-6 pl-20 pr-4 md:pl-28 md:pr-10 py-8 md:py-10">
          <Sparkles className="w-4 h-4 md:w-7 md:h-7 text-amber-700 shrink-0" />
          <p
            className="font-display font-bold text-center text-base md:text-3xl whitespace-nowrap leading-snug tracking-wide"
            style={{ color: '#9C7A47' }}
          >
            {message}
          </p>
          <Sparkles className="w-4 h-4 md:w-7 md:h-7 text-amber-700 shrink-0" />
        </div>
      </div>
    </section>
  );
}
