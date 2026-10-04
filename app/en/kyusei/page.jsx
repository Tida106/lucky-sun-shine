import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import SunMascot from '@/components/SunMascot';
import SunOrnament from '@/components/icons/SunOrnament';
import { site } from '@/lib/site';
import { honmeiseiNumber } from '@/lib/kyusei';
import { STARS_EN, getStarEn } from '@/lib/kyusei.en';
import KyuseiClientEn from './KyuseiClientEn';

const LOCALE = 'en';

export const metadata = {
  title: 'Nine Star Ki Calculator | Find Your Main Star, Personality, Lucky Directions and Crystals',
  description:
    'Enter your birth date to find your Nine Star Ki (Kyusei Kigaku) main star — personality, lucky color, compatible stars, lucky crystals, and your favorable directions for 2026. Includes a main-star lookup table for 1940–2026.',
  alternates: {
    canonical: '/en/kyusei/',
    languages: {
      ja: '/kyusei/',
      en: '/en/kyusei/',
      'x-default': '/kyusei/',
    },
  },
  openGraph: {
    title: 'Nine Star Ki Calculator | Find Your Main Star',
    description:
      'Enter your birth date to find your Nine Star Ki main star — personality, lucky crystals, and your favorable directions for 2026.',
    url: `${site.url}/en/kyusei/`,
    images: [
      {
        url: `${site.url}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Nine Star Ki Main Star Calculator | Lucky Sun Shine',
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
    // The lookup table shows a generic "born in this year" result, so it
    // uses a mid-year date (June 1) that never falls near the Risshun
    // boundary used for the exact day-level calculation above.
    const number = honmeiseiNumber(y, 6, 1);
    rows.push({ year: y, star: getStarEn(number) });
  }
  return rows;
}

function chunk(array, size) {
  const out = [];
  for (let i = 0; i < array.length; i += size) out.push(array.slice(i, i + size));
  return out;
}

export default function KyuseiPageEn() {
  const yearRows = buildYearTable();
  const columns = chunk(yearRows, Math.ceil(yearRows.length / 3));
  const starList = Object.values(STARS_EN);

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: starList.map((s) => ({
      '@type': 'Question',
      name: `What is the personality of the ${s.name} (${s.reading})?`,
      acceptedAnswer: { '@type': 'Answer', text: s.personality },
    })),
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <Breadcrumbs items={[{ name: 'Nine Star Ki Calculator' }]} className="mb-6" locale={LOCALE} />

      <header className="text-center max-w-2xl mx-auto">
        <div className="flex justify-center">
          <SunMascot size={96} priority alt="Sun-chan" />
        </div>
        <p className="mt-3 text-amber-700 text-xs font-bold tracking-widest">KYUSEI KIGAKU (NINE STAR KI)</p>
        <h1 className="mt-2 font-display text-3xl md:text-4xl font-extrabold text-ink-900">
          Nine Star Ki Main Star Calculator
        </h1>
        <p className="mt-4 text-sm md:text-base text-ink-700 leading-relaxed">
          Just enter your birth date and I'll find your "main star" from{' '}
          <strong>Kyusei Kigaku (Nine Star Ki)</strong>, the traditional Japanese astrology system ☀️
          You'll get your personality, lucky color, and even your favorable directions for this year —
          let's check it out together!
        </p>
      </header>

      <div className="mt-10">
        <KyuseiClientEn />
      </div>

      <p className="mt-10 max-w-2xl mx-auto text-center text-[11px] text-ink-500 leading-relaxed">
        This reading is offered for cultural and entertainment purposes. Please use your own judgment for important decisions about your career, health, or finances.
      </p>

      {/* 9 main star types */}
      <section className="mt-16 max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-extrabold text-ink-900 flex items-center justify-center gap-3">
            <SunOrnament className="w-6 h-6 text-amber-500 shrink-0" />
            <span>The 9 Main Star Types</span>
          </h2>
          <p className="mt-3 text-sm text-ink-500">
            Here's a quick guide to each main star's personality, lucky color, and lucky crystals ☀️
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
                  Lucky color: {s.colorLabel}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 font-bold">
                  Element: {s.element}
                </span>
              </div>
              <p className="mt-3 text-sm text-ink-700 leading-relaxed">{s.personality}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {s.stones.map((stone) => (
                  <Link
                    key={stone.slug}
                    href={`/en/blog/${stone.slug}/`}
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

      {/* SEO lookup table */}
      <section className="mt-16">
        <div className="mb-8 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-extrabold text-ink-900 flex items-center justify-center gap-3">
            <SunOrnament className="w-6 h-6 text-amber-500 shrink-0" />
            <span>Main Star Lookup Table ({EARLY_TABLE_START_YEAR}–{EARLY_TABLE_END_YEAR})</span>
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-sm text-ink-500 leading-relaxed">
            Find your main star by birth year at a glance ☀️ If you were born in January or on
            February 1st–3rd, your star is often based on the <em>previous</em> year because of the
            Risshun boundary — use the calculator above for an exact result.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {columns.map((col, i) => (
            <table key={i} className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-amber-200 text-left">
                  <th className="py-1.5 pr-2 font-bold text-ink-700">Birth Year</th>
                  <th className="py-1.5 font-bold text-ink-700">Main Star</th>
                </tr>
              </thead>
              <tbody>
                {col.map((row) => (
                  <tr key={row.year} className="border-b border-amber-100">
                    <td className="py-1.5 pr-2 text-ink-700 whitespace-nowrap">{row.year}</td>
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
