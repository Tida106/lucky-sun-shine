'use client';
// Surfaced when a server-rendered or client component throws.
// Static export still serves this for the recovery flow.
import { useEffect } from 'react';
import Link from 'next/link';

export default function ErrorBoundary({ error, reset }) {
  useEffect(() => {
    // Log to whatever error sink is hooked up; no-op when nothing is.
    if (typeof window !== 'undefined' && window.console) {
      console.error('App error:', error);
    }
  }, [error]);

  return (
    <section className="max-w-xl mx-auto px-4 py-16 text-center">
      <p className="text-rose-600 text-xs font-bold tracking-widest">ERROR</p>
      <h1 className="mt-3 font-display text-3xl font-extrabold text-ink-900">
        申し訳ありません — エラーが発生しました
      </h1>
      <p className="mt-3 text-ink-700 leading-relaxed">
        ページの読み込み中に問題が発生しました。再度お試しください。
        繰り返し発生する場合は、<Link href="/contact/" className="underline hover:text-amber-700">お問い合わせ</Link>からご連絡ください。
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-bold transition-colors"
        >
          再試行
        </button>
        <Link
          href="/"
          className="px-5 py-2.5 rounded-full bg-white border border-amber-200 hover:bg-amber-50 font-bold"
        >
          トップへ戻る
        </Link>
      </div>
    </section>
  );
}
