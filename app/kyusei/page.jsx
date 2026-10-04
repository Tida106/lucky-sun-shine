import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import SunMascot from '@/components/SunMascot';
import SunOrnament from '@/components/icons/SunOrnament';
import { site } from '@/lib/site';
import { STARS, getStar, honmeiseiNumber } from '@/lib/kyusei';
import KyuseiClient from './KyuseiClient';

export const metadata = {
  title: '九星気学 本命星 早見表｜生年月日でわかる性格・今年の吉方位・ラッキーストーン',
  description:
    '生年月日を入力するだけで本命星がわかる九星気学診断。性格・ラッキーカラー・相性の良い本命星・ラッキーストーン・2026年の吉方位をチェック。1940年〜2026年生まれの本命星早見表付き。',
  alternates: { canonical: '/kyusei/' },
  openGraph: {
    title: '九星気学 本命星 早見表｜生年月日でわかる性格・今年の吉方位',
    description: '生年月日を入力するだけで本命星がわかる九星気学診断。性格・ラッキーストーン・2026年の吉方位をチェック。',
    url: `${site.url}/kyusei/`,
    images: [
      {
        url: `${site.url}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: '九星気学 本命星診断 | Lucky Sun Shine',
        type: 'image/jpeg',
      },
    ],
  },
};

const EARLY_TABLE_START_YEAR = 1940;
const EARLY_TABLE_END_YEAR = 2026;

function buildYearTable() {
  const rows = [];
  for (let y = EARLY_TABLE_END_YEAR; y >= EARLY_TABLE_START_YEAR; y--) {
    // 早見表は「その年の◯月◯日生まれ」ではなく「その年生まれ」の目安なので、
    // 立春の境界に関係しない年半ば(6/1)で計算する。
    const number = honmeiseiNumber(y, 6, 1);
    rows.push({ year: y, star: getStar(number) });
  }
  return rows;
}

function chunk(array, size) {
  const out = [];
  for (let i = 0; i < array.length; i += size) out.push(array.slice(i, i + size));
  return out;
}

export default function KyuseiPage() {
  const yearRows = buildYearTable();
  const columns = chunk(yearRows, Math.ceil(yearRows.length / 3));
  const starList = Object.values(STARS);

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: starList.map((s) => ({
      '@type': 'Question',
      name: `${s.name}（${s.reading}）はどんな性格？`,
      acceptedAnswer: { '@type': 'Answer', text: s.personality },
    })),
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <Breadcrumbs items={[{ name: '九星気学 本命星診断' }]} className="mb-6" />

      <header className="text-center max-w-2xl mx-auto">
        <div className="flex justify-center">
          <SunMascot size={96} priority alt="太陽ちゃん" />
        </div>
        <p className="mt-3 text-amber-700 text-xs font-bold tracking-widest">KYUSEI KIGAKU</p>
        <h1 className="mt-2 font-display text-3xl md:text-4xl font-extrabold text-ink-900">
          九星気学 本命星診断
        </h1>
        <p className="mt-4 text-sm md:text-base text-ink-700 leading-relaxed">
          生年月日を入れるだけで、あなたの「本命星」がわかるよ☀️
          性格やラッキーカラー、今年の吉方位まで、太陽ちゃんと一緒にチェックしてみよう！
        </p>
      </header>

      <div className="mt-10">
        <KyuseiClient />
      </div>

      <p className="mt-10 max-w-2xl mx-auto text-center text-[11px] text-ink-500 leading-relaxed">
        占いの結果は文化的・娯楽的なものです。進路・健康・金銭などの大事な判断は、ご自身の責任で行ってくださいね。
      </p>

      {/* 9つの本命星 解説セクション */}
      <section className="mt-16 max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-extrabold text-ink-900 flex items-center justify-center gap-3">
            <SunOrnament className="w-6 h-6 text-amber-500 shrink-0" />
            <span>9つの本命星のタイプ</span>
          </h2>
          <p className="mt-3 text-sm text-ink-500">
            本命星ごとの性格・ラッキーカラー・ラッキーストーンをまとめたよ☀️
          </p>
        </div>

        <div className="space-y-6">
          {starList.map((s) => (
            <div
              key={s.number}
              id={`star-${s.number}`}
              className="rounded-2xl border border-amber-200 bg-white p-5 md:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
            >
              <h3 className="font-display text-xl md:text-2xl font-extrabold text-ink-900">
                {s.name}
                <span className="ml-2 text-xs font-normal text-ink-500">{s.reading}</span>
              </h3>
              <div className="mt-2 flex flex-wrap gap-2 text-xs">
                <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 font-bold">
                  ラッキーカラー：{s.colorLabel}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 font-bold">
                  五行：{s.element}
                </span>
              </div>
              <p className="mt-3 text-sm text-ink-700 leading-relaxed">{s.personality}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {s.stones.map((stone) => (
                  <Link
                    key={stone.slug}
                    href={`/blog/${stone.slug}/`}
                    className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 hover:bg-amber-200"
                  >
                    💎 {stone.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SEO用 早見表 */}
      <section className="mt-16">
        <div className="mb-8 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-extrabold text-ink-900 flex items-center justify-center gap-3">
            <SunOrnament className="w-6 h-6 text-amber-500 shrink-0" />
            <span>本命星 早見表（{EARLY_TABLE_START_YEAR}年〜{EARLY_TABLE_END_YEAR}年生まれ）</span>
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-sm text-ink-500 leading-relaxed">
            生まれた年から本命星がすぐわかる一覧表だよ☀️
            1月生まれ・2月3日生まれの人は、立春の関係で「前年」の星になることが多いから、上の診断ツールで正確な日付をチェックしてみてね。
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {columns.map((col, i) => (
            <table key={i} className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-amber-200 text-left">
                  <th className="py-1.5 pr-2 font-bold text-ink-700">生まれ年</th>
                  <th className="py-1.5 font-bold text-ink-700">本命星</th>
                </tr>
              </thead>
              <tbody>
                {col.map((row) => (
                  <tr key={row.year} className="border-b border-amber-100">
                    <td className="py-1.5 pr-2 text-ink-700 whitespace-nowrap">{row.year}年</td>
                    <td className="py-1.5 text-ink-900 font-medium whitespace-nowrap">
                      <a href={`#star-${row.star.number}`} className="hover:text-amber-700 hover:underline">
                        {row.star.name}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ))}
        </div>
      </section>
    </div>
  );
}
