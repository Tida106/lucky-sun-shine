'use client';
import { useEffect, useState } from 'react';
import SunMascot from './SunMascot';
import messages from '@/data/daily-messages.json';

// 太陽ちゃんからの今日のひとこと。
// クライアント側で初回マウント時にランダムなメッセージを選ぶため
// SSR 出力はプレースホルダー（不可視 nbsp）にして hydration mismatch を回避し、
// 表示時に opacity の fade-in でふわっと出す。
export default function DailyMessage() {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const i = Math.floor(Math.random() * messages.length);
    setMessage(messages[i] || messages[0]);
  }, []);

  return (
    <section className="max-w-3xl mx-auto px-4 pt-10 pb-4">
      <div className="relative rounded-3xl bg-gradient-to-br from-amber-50 via-rose-50 to-yellow-50 border-2 border-amber-300 px-6 py-7 md:px-10 md:py-9 text-center shadow-[0_6px_24px_rgba(245,158,11,0.12)] overflow-hidden">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-4 -left-4 text-3xl opacity-60"
        >
          ✨
        </span>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-4 -right-4 text-3xl opacity-60"
        >
          ✨
        </span>
        <div className="flex justify-center">
          <SunMascot
            size={120}
            src="/images/mascot-sun-believe.png"
            className="drop-shadow-[0_4px_12px_rgba(245,158,11,0.25)]"
            alt="太陽ちゃん（I BELIEVE U!）"
          />
        </div>
        <p className="mt-4 text-amber-700 text-[11px] md:text-xs font-bold tracking-widest">
          DAILY MESSAGE
        </p>
        <h2 className="mt-1 font-display text-lg md:text-2xl font-extrabold text-ink-900">
          太陽ちゃんからの今日のひとこと💛
        </h2>
        <p
          className={`mt-4 min-h-[2.5em] font-display text-base md:text-xl text-ink-900 leading-relaxed transition-opacity duration-700 ease-out ${
            message ? 'opacity-100' : 'opacity-0'
          }`}
          aria-live="polite"
        >
          {message || ' '}
        </p>
      </div>
    </section>
  );
}
