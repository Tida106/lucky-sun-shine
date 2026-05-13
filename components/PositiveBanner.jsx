import Sparkles from './icons/Sparkles';

// セクション間に挿入するポジティブメッセージバナー。
// パステルグラデーション背景・両端の Sparkles・濃ゴールド(#9C7A47)の Noto Serif JP メッセージで
// セクションごとに色味だけ差し替えて使う。高さ 100〜140px、上下に余白を確保。

const TONES = {
  pink: 'from-pink-100 via-rose-100 to-pink-50',
  peach: 'from-orange-100 via-amber-100 to-orange-50',
  cream: 'from-amber-50 via-yellow-50 to-amber-100',
  gold: 'from-amber-200 via-amber-100 to-yellow-100',
};

export default function PositiveBanner({ message, tone = 'pink' }) {
  const gradient = TONES[tone] || TONES.pink;

  return (
    <section className="my-12 md:my-16 px-4" aria-label={message}>
      <div
        className={`relative max-w-5xl mx-auto rounded-2xl bg-gradient-to-r ${gradient} shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden`}
        style={{ minHeight: '110px' }}
      >
        <div className="flex items-center justify-center gap-4 md:gap-6 px-6 py-8 md:py-10">
          <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-amber-700 shrink-0" />
          <p
            className="font-display font-bold text-center text-2xl md:text-3xl leading-snug tracking-wide"
            style={{ color: '#9C7A47' }}
          >
            {message}
          </p>
          <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-amber-700 shrink-0" />
        </div>
      </div>
    </section>
  );
}
