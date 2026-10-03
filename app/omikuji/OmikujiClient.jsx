'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SunMascot from '@/components/SunMascot';
import resultsJa from '@/data/omikuji.json';
import resultsEn from '@/data/omikuji.en.json';

const TEXT = {
  ja: {
    shareBase: 'https://lucky-sun-shine.com/omikuji/',
    title: '☀️ 太陽ちゃんのおみくじ ☀️',
    lead: '太陽ちゃんが今日のあなたに、運勢とラッキーストーンをお届けするよ💛',
    altYay: '太陽ちゃん（やったね！）',
    alt: '太陽ちゃん',
    spinning: 'くるくる…',
    draw: 'おみくじを引く！',
    luckyStone: 'ラッキーストーン：',
    again: 'もう一度引く',
    articles: '💎 パワーストーンの記事を見る',
    articlesHref: '/category/powerstones/',
    shareLead: '結果をシェアして、お友達にも運気おすそわけ☀️',
    tweet: (r) => `太陽ちゃんのおみくじ結果は【${r.fortune}】☀️ ${r.message} ラッキーストーンは ${r.stone}！`,
    shareX: 'X（Twitter）でシェア',
    shareFb: 'Facebook でシェア',
    back: '最初の画面に戻る',
  },
  en: {
    shareBase: 'https://lucky-sun-shine.com/en/omikuji/',
    title: "☀️ Sun-chan's Fortune ☀️",
    lead: "Sun-chan brings you today's fortune and your lucky stone 💛",
    altYay: 'Sun-chan (Yay!)',
    alt: 'Sun-chan',
    spinning: 'Spinning…',
    draw: 'Draw a fortune!',
    luckyStone: 'Lucky stone: ',
    again: 'Draw again',
    articles: '💎 Explore Crystals',
    articlesHref: '/en/',
    shareLead: 'Share your result and spread the good luck to your friends ☀️',
    tweet: (r) => `My fortune from Sun-chan: [${r.fortune}] ☀️ ${r.message} My lucky stone is ${r.stone}!`,
    shareX: 'Share on X (Twitter)',
    shareFb: 'Share on Facebook',
    back: 'Back to start',
  },
};

export default function OmikujiClient() {
  const pathname = usePathname() || '';
  const isEn = pathname.startsWith('/en');
  const t = isEn ? TEXT.en : TEXT.ja;
  const results = isEn ? resultsEn : resultsJa;

  const [result, setResult] = useState(null);
  const [spinning, setSpinning] = useState(false);

  const draw = () => {
    setSpinning(true);
    setResult(null);
    setTimeout(() => {
      const i = Math.floor(Math.random() * results.length);
      setResult(results[i]);
      setSpinning(false);
    }, 600);
  };

  const reset = () => {
    setResult(null);
  };

  return (
    <section className="max-w-2xl mx-auto px-4 py-12">
      <header className="text-center">
        <p className="text-amber-700 text-xs font-bold tracking-widest">OMIKUJI</p>
        <h1 className="mt-2 font-display text-3xl md:text-4xl font-extrabold text-ink-900">
          {t.title}
        </h1>
        <p className="mt-3 text-sm md:text-base text-ink-700 leading-relaxed">
          {t.lead}
        </p>
      </header>

      <div className="mt-8 flex justify-center">
        <div className="relative inline-flex items-center justify-center rounded-full bg-gradient-to-br from-amber-100 via-yellow-50 to-rose-50 p-5 md:p-7 shadow-[0_8px_30px_rgba(245,158,11,0.18)] border border-amber-200">
          <span aria-hidden="true" className="absolute -top-2 -left-2 text-2xl">✨</span>
          <span aria-hidden="true" className="absolute -bottom-2 -right-2 text-2xl">✨</span>
          <div
            className={`transition-transform duration-500 ease-out ${
              spinning ? 'animate-spin' : ''
            }`}
          >
            <SunMascot
              size={200}
              priority
              alt={result ? t.altYay : t.alt}
              src={result ? '/images/mascot-sun-yay.png' : '/images/mascot-sun.png'}
              className="md:!w-60 md:!h-60"
            />
          </div>
        </div>
      </div>

      {!result ? (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={draw}
            disabled={spinning}
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-500 text-white text-lg md:text-xl font-display font-extrabold shadow-[0_6px_24px_rgba(245,158,11,0.45)] hover:shadow-[0_8px_32px_rgba(245,158,11,0.65)] hover:scale-[1.03] active:scale-100 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <span aria-hidden="true" className="text-2xl">☀️</span>
            {spinning ? t.spinning : t.draw}
            <span aria-hidden="true" className="text-2xl">✨</span>
          </button>
        </div>
      ) : (
        <article className="mt-10 rounded-3xl bg-gradient-to-br from-amber-100 via-yellow-50 to-rose-50 border-2 border-amber-300 px-6 py-8 md:px-10 md:py-10 text-center shadow-[0_8px_30px_rgba(245,158,11,0.20)]">
          <p className="text-amber-700 text-[11px] md:text-xs font-bold tracking-widest">
            YOUR FORTUNE
          </p>
          <h2 className="mt-2 font-display text-4xl md:text-5xl font-extrabold text-amber-700 drop-shadow-[0_2px_8px_rgba(245,158,11,0.25)]">
            {result.fortune}
          </h2>
          <p className="mt-5 font-display text-base md:text-lg text-ink-900 leading-relaxed">
            {result.message}
          </p>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/80 border border-amber-300 px-5 py-2 text-sm md:text-base">
            <span aria-hidden="true">💎</span>
            <span className="text-ink-700">{t.luckyStone}</span>
            <span className="font-bold text-amber-800">{result.stone}</span>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={draw}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-amber-400 hover:bg-amber-500 text-white text-sm md:text-base font-bold shadow-sm transition-colors"
            >
              <span aria-hidden="true">🔄</span>
              {t.again}
            </button>
            <Link
              href={t.articlesHref}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white border border-amber-300 text-amber-800 hover:bg-amber-50 text-sm md:text-base font-bold transition-colors"
            >
              {t.articles}
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-amber-200">
            <p className="text-xs md:text-sm text-ink-700 mb-3">
              {t.shareLead}
            </p>
            <div className="flex flex-wrap justify-center gap-2.5">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  t.tweet(result)
                )}&url=${encodeURIComponent(t.shareBase)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-sky-500 hover:bg-sky-600 text-white text-xs md:text-sm font-bold transition-colors"
              >
                {t.shareX}
              </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  t.shareBase
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-blue-700 hover:bg-blue-800 text-white text-xs md:text-sm font-bold transition-colors"
              >
                {t.shareFb}
              </a>
            </div>
          </div>
        </article>
      )}

      {result && (
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={reset}
            className="text-xs md:text-sm text-amber-700 hover:text-amber-900 underline"
          >
            {t.back}
          </button>
        </div>
      )}
    </section>
  );
}