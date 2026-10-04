// 本命星(1〜9)ごとの結果カード配色。ja/en 両方のクライアント
// コンポーネントで共通利用し、見た目がロケール間でずれないようにする。
export const STAR_THEME = {
  1: { grad: 'from-sky-50 via-white to-slate-50', ring: 'border-sky-300', dot: 'bg-slate-200 border border-slate-400' },
  2: { grad: 'from-stone-100 via-stone-50 to-stone-200', ring: 'border-stone-400', dot: 'bg-stone-800' },
  3: { grad: 'from-teal-50 via-emerald-50 to-teal-100', ring: 'border-teal-300', dot: 'bg-teal-500' },
  4: { grad: 'from-green-50 via-lime-50 to-green-100', ring: 'border-green-300', dot: 'bg-green-500' },
  5: { grad: 'from-yellow-50 via-amber-50 to-yellow-100', ring: 'border-yellow-300', dot: 'bg-yellow-400' },
  6: { grad: 'from-slate-50 via-white to-zinc-100', ring: 'border-zinc-300', dot: 'bg-zinc-100 border border-zinc-400' },
  7: { grad: 'from-red-50 via-rose-50 to-red-100', ring: 'border-red-300', dot: 'bg-red-500' },
  8: { grad: 'from-amber-50 via-orange-50 to-amber-100', ring: 'border-amber-300', dot: 'bg-amber-100 border border-amber-400' },
  9: { grad: 'from-purple-50 via-violet-50 to-purple-100', ring: 'border-purple-300', dot: 'bg-purple-600' },
};
