import Link from 'next/link';
import SunMascot from '@/components/SunMascot';
import { site } from '@/lib/site';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
  title: '太陽醬是誰？｜Lucky Sun Shine 官方吉祥物',
  description:
    'Lucky Sun Shine 官方吉祥物「太陽醬」的介紹頁。為你的每一天帶來一點陽光的太陽寶寶☀️ 也附上太陽醬 LINE 貼圖的連結。',
  alternates: { canonical: '/zh-tw/about-mascot/' },
  openGraph: {
    title: '太陽醬是誰？｜Lucky Sun Shine 官方吉祥物',
    description: 'Lucky Sun Shine 官方吉祥物「太陽醬」的介紹頁。為你的每一天帶來一點陽光的太陽寶寶。',
    url: `${site.url}/zh-tw/about-mascot/`,
    images: [
      {
        url: `${site.url}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: '太陽醬 | Lucky Sun Shine',
        type: 'image/jpeg',
      },
    ],
  },
};

const PROFILE_ROWS = [
  { label: '名字', value: '太陽醬' },
  { label: '身分', value: 'Lucky Sun Shine 官方吉祥物' },
  { label: '出身地', value: '太陽的身邊' },
  { label: '年齡', value: '永遠的太陽寶寶（年齡不詳）' },
  { label: '性別', value: '感覺像女孩子，但是大家的好朋友' },
];

const LIKES = [
  { icon: '✨', text: '閃閃發亮的水晶能量石' },
  { icon: '🌅', text: '朝陽與夕陽' },
  { icon: '⛩️', text: '神社裡寧靜的空氣' },
  { icon: '🍀', text: '御守・開運小物' },
  { icon: '💛', text: '溫暖人心的話語' },
  { icon: '🍙', text: '好吃的食物' },
];

const DISLIKES = ['陰沉灰暗的心情', '覺得「自己不行」的念頭', '過於匆忙的每一天'];

const PERSONALITY = [
  '開朗又溫柔',
  '有點迷糊冒失',
  '擅長發現大家的優點',
  '口頭禪是「你一定沒問題的！」',
];

const SKILLS = [
  '發現心情低落的人，就會把太陽的光芒送過去',
  '能和水晶能量石對話',
  '去到神社，就能和神明變成好朋友',
];

const CTA_LINKS = [
  { href: '/zh-tw/', label: '回到繁體中文版首頁', icon: '☀️' },
  { href: '/category/powerstones/', label: '瀏覽更多水晶文章（日文版）', icon: '💎' },
  { href: '/category/powerspots/', label: '瀏覽更多能量景點文章（日文版）', icon: '⛩️' },
];

const LINE_STAMP_SAMPLES = [
  'mascot-sun-thanks.png',
  'mascot-sun-cheer.png',
  'mascot-sun-yay.png',
  'mascot-sun-believe.png',
  'mascot-sun-good.png',
  'mascot-sun-morning.png',
];

// 日本語版(app/about-mascot/page.jsx)と同じLINEスタンプURL。
const LINE_STAMP_LINKS = [
  { label: '查看第 1 彈 LINE 貼圖', url: 'https://line.me/S/sticker/31586674' },
  { label: '查看第 2 彈 LINE 貼圖', url: 'https://line.me/S/sticker/31602987' },
];

function SectionHeading({ children, eyebrow }) {
  return (
    <header className="text-center mb-6">
      {eyebrow ? (
        <p className="text-amber-700 text-xs font-bold tracking-widest">{eyebrow}</p>
      ) : null}
      <h2 className="mt-2 font-display text-2xl md:text-3xl font-bold text-ink-900">
        {children}
      </h2>
    </header>
  );
}

export default function AboutMascotZhTwPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <Breadcrumbs items={[{ name: '太陽醬小檔案' }]} className="mb-6" locale="zh-tw" />
      <header className="text-center">
        <p className="text-amber-700 text-xs font-bold tracking-widest">OFFICIAL MASCOT</p>
        <h1 className="mt-2 font-display text-3xl md:text-4xl font-extrabold text-ink-900">
          ☀️ 太陽醬是誰？ ☀️
        </h1>
        <div className="mt-6 flex justify-center">
          <div className="relative inline-flex items-center justify-center rounded-full bg-gradient-to-br from-amber-100 via-yellow-50 to-rose-50 p-4 md:p-6 shadow-[0_8px_30px_rgba(245,158,11,0.18)] border border-amber-200">
            <span className="absolute -top-2 -left-2 text-2xl">✨</span>
            <span className="absolute -bottom-2 -right-2 text-2xl">✨</span>
            <SunMascot
              size={240}
              priority
              alt="太陽醬 — Lucky Sun Shine 的官方吉祥物"
              className="md:!w-72 md:!h-72"
            />
          </div>
        </div>
      </header>

      <p className="mt-8 mx-auto max-w-xl text-center text-xs md:text-sm text-ink-700 leading-relaxed rounded-xl border border-amber-200/80 bg-amber-50/70 px-4 py-3">
        ☀️ 太陽醬是 {site.name} 的官方吉祥物角色，文章由編輯團隊撰寫。
      </p>

      <section className="mt-12 rounded-2xl bg-gradient-to-br from-amber-50 to-rose-50 border border-amber-200 p-6 md:p-8 text-center">
        <p className="text-amber-700 text-xs font-bold tracking-widest">GREETING</p>
        <h2 className="mt-2 font-display text-2xl md:text-3xl font-bold text-ink-900">
          初次見面！
        </h2>
        <p className="mt-4 text-base md:text-lg text-ink-800 leading-relaxed">
          哈囉！我是 {site.name} 的吉祥物，太陽醬☀️
          <br />
          謝謝你來到這個網站！
          <br />
          希望能為你的每一天，帶來一點點太陽的光芒。
        </p>
      </section>

      <section className="mt-14">
        <SectionHeading eyebrow="PROFILE">基本資料</SectionHeading>
        <div className="rounded-2xl bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 border border-amber-300 shadow-[0_4px_20px_rgba(0,0,0,0.04)] overflow-hidden">
          <dl className="divide-y divide-amber-200/70">
            {PROFILE_ROWS.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-1 sm:grid-cols-[10rem_1fr] gap-1 sm:gap-4 px-5 py-4"
              >
                <dt className="text-sm font-bold text-amber-800 flex items-center gap-1.5">
                  <span aria-hidden="true">☀️</span>
                  {row.label}
                </dt>
                <dd className="text-sm md:text-base text-ink-900 leading-relaxed">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mt-14">
        <SectionHeading eyebrow="LIKES">喜歡的東西</SectionHeading>
        <ul className="grid sm:grid-cols-2 gap-3">
          {LIKES.map((item) => (
            <li
              key={item.text}
              className="flex items-center gap-3 rounded-xl bg-gradient-to-br from-rose-50 to-amber-50 border border-amber-200 px-4 py-3 text-sm md:text-base text-ink-900"
            >
              <span className="text-xl shrink-0" aria-hidden="true">{item.icon}</span>
              <span className="leading-snug">{item.text}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14">
        <SectionHeading eyebrow="DISLIKES">不擅長的東西</SectionHeading>
        <ul className="rounded-2xl bg-gradient-to-br from-sky-50 to-indigo-50 border border-sky-200 p-5 md:p-6 space-y-2">
          {DISLIKES.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm md:text-base text-ink-800">
              <span className="text-amber-600 mt-0.5" aria-hidden="true">☁︎</span>
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14">
        <SectionHeading eyebrow="PERSONALITY">個性</SectionHeading>
        <ul className="grid sm:grid-cols-2 gap-3">
          {PERSONALITY.map((item) => (
            <li
              key={item}
              className="rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200 px-4 py-3 text-sm md:text-base text-ink-900 leading-snug"
            >
              <span className="mr-2 text-amber-600" aria-hidden="true">✨</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14">
        <SectionHeading eyebrow="SPECIAL SKILLS">特技</SectionHeading>
        <ul className="space-y-3">
          {SKILLS.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 rounded-xl bg-gradient-to-br from-emerald-50 via-amber-50 to-rose-50 border border-amber-200 px-5 py-4 text-sm md:text-base text-ink-900 leading-relaxed"
            >
              <span className="text-2xl shrink-0" aria-hidden="true">☀️</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14">
        <div className="rounded-2xl bg-gradient-to-br from-amber-100 via-yellow-50 to-rose-50 border-2 border-amber-300 p-6 md:p-8 text-center shadow-[0_4px_20px_rgba(245,158,11,0.12)]">
          <p className="text-amber-700 text-xs font-bold tracking-widest">PROMISE</p>
          <h2 className="mt-2 font-display text-2xl md:text-3xl font-bold text-ink-900">
            ✨ 太陽醬的約定 ✨
          </h2>
          <p className="mt-5 text-base md:text-lg text-ink-800 leading-relaxed">
            希望每一位讀者的每一天，都能像太陽一樣明亮。
            <br />
            這個網站會持續為你送上開運的小提示☀️
            <br />
            你一定沒問題的！太陽醬一直都在為你加油💛
          </p>
        </div>
      </section>

      {/* LINEスタンプ販売告知 — 日本語版と同じURL */}
      <section className="mt-16">
        <SectionHeading eyebrow="LINE STICKERS">
          太陽醬的 LINE 貼圖，熱銷中☀️
        </SectionHeading>
        <p className="text-center text-sm md:text-base text-ink-700 max-w-xl mx-auto -mt-2 mb-6 leading-relaxed">
          在 LINE 聊天中也能使用太陽醬囉💛
          <br />
          為你的每一天送上一點點陽光！
        </p>
        <div className="grid grid-cols-3 gap-3 md:gap-4">
          {LINE_STAMP_SAMPLES.map((file) => {
            const webp = file.replace(/\.png$/i, '.webp');
            return (
              <div
                key={file}
                className="aspect-square rounded-2xl border-2 border-amber-300 bg-gradient-to-br from-amber-50 via-yellow-50 to-rose-50 p-2 md:p-3 flex items-center justify-center shadow-[0_4px_16px_rgba(245,158,11,0.10)] overflow-hidden"
              >
                <picture>
                  <source srcSet={`/images/${webp}`} type="image/webp" />
                  <img
                    src={`/images/${file}`}
                    alt="太陽醬 LINE 貼圖範例"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain select-none"
                  />
                </picture>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          {LINE_STAMP_LINKS.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm md:text-base font-bold shadow-[0_4px_16px_rgba(6,199,85,0.30)] hover:shadow-[0_6px_24px_rgba(6,199,85,0.45)] hover:scale-[1.02] active:scale-100 transition-all"
              style={{ backgroundColor: '#06C755' }}
            >
              <span aria-hidden="true">📱</span>
              {link.label}
            </a>
          ))}
        </div>

        <p className="mt-5 text-center text-xs text-ink-500">
          ※請勿擅自轉載或作商業用途使用貼圖圖像。
        </p>
      </section>

      <section className="mt-16">
        <SectionHeading eyebrow="READ MORE">
          想了解更多開運資訊嗎？
        </SectionHeading>
        <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
          {CTA_LINKS.map((cta) => (
            <Link
              key={cta.href}
              href={cta.href}
              className="group flex items-center justify-between gap-3 rounded-2xl bg-gradient-to-br from-amber-50 to-rose-50 border border-amber-300 px-5 py-4 hover:scale-[1.02] hover:shadow-[0_6px_20px_rgba(245,158,11,0.18)] transition-all"
            >
              <span className="flex items-center gap-3">
                <span className="text-2xl" aria-hidden="true">{cta.icon}</span>
                <span className="font-bold text-ink-900 text-sm md:text-base">{cta.label}</span>
              </span>
              <span aria-hidden="true" className="text-amber-700 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
