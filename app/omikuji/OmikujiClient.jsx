'use client';
import { useState } from 'react';
import Link from 'next/link';
import SunMascot from '@/components/SunMascot';
import results from '@/data/omikuji.json';

const SHARE_BASE = 'https://lucky-sun-shine.com/omikuji/';

function pickResult() {
  const i = Math.floor(Math.random() * results.length);
  return results[i];
}

export default function OmikujiClient() {
  const [result, setResult] = useState(null);
  const [spinning, setSpinning] = useState(false);

  const draw = () => {
    setSpinning(true);
    setResult(null);
    // 軽い演出 — 600ms ほど"くるくる"してから結果を出す
    setTimeout(() => {
      setResult(pickResult());
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
          ☀️ 太陽ちゃんのおみくじ ☀️
        </h1>
        <p className="mt-3 text-sm md:text-base text-ink-700 leading-relaxed">
          太陽ちゃんが今日のあなたに、運勢とラッキーストーンをお届けするよ💛
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
              alt={result ? '太陽ちゃん（やったね！）' : '太陽ちゃん'}
              src={result ? '/images/mascot-sun-yay.png' : '/images/mascot-sun.png'}
              className="md:!w-60 md:!h-60"
            />
          </div>
        </div>
      </div>

      {/* 結果表示 or 引くボタン */}
      {!result ? (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={draw}
            disabled={spinning}
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-500 text-white text-lg md:text-xl font-display font-extrabold shadow-[0_6px_24px_rgba(245,158,11,0.45)] hover:shadow-[0_8px_32px_rgba(245,158,11,0.65)] hover:scale-[1.03] active:scale-100 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <span aria-hidden="true" className="text-2xl">☀️</span>
            {spinning ? 'くるくる…' : 'おみくじを引く！'}
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
            <span className="text-ink-700">ラッキーストーン：</span>
            <span className="font-bold text-amber-800">{result.stone}</span>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={draw}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-amber-400 hover:bg-amber-500 text-white text-sm md:text-base font-bold shadow-sm transition-colors"
            >
              <span aria-hidden="true">🔄</span>
              もう一度引く
            </button>
            <Link
              href="/category/powerstones/"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white border border-amber-300 text-amber-800 hover:bg-amber-50 text-sm md:text-base font-bold transition-colors"
            >
              💎 パワーストーンの記事を見る
            </Link>
          </div>

          {/* シェア */}
          <div className="mt-8 pt-6 border-t border-amber-200">
            <p className="text-xs md:text-sm text-ink-700 mb-3">
              結果をシェアして、お友達にも運気おすそわけ☀️
            </p>
            <div className="flex flex-wrap justify-center gap-2.5">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  `太陽ちゃんのおみくじ結果は【${result.fortune}】☀️ ${result.message} ラッキーストーンは ${result.stone}！`
                )}&url=${encodeURIComponent(SHARE_BASE)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-sky-500 hover:bg-sky-600 text-white text-xs md:text-sm font-bold transition-colors"
              >
                X（Twitter）でシェア
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  SHARE_BASE
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-blue-700 hover:bg-blue-800 text-white text-xs md:text-sm font-bold transition-colors"
              >
                Facebook でシェア
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
            最初の画面に戻る
          </button>
        </div>
      )}
    </section>
  );
}
