'use client';

import { useState } from 'react';
import Link from 'next/link';
import SunMascot from '@/components/SunMascot';
import { honmeiseiNumber, favorableDirections } from '@/lib/kyusei';
import { getStarEn, DIRECTION_LABEL_EN } from '@/lib/kyusei.en';
import { STAR_THEME } from '@/lib/kyuseiTheme';

// Favorable directions are calculated for a fixed year. Update this value
// each year the tool is kept up to date.
const THIS_YEAR = 2026;

const YEAR_OPTIONS = Array.from({ length: THIS_YEAR - 1920 + 1 }, (_, i) => THIS_YEAR - i);
const MONTH_OPTIONS = Array.from({ length: 12 }, (_, i) => i + 1);
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function daysInMonth(year, month) {
  if (!year || !month) return 31;
  return new Date(year, month, 0).getDate();
}

export default function KyuseiClientEn() {
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
      setError('Please choose a year, month, and day ☀️');
      return;
    }
    const y = Number(year);
    const m = Number(month);
    const d = Number(day);
    if (d > daysInMonth(y, m)) {
      setError("That date doesn't seem to exist — please double-check it 💦");
      return;
    }
    setError('');
    const number = honmeiseiNumber(y, m, d);
    const star = getStarEn(number);
    const dirs = favorableDirections(number, THIS_YEAR);
    setResult({ number, star, dirs });
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
              <span className="block text-xs font-bold text-ink-700 mb-1">Year</span>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full rounded-lg border border-amber-200 px-2 py-2 text-sm bg-white"
              >
                <option value="">Select</option>
                {YEAR_OPTIONS.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="block text-xs font-bold text-ink-700 mb-1">Month</span>
              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="w-full rounded-lg border border-amber-200 px-2 py-2 text-sm bg-white"
              >
                <option value="">Select</option>
                {MONTH_OPTIONS.map((m) => (
                  <option key={m} value={m}>
                    {MONTH_NAMES[m - 1]}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="block text-xs font-bold text-ink-700 mb-1">Day</span>
              <select
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className="w-full rounded-lg border border-amber-200 px-2 py-2 text-sm bg-white"
              >
                <option value="">Select</option>
                {dayOptions.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <p className="mt-3 text-[11px] text-ink-500 leading-relaxed">
            ※ The year boundary follows Risshun (the traditional start of spring, around February 4), simplified here to February 4th. The exact date of Risshun shifts between February 3–5 depending on the year, so treat this as a close approximation.
          </p>

          {error && (
            <p className="mt-3 text-sm font-bold text-rose-600">{error}</p>
          )}

          <button
            type="submit"
            className="mt-5 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-500 text-white font-display font-extrabold text-base md:text-lg shadow-[0_6px_24px_rgba(245,158,11,0.45)] hover:shadow-[0_8px_32px_rgba(245,158,11,0.65)] hover:scale-[1.01] active:scale-100 transition-all"
          >
            <span aria-hidden="true">☀️</span>
            Find My Main Star
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
  const compatible = star.compatibleNumbers.map((n) => getStarEn(n));

  return (
    <div>
      <div
        id="kyusei-result-card"
        className={`rounded-3xl border-2 ${theme.ring} bg-gradient-to-br ${theme.grad} px-6 py-8 md:px-10 md:py-10 shadow-[0_8px_30px_rgba(0,0,0,0.08)]`}
      >
        <div className="flex items-center justify-center gap-3">
          <SunMascot size={56} alt="Sun-chan" />
          <p className="text-amber-700 text-[11px] md:text-xs font-bold tracking-widest">
            YOUR MAIN STAR
          </p>
        </div>

        <div className="mt-4 text-center">
          <span className={`inline-block w-3 h-3 rounded-full ${theme.dot} mr-2 align-middle`} aria-hidden="true" />
          <h2 className="inline font-display text-2xl md:text-3xl font-extrabold text-ink-900">
            {star.name}
          </h2>
          <p className="mt-1 text-xs text-ink-500">{star.reading}</p>
        </div>

        <p className="mt-6 text-sm md:text-base text-ink-800 leading-relaxed">
          {star.personality}
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl bg-white/70 border border-white/80 px-4 py-3">
            <p className="text-[11px] font-bold text-ink-500 tracking-widest">LUCKY COLOR</p>
            <p className="mt-1 font-bold text-ink-900">{star.colorLabel}</p>
          </div>
          <div className="rounded-xl bg-white/70 border border-white/80 px-4 py-3">
            <p className="text-[11px] font-bold text-ink-500 tracking-widest">ELEMENT</p>
            <p className="mt-1 font-bold text-ink-900">{star.element}</p>
          </div>
        </div>

        <div className="mt-4 rounded-xl bg-white/70 border border-white/80 px-4 py-3">
          <p className="text-[11px] font-bold text-ink-500 tracking-widest">COMPATIBLE MAIN STARS</p>
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
          <p className="text-[11px] font-bold text-ink-500 tracking-widest">LUCKY CRYSTALS</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {star.stones.map((s) => (
              <Link prefetch={false}
                key={s.slug}
                href={`/en/blog/${s.slug}/`}
                className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-500 text-white hover:bg-amber-600"
              >
                💎 {s.title}
              </Link>
            ))}
          </div>
        </div>

        {dirs.length > 0 && (
          <div className="mt-4 rounded-xl bg-white/70 border border-white/80 px-4 py-3">
            <p className="text-[11px] font-bold text-ink-500 tracking-widest">
              LUCKY DIRECTIONS FOR {THIS_YEAR}
            </p>
            <p className="mt-2 font-bold text-ink-900">
              {dirs.map((d) => DIRECTION_LABEL_EN[d.key]).join(' / ')}
            </p>
            <p className="mt-1 text-[11px] text-ink-500 leading-relaxed">
              These are the directions that favor you this year, after excluding Gohō-satsu, Ken-satsu, Saiha, Honmei-satsu, and Honmeiteki-satsu.
            </p>
            <Link prefetch={false}
              href="/en/blog/fengshui-direction-stones/"
              className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-amber-700 hover:underline"
            >
              See recommended crystals by direction
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        )}

        <p className="mt-6 text-center text-[11px] text-ink-400">
          ☀️ Lucky Sun Shine - Nine Star Ki Main Star Calculator
        </p>
      </div>

      <p className="mt-4 text-[11px] text-ink-500 text-center leading-relaxed">
        This reading is offered for cultural and entertainment purposes. Please use your own judgment for important decisions about your career, health, or finances.
      </p>

      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={onReset}
          className="text-xs md:text-sm text-amber-700 hover:text-amber-900 underline"
        >
          Try another birth date
        </button>
      </div>
    </div>
  );
}
