'use client';

import { useState } from 'react';
import Link from 'next/link';
import SunMascot from '@/components/SunMascot';
import PhoneFortuneCTA from '@/components/PhoneFortuneCTA';
import { getKyuseiResult, favorableDirections, getStar } from '@/lib/kyusei';
import { STAR_THEME } from '@/lib/kyuseiTheme';

// 吉方位は「今年」固定で案内する機能。来年以降も使い続ける場合は
// この値を更新すること。
const THIS_YEAR = 2026;

const YEAR_OPTIONS = Array.from({ length: THIS_YEAR - 1920 + 1 }, (_, i) => THIS_YEAR - i);
const MONTH_OPTIONS = Array.from({ length: 12 }, (_, i) => i + 1);

function daysInMonth(year, month) {
  if (!year || !month) return 31;
  return new Date(year, month, 0).getDate();
}

export default function KyuseiClient() {
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const maxDay = daysInMonth(Number(year) || THIS_YEAR, Number(month) || 1);
  const dayOptions = Array.from({ length: maxDay }, (_, i) => i + 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!year || !month || !day) {
      setError('年・月・日をぜんぶ選んでね☀️');
      return;
    }
    const y = Number(year);
    const m = Number(month);
    const d = Number(day);
    if (d > daysInMonth(y, m)) {
      setError('その日付は実在しないみたい…もう一度確認してみてね💦');
      return;
    }
    setError('');
    const r = getKyuseiResult(y, m, d);
    const dirs = favorableDirections(r.number, THIS_YEAR);
    setResult({ ...r, dirs });
  };

  const handleReset = () => {
    setResult(null);
  };

  return (
    <section className="max-w-2xl mx-auto px-4">
      {!result ? (
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-amber-200 bg-white p-5 md:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
        >
          <div className="grid grid-cols-3 gap-3">
            <label className="block">
              <span className="block text-xs font-bold text-ink-700 mb-1">年</span>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full rounded-lg border border-amber-200 px-2 py-2 text-sm bg-white"
              >
                <option value="">選択</option>
                {YEAR_OPTIONS.map((y) => (
                  <option key={y} value={y}>
                    {y}年
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="block text-xs font-bold text-ink-700 mb-1">月</span>
              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="w-full rounded-lg border border-amber-200 px-2 py-2 text-sm bg-white"
              >
                <option value="">選択</option>
                {MONTH_OPTIONS.map((m) => (
                  <option key={m} value={m}>
                    {m}月
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="block text-xs font-bold text-ink-700 mb-1">日</span>
              <select
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className="w-full rounded-lg border border-amber-200 px-2 py-2 text-sm bg-white"
              >
                <option value="">選択</option>
                {dayOptions.map((d) => (
                  <option key={d} value={d}>
                    {d}日
                  </option>
                ))}
              </select>
            </label>
          </div>

          <p className="mt-3 text-[11px] text-ink-500 leading-relaxed">
            ※ 年の区切りは立春として、簡易的に2月4日を境にしているよ。立春の日付は年により2月3日〜5日で前後するから、あくまで目安にしてね。
          </p>

          {error && (
            <p className="mt-3 text-sm font-bold text-rose-600">{error}</p>
          )}

          <button
            type="submit"
            className="mt-5 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-500 text-white font-display font-extrabold text-base md:text-lg shadow-[0_6px_24px_rgba(245,158,11,0.45)] hover:shadow-[0_8px_32px_rgba(245,158,11,0.65)] hover:scale-[1.01] active:scale-100 transition-all"
          >
            <span aria-hidden="true">☀️</span>
            本命星を調べる
          </button>
        </form>
      ) : (
        <ResultCard result={result} onReset={handleReset} />
      )}
    </section>
  );
}

function ResultCard({ result, onReset }) {
  const { star, dirs } = result;
  const theme = STAR_THEME[star.number];
  const compatible = star.compatibleNumbers.map((n) => getStar(n));

  return (
    <div>
      <div
        id="kyusei-result-card"
        className={`rounded-3xl border-2 ${theme.ring} bg-gradient-to-br ${theme.grad} px-6 py-8 md:px-10 md:py-10 shadow-[0_8px_30px_rgba(0,0,0,0.08)]`}
      >
        <div className="flex items-center justify-center gap-3">
          <SunMascot size={56} alt="太陽ちゃん" />
          <p className="text-amber-700 text-[11px] md:text-xs font-bold tracking-widest">
            YOUR 本命星
          </p>
        </div>

        <div className="mt-4 text-center">
          <span className={`inline-block w-3 h-3 rounded-full ${theme.dot} mr-2 align-middle`} aria-hidden="true" />
          <h2 className="inline font-display text-3xl md:text-4xl font-extrabold text-ink-900">
            {star.name}
          </h2>
          <p className="mt-1 text-xs text-ink-500">{star.reading}</p>
        </div>

        <p className="mt-6 text-sm md:text-base text-ink-800 leading-relaxed">
          {star.personality}
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl bg-white/70 border border-white/80 px-4 py-3">
            <p className="text-[11px] font-bold text-ink-500 tracking-widest">ラッキーカラー</p>
            <p className="mt-1 font-bold text-ink-900">{star.colorLabel}</p>
          </div>
          <div className="rounded-xl bg-white/70 border border-white/80 px-4 py-3">
            <p className="text-[11px] font-bold text-ink-500 tracking-widest">五行</p>
            <p className="mt-1 font-bold text-ink-900">{star.element}</p>
          </div>
        </div>

        <div className="mt-4 rounded-xl bg-white/70 border border-white/80 px-4 py-3">
          <p className="text-[11px] font-bold text-ink-500 tracking-widest">相性の良い本命星</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {compatible.map((c) => (
              <a
                key={c.number}
                href={`#star-${c.number}`}
                className="text-xs font-bold px-2.5 py-1 rounded-full bg-white border border-amber-200 text-amber-800 hover:bg-amber-50"
              >
                {c.name}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-4 rounded-xl bg-white/70 border border-white/80 px-4 py-3">
          <p className="text-[11px] font-bold text-ink-500 tracking-widest">ラッキーストーン</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {star.stones.map((s) => (
              <Link prefetch={false}
                key={s.slug}
                href={`/blog/${s.slug}/`}
                className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-500 text-white hover:bg-amber-600"
              >
                💎 {s.title}
              </Link>
            ))}
          </div>
        </div>

        {dirs.length > 0 && (
          <div className="mt-4 rounded-xl bg-white/70 border border-white/80 px-4 py-3">
            <p className="text-[11px] font-bold text-ink-500 tracking-widest">{THIS_YEAR}年の吉方位</p>
            <p className="mt-2 font-bold text-ink-900">
              {dirs.map((d) => d.label).join('・')}
            </p>
            <p className="mt-1 text-[11px] text-ink-500 leading-relaxed">
              五黄殺・暗剣殺・歳破・本命殺・本命的殺を除いた、今年あなたと相性の良い方位だよ。
            </p>
            <Link prefetch={false}
              href="/blog/fengshui-direction-stones/"
              className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-amber-700 hover:underline"
            >
              方角別のおすすめパワーストーンを見る
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        )}

        <p className="mt-6 text-center text-[11px] text-ink-400">
          ☀️ Lucky Sun Shine - 九星気学 本命星診断
        </p>
      </div>

      <p className="mt-4 text-[11px] text-ink-500 text-center leading-relaxed">
        占いの結果は文化的・娯楽的なものです。進路・健康・金銭などの大事な判断は、ご自身の責任で行ってくださいね。
      </p>

      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={onReset}
          className="text-xs md:text-sm text-amber-700 hover:text-amber-900 underline"
        >
          別の生年月日で調べる
        </button>
      </div>

      <PhoneFortuneCTA
        className="mt-8"
        lead={'あなたの本命星、どうだった？☀️\nもっと詳しく自分の運勢の流れを知りたくなったら、プロの占い師さんに相談してみるのもいいかもね✨'}
        buttonText="電話占いで相談してみる"
      />
    </div>
  );
}
