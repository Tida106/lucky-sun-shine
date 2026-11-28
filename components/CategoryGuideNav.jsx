import Link from 'next/link';
import { getPostBySlug } from '@/lib/posts';

// カテゴリページ冒頭の「選ぶための入口」。ハブ記事(lib/hubs.js)と定番記事へ誘導する。
// 対象はパワーストーン / パワースポットのみ(記事数が多いカテゴリ)。
const NAV = {
  powerstones: {
    heading: '💎 あなたに合う石から選ぶ',
    border: 'border-rose-300',
    headColor: 'text-rose-700',
    chip: 'bg-rose-50 text-rose-700 hover:bg-rose-100',
    groups: [
      {
        items: [
          ['🎂 誕生石（12ヶ月）', 'birthstone-guide'],
          ['⭐ 星座（12星座）', 'zodiac-powerstones-guide'],
          ['🐯 干支（十二支）', 'eto-powerstones-guide'],
          ['🎯 願い事別', 'luck-powerstones-complete-guide'],
        ],
      },
    ],
    start: ['powerstone-beginner-guide', 'birthstone-guide', 'fake-stone-identification'],
  },
  powerspots: {
    heading: '⛩️ 目的から選ぶ',
    border: 'border-emerald-300',
    headColor: 'text-emerald-700',
    chip: 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100',
    groups: [
      {
        items: [
          ['💕 縁結び', 'shrine-enmusubi-guide'],
          ['💰 金運アップ', 'shrine-kinun-guide'],
          ['📚 学業成就', 'shrine-gakugyo-guide'],
        ],
      },
      {
        heading: '🗾 エリアから選ぶ',
        chip: 'bg-amber-50 text-amber-800 hover:bg-amber-100',
        items: [
          ['関東', 'shrine-kanto-guide'],
          ['関西', 'shrine-kansai-guide'],
          ['中部', 'shrine-chubu-guide'],
          ['九州・沖縄', 'shrine-kyushu-guide'],
        ],
      },
    ],
    start: ['ise-jingu-power-spot', 'izumo-taisha', 'meiji-jingu'],
  },
};

const shortTitle = (t) => t.split('｜')[0];

export default function CategoryGuideNav({ slug }) {
  const nav = NAV[slug];
  if (!nav) return null;
  const starts = nav.start.map((s) => getPostBySlug(s)).filter(Boolean);

  return (
    <div className={`mb-8 rounded-2xl border-2 ${nav.border} bg-white p-5 sm:p-6`}>
      {nav.groups.map((g, gi) => (
        <div key={gi} className={gi > 0 ? 'mt-5' : ''}>
          <h2 className={`font-display text-base sm:text-lg font-bold mb-3 ${nav.headColor}`}>
            {g.heading || nav.heading}
          </h2>
          <div className="flex flex-wrap gap-2">
            {g.items.map(([label, hub]) => (
              <Link
                prefetch={false}
                key={hub}
                href={`/blog/${hub}/`}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${g.chip || nav.chip}`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      ))}
      {starts.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-bold text-ink-700 mb-2">はじめての方へ：まず読む{starts.length}本</h3>
          <div className="grid gap-2 sm:grid-cols-3">
            {starts.map((p) => (
              <Link
                prefetch={false}
                key={p.slug}
                href={`/blog/${p.slug}/`}
                className="block rounded-xl border border-amber-200 bg-amber-50/50 px-3 py-3 text-sm font-bold leading-snug text-ink-900 hover:bg-amber-50 hover:border-amber-300 transition-colors"
              >
                {shortTitle(p.title)}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
