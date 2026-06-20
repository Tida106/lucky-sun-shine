import Image from 'next/image';
import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import { mainCategories as categories } from '@/lib/categories';
import PostCard from '@/components/PostCard';
import PopularPosts from '@/components/PopularPosts';
import CategoryIcon from '@/components/CategoryIcon';
import SunOrnament from '@/components/icons/SunOrnament';
import Sparkles from '@/components/icons/Sparkles';
import SunDivider from '@/components/SunDivider';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveBanner from '@/components/PositiveBanner';
import SunMascot from '@/components/SunMascot';
import SunSpeechBubble from '@/components/SunSpeechBubble';
import DailyMessage from '@/components/DailyMessage';

export const metadata = {
  title: 'Lucky Sun Shine | パワーストーン・パワースポット・開運の総合メディア',
  description:
    'パワーストーン、パワースポット、開運グッズ、運気アップ習慣の最新情報をお届け。今日から始める開運アクションを毎日更新中。',
};

// 初めての訪問者にまず読んでほしい3記事。優しいオンボーディング目的。
const FIRST_VISIT_PICKS = [
  {
    slug: 'how-to-choose-powerstones',
    label: 'パワーストーン',
    headline: '自分に合う石の選び方',
    body: '直感と目的、両方を大切にしながら、自分の石と出会うコツをまとめました。',
    gradient: 'from-rose-50 via-pink-50 to-amber-50',
  },
  {
    slug: 'shrine-visit-basics',
    label: 'パワースポット',
    headline: '神社参拝のキホン',
    body: '手順・作法・心構え。緊張しなくても大丈夫、最初の一歩を一緒に踏み出しましょう。',
    gradient: 'from-emerald-50 via-amber-50 to-yellow-50',
  },
  {
    slug: 'lucky-habits-guide',
    label: '運気アップ習慣',
    headline: '毎日の小さな開運習慣',
    body: '朝・夜・お財布・お部屋。今日から無理なく始められる開運のヒントを集めました。',
    gradient: 'from-sky-50 via-amber-50 to-orange-50',
  },
];

// 「お悩み解決」セクション — 不安に寄り添うシリーズ4本。
const WORRY_PICKS = [
  {
    slug: 'powerstone-broken-meaning',
    emoji: '💔',
    headline: '石が割れちゃった…',
    body: '身代わりかも？意味と次の一歩を、やさしく整理します。',
  },
  {
    slug: 'bad-combination-stones',
    emoji: '⚠️',
    headline: 'NG組み合わせって本当？',
    body: '「相性が悪い」と言われる組み合わせの真実を冷静に。',
  },
  {
    slug: 'fake-stone-identification',
    emoji: '🔍',
    headline: '偽物の見分け方',
    body: '模造・処理・合成の違いと、素人でもできる判別ポイント。',
  },
  {
    slug: 'left-right-hand-powerstone',
    emoji: '🤲',
    headline: '左手？右手？',
    body: 'つける手で意味が変わる？目的別の正しい使い分けガイド。',
  },
];

// 「目的から探す」セクション — 6部作の purpose ハブ。
const PURPOSE_PICKS = [
  { slug: 'purpose-money-stones',      label: '金運',   emoji: '💰', tone: 'from-amber-50 via-yellow-50 to-orange-50',   accent: 'text-amber-700',   border: 'border-amber-300'   },
  { slug: 'purpose-love-stones',       label: '恋愛運', emoji: '💗', tone: 'from-rose-50 via-pink-50 to-amber-50',       accent: 'text-rose-600',    border: 'border-rose-300'    },
  { slug: 'purpose-work-stones',       label: '仕事運', emoji: '💼', tone: 'from-sky-50 via-indigo-50 to-amber-50',      accent: 'text-sky-700',     border: 'border-sky-300'     },
  { slug: 'purpose-health-stones',     label: '健康運', emoji: '🌿', tone: 'from-emerald-50 via-lime-50 to-amber-50',    accent: 'text-emerald-700', border: 'border-emerald-300' },
  { slug: 'purpose-relation-stones',   label: '対人運', emoji: '🤝', tone: 'from-orange-50 via-amber-50 to-yellow-50',   accent: 'text-orange-700',  border: 'border-orange-300'  },
  { slug: 'purpose-protection-stones', label: '厄除け', emoji: '🛡️', tone: 'from-violet-50 via-purple-50 to-amber-50',   accent: 'text-violet-700',  border: 'border-violet-300'  },
];

// 「風水で開運」セクション — 方角・部屋・玄関・デスク。
const FENGSHUI_PICKS = [
  {
    slug: 'fengshui-direction-stones',
    label: '方角別',
    headline: '方角でえらぶ風水石',
    body: '東西南北＋中央。気の流れを整える、方位ごとの守り石。',
  },
  {
    slug: 'fengshui-room-stones',
    label: '部屋別',
    headline: 'お部屋でえらぶ風水石',
    body: 'リビング・寝室・キッチン。場所ごとの相性をまとめました。',
  },
  {
    slug: 'genkan-powerstone-guide',
    label: '玄関',
    headline: '玄関に置きたい石',
    body: '良い気を呼び込み、悪い気を入れない。玄関の風水入門。',
  },
  {
    slug: 'fengshui-desk-stones',
    label: 'デスク',
    headline: '仕事机に置く石',
    body: '集中力・対人運・金運。デスク風水で仕事運を底上げ。',
  },
];

// 「贈り物・ギフト」セクション — ギフト3本。
const GIFT_PICKS = [
  {
    slug: 'powerstone-gift-guide',
    label: 'ギフトガイド',
    headline: 'パワーストーンの贈り物',
    body: '相手別・予算別の選び方と、添えたいメッセージのヒント。',
  },
  {
    slug: 'birthday-gift-stones',
    label: 'お誕生日',
    headline: '誕生日に贈る石',
    body: '誕生石と誕生月の意味から、特別な一石をえらぶコツ。',
  },
  {
    slug: 'christmas-stones',
    label: 'クリスマス',
    headline: 'クリスマスに贈る石',
    body: '冬の聖夜にふさわしい、あたたかさを贈る石たち。',
  },
];

// 「お日さまのおすそわけ」— 不安解消＆風水＆実用の最新ガイド6本。
const FEATURED_SLUGS = [
  'powerstone-broken-meaning',
  'bad-combination-stones',
  'fake-stone-identification',
  'left-right-hand-powerstone',
  'fengshui-room-stones',
  'powerstone-gift-guide',
];

export default function HomePage() {
  const posts = getAllPosts();

  // 日付降順そのままで最新10件。ピラー・ハブはお日さまのおすそわけ側で別途出す。
  const latest = posts.slice(0, 10);
  const featured = FEATURED_SLUGS
    .map((slug) => posts.find((p) => p.slug === slug))
    .filter(Boolean);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden isolate">
        <Image
          src="/images/hero-crystals.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          aria-hidden="true"
          className="object-cover object-center -z-10 select-none pointer-events-none"
        />
        {/* Readability overlay — 60–70% white veil keeps amber/ink type legible */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-b from-white/70 via-white/60 to-white/70"
        />
        <div className="max-w-6xl mx-auto px-4 pt-6 pb-10 md:pt-10 md:pb-14 text-center">
          <p className="inline-flex items-center justify-center gap-3 text-amber-700 tracking-[0.3em] text-xs md:text-sm font-bold">
            <SunOrnament className="w-4 h-4 text-amber-500" />
            <span>LUCKY SUN SHINE</span>
            <SunOrnament className="w-4 h-4 text-amber-500" />
          </p>
          <h1 className="mt-5 font-display text-3xl md:text-5xl font-extrabold text-ink-900 leading-tight drop-shadow-[0_1px_1px_rgba(255,255,255,0.6)]">
            <span className="inline-flex items-center justify-center gap-3 md:gap-5">
              <SunOrnament className="hidden md:inline-block w-6 h-6 text-amber-500 opacity-70 shrink-0" strokeWidth={1.1} />
              <span>
                太陽のように<br className="md:hidden" />
                明るい毎日を。
              </span>
              <SunOrnament className="hidden md:inline-block w-6 h-6 text-amber-500 opacity-70 shrink-0" strokeWidth={1.1} />
            </span>
          </h1>
          {/* Catchphrases — H1 直下の3行。font-display(Noto Serif JP) を継承し、
              濃いめのゴールド(#9C7A47 ≒ text-amber-700)でほんのり小さめに重ねる。
              横に太陽ちゃんを並べて温度感を出す。 */}
          <div className="mt-6 flex items-center justify-center gap-3 md:gap-5">
            <SunMascot
              size={112}
              src="/images/mascot-sun-morning.png"
              className="shrink-0 md:!w-48 md:!h-48"
              priority
              alt="太陽ちゃん（GOOD MORNING!）"
            />
            <div className="space-y-2 font-display font-bold text-amber-700 leading-snug text-left">
              <p className="text-lg md:text-2xl">気分が上がれば、運気も上がる！</p>
              <p className="text-lg md:text-2xl">あなたは、絶対運がいい！</p>
            </div>
          </div>
          <div className="mt-6 flex justify-center">
            <SunSpeechBubble>ようこそ☀️ あなたを待ってたよ！</SunSpeechBubble>
          </div>
          <p className="mt-6 max-w-2xl mx-auto text-ink-700 text-sm md:text-base leading-relaxed">
            パワーストーン・パワースポット・開運グッズ・運気アップ習慣。<br />
            日々の暮らしに「ちょっといい兆し」を取り入れるためのメディアです。
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/category/${c.slug}/`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm border border-amber-200 text-sm font-medium text-amber-900 hover:bg-amber-50 hover:border-amber-400 transition-colors"
              >
                <CategoryIcon slug={c.slug} className="w-4 h-4 text-amber-600" />
                {c.title}
              </Link>
            ))}
          </div>
          {/* Scroll cue — gently bouncing chevron */}
          <div className="mt-6 md:mt-8 flex justify-center" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              className="scroll-cue w-6 h-6 text-amber-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </div>
      </section>

      <SunDivider />

      {/* Daily message — 太陽ちゃんからの今日のひとこと */}
      <DailyMessage />

      {/* First-visit onboarding — まずはこの3記事から */}
      <ScrollReveal as="section" className="max-w-6xl mx-auto px-4 pt-8 pb-12 md:pt-10 md:pb-14">
        <div className="flex justify-center mb-4">
          <SunSpeechBubble>まずはこの3記事から読んでみてね💛</SunSpeechBubble>
        </div>
        <div className="text-center mb-8">
          <p className="inline-flex items-center justify-center gap-2 text-amber-700 text-xs font-bold tracking-widest">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>FIRST VISIT</span>
            <Sparkles className="w-4 h-4 text-amber-600" />
          </p>
          <h2 className="mt-2 font-display text-2xl md:text-3xl font-extrabold text-ink-900">
            はじめましての方へ
          </h2>
          <p className="mt-3 text-sm md:text-base text-ink-700">
            まずはこの3記事から読んでみてね☀️
          </p>
        </div>
        <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FIRST_VISIT_PICKS.map((pick) => (
            <Link
              key={pick.slug}
              href={`/blog/${pick.slug}/`}
              className={`group block rounded-2xl border-2 border-amber-300 bg-gradient-to-br ${pick.gradient} p-5 md:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_14px_32px_rgba(0,0,0,0.10)] hover:-translate-y-1 transition-all duration-300 ease-out`}
            >
              <div className="text-[11px] font-bold tracking-widest text-amber-700">
                {pick.label}
              </div>
              <h3 className="mt-2 font-display text-lg md:text-xl font-extrabold text-ink-900 leading-snug group-hover:text-amber-700 transition-colors">
                {pick.headline}
              </h3>
              <p className="mt-3 text-sm text-ink-700 leading-relaxed">
                {pick.body}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-amber-700 group-hover:underline">
                読んでみる
                <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </ScrollReveal>

      <SunDivider />

      {/* Categories */}
      <ScrollReveal as="section" className="max-w-6xl mx-auto px-4 py-16">
        <div className="mb-5">
          <SunSpeechBubble>どこから運気上げる？</SunSpeechBubble>
        </div>
        <div className="mb-8">
          <h2 className="font-display text-2xl font-bold text-ink-900 flex items-center gap-3">
            <SunOrnament className="w-6 h-6 text-amber-500 shrink-0" />
            <span>今日の運、どこから上げる？</span>
          </h2>
          <span aria-hidden="true" className="heading-rule mt-3 ml-9" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}/`}
              className={`group block rounded-2xl p-5 overflow-hidden border border-white/60 ${c.pastel.bg} shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_14px_32px_rgba(0,0,0,0.10)] hover:-translate-y-1 transition-all duration-300 ease-out`}
            >
              <CategoryIcon
                slug={c.slug}
                className={`w-10 h-10 mb-3 ${c.pastel.accent} transition-transform duration-500 ease-out group-hover:scale-105`}
              />
              <h3 className={`font-display font-bold text-lg ${c.pastel.accent} transition-colors`}>{c.title}</h3>
              <p className="mt-1 text-xs text-[#5A5A5A] leading-relaxed">{c.tagline}</p>
            </Link>
          ))}
        </div>
      </ScrollReveal>

      <PositiveBanner
        tone="pink"
        message="あなたは最高！"
        mascotSrc="/images/mascot-sun-yay.png"
      />

      {/* お悩み解決 — 不安に寄り添う4本 */}
      <ScrollReveal as="section" className="max-w-6xl mx-auto px-4 py-16">
        <div className="mb-5">
          <SunSpeechBubble>その不安、一緒にほどいていこ☀️</SunSpeechBubble>
        </div>
        <div className="mb-8">
          <h2 className="font-display text-2xl font-bold text-ink-900 flex items-center gap-3">
            <SunOrnament className="w-6 h-6 text-amber-500 shrink-0" />
            <span>お悩み解決ガイド</span>
          </h2>
          <span aria-hidden="true" className="heading-rule mt-3 ml-9" />
          <p className="mt-3 ml-9 text-sm text-ink-500">
            「これって大丈夫？」と検索された方の多い質問に、まっすぐ答えます。
          </p>
        </div>
        <div className="grid gap-4 md:gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WORRY_PICKS.map((pick) => (
            <Link
              key={pick.slug}
              href={`/blog/${pick.slug}/`}
              className="group block rounded-2xl border border-amber-200 bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_14px_32px_rgba(0,0,0,0.10)] hover:-translate-y-1 hover:border-amber-400 transition-all duration-300 ease-out"
            >
              <div className="text-3xl" aria-hidden="true">{pick.emoji}</div>
              <h3 className="mt-3 font-display text-base md:text-lg font-extrabold text-ink-900 leading-snug group-hover:text-amber-700 transition-colors">
                {pick.headline}
              </h3>
              <p className="mt-2 text-xs md:text-sm text-ink-700 leading-relaxed">
                {pick.body}
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-amber-700 group-hover:underline">
                読む
                <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </ScrollReveal>

      {/* 目的から探す — 6部作の purpose ハブ */}
      <ScrollReveal as="section" delay={50} className="max-w-6xl mx-auto px-4 pb-16">
        <div className="mb-5">
          <SunSpeechBubble>叶えたい運から選んでみて✨</SunSpeechBubble>
        </div>
        <div className="mb-8">
          <h2 className="font-display text-2xl font-bold text-ink-900 flex items-center gap-3">
            <SunOrnament className="w-6 h-6 text-amber-500 shrink-0" />
            <span>目的から探す</span>
          </h2>
          <span aria-hidden="true" className="heading-rule mt-3 ml-9" />
          <p className="mt-3 ml-9 text-sm text-ink-500">
            金運・恋愛・仕事・健康・対人・厄除け。今いちばん欲しい運から、相性のいい石を探せます。
          </p>
        </div>
        <div className="grid gap-3 md:gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
          {PURPOSE_PICKS.map((pick) => (
            <Link
              key={pick.slug}
              href={`/blog/${pick.slug}/`}
              className={`group block rounded-2xl border ${pick.border} bg-gradient-to-br ${pick.tone} p-4 md:p-5 text-center shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_14px_32px_rgba(0,0,0,0.10)] hover:-translate-y-1 transition-all duration-300 ease-out`}
            >
              <div className="text-3xl md:text-4xl" aria-hidden="true">{pick.emoji}</div>
              <h3 className={`mt-2 font-display text-sm md:text-base font-extrabold ${pick.accent}`}>
                {pick.label}
              </h3>
              <span className="mt-1 block text-[10px] md:text-xs text-ink-500 group-hover:underline">
                石を見る →
              </span>
            </Link>
          ))}
        </div>
      </ScrollReveal>

      <PositiveBanner tone="peach" message="今日という日に感謝！" />

      {/* Latest posts + sidebar popular */}
      <ScrollReveal as="section" delay={100} className="max-w-6xl mx-auto px-4 py-16 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0">
          <div className="mb-5">
            <SunSpeechBubble>最近こんな話を集めてるよ✨</SunSpeechBubble>
          </div>
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="font-display text-2xl font-bold text-ink-900 flex items-center gap-3">
                <SunOrnament className="w-6 h-6 text-amber-500 shrink-0" />
                <span>最近、こんな話を集めてます</span>
              </h2>
              <span aria-hidden="true" className="heading-rule mt-3 ml-9" />
            </div>
            <span className="text-sm text-ink-500">{posts.length} 記事</span>
          </div>
          {latest.length === 0 ? (
            <p className="text-ink-500 text-sm">記事を準備中です。</p>
          ) : (
            <>
              <div className="grid gap-5 sm:grid-cols-2">
                {latest.map((p) => (
                  <PostCard key={p.slug} post={p} />
                ))}
              </div>
              <div className="mt-8 text-center">
                <Link
                  href="/blog/"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-500 text-white font-bold text-sm shadow-[0_4px_14px_rgba(245,158,11,0.35)] hover:bg-amber-600 hover:shadow-[0_8px_22px_rgba(245,158,11,0.45)] transition-all"
                >
                  すべての記事を見る
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </>
          )}
        </div>
        <div className="space-y-6">
          <PopularPosts limit={5} />
        </div>
      </ScrollReveal>

      {/* 風水で開運 — 方角・部屋・玄関・デスク */}
      <ScrollReveal as="section" className="max-w-6xl mx-auto px-4 pb-16">
        <div className="mb-5">
          <SunSpeechBubble>気の流れ、整えていこ〜🌬️</SunSpeechBubble>
        </div>
        <div className="mb-8">
          <h2 className="font-display text-2xl font-bold text-ink-900 flex items-center gap-3">
            <SunOrnament className="w-6 h-6 text-amber-500 shrink-0" />
            <span>風水で開運</span>
          </h2>
          <span aria-hidden="true" className="heading-rule mt-3 ml-9" />
          <p className="mt-3 ml-9 text-sm text-ink-500">
            方角・お部屋・玄関・デスク。住まいと働く場所から、運気の通り道を整えます。
          </p>
        </div>
        <div className="grid gap-4 md:gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FENGSHUI_PICKS.map((pick) => (
            <Link
              key={pick.slug}
              href={`/blog/${pick.slug}/`}
              className="group block rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-amber-50 to-yellow-50 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_14px_32px_rgba(0,0,0,0.10)] hover:-translate-y-1 hover:border-emerald-400 transition-all duration-300 ease-out"
            >
              <div className="text-[11px] font-bold tracking-widest text-emerald-700">
                {pick.label}
              </div>
              <h3 className="mt-2 font-display text-base md:text-lg font-extrabold text-ink-900 leading-snug group-hover:text-emerald-700 transition-colors">
                {pick.headline}
              </h3>
              <p className="mt-2 text-xs md:text-sm text-ink-700 leading-relaxed">
                {pick.body}
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-emerald-700 group-hover:underline">
                読む
                <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </ScrollReveal>

      {/* 季節の特集 — 今の季節(夏) */}
      <ScrollReveal as="section" className="max-w-6xl mx-auto px-4 pb-16">
        <Link
          href="/blog/summer-stones/"
          className="group block rounded-2xl overflow-hidden border border-sky-200 bg-gradient-to-br from-sky-50 via-cyan-50 to-amber-50 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_14px_32px_rgba(0,0,0,0.10)] hover:-translate-y-1 transition-all duration-300 ease-out"
        >
          <div className="grid gap-6 md:grid-cols-[auto_minmax(0,1fr)] items-center p-6 md:p-8">
            <div className="flex items-center justify-center">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/80 flex items-center justify-center shadow-inner text-4xl md:text-5xl" aria-hidden="true">
                ☀️
              </div>
            </div>
            <div>
              <p className="inline-flex items-center gap-2 text-sky-700 text-xs font-bold tracking-widest">
                <Sparkles className="w-4 h-4 text-sky-600" />
                <span>SEASONAL</span>
              </p>
              <h3 className="mt-2 font-display text-xl md:text-2xl font-extrabold text-ink-900 leading-snug group-hover:text-sky-700 transition-colors">
                夏にぴったりのパワーストーン
              </h3>
              <p className="mt-3 text-sm md:text-base text-ink-700 leading-relaxed">
                強い日差し・夏バテ・人混みの疲れ。涼やかな石たちが、暑い季節をやさしく整えてくれます。
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-sky-700 group-hover:underline">
                夏の特集を読む
                <span aria-hidden="true">→</span>
              </span>
            </div>
          </div>
        </Link>
      </ScrollReveal>

      {/* 贈り物・ギフト — ギフト3本 */}
      <ScrollReveal as="section" className="max-w-6xl mx-auto px-4 pb-16">
        <div className="mb-5">
          <SunSpeechBubble>大切なあの人に贈ろ🎁</SunSpeechBubble>
        </div>
        <div className="mb-8">
          <h2 className="font-display text-2xl font-bold text-ink-900 flex items-center gap-3">
            <SunOrnament className="w-6 h-6 text-amber-500 shrink-0" />
            <span>贈り物・ギフトガイド</span>
          </h2>
          <span aria-hidden="true" className="heading-rule mt-3 ml-9" />
          <p className="mt-3 ml-9 text-sm text-ink-500">
            誕生日・クリスマス・記念日。気持ちが伝わる石の選び方をまとめました。
          </p>
        </div>
        <div className="grid gap-4 md:gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {GIFT_PICKS.map((pick) => (
            <Link
              key={pick.slug}
              href={`/blog/${pick.slug}/`}
              className="group block rounded-2xl border border-rose-200 bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50 p-5 md:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_14px_32px_rgba(0,0,0,0.10)] hover:-translate-y-1 hover:border-rose-400 transition-all duration-300 ease-out"
            >
              <div className="text-[11px] font-bold tracking-widest text-rose-700">
                {pick.label}
              </div>
              <h3 className="mt-2 font-display text-base md:text-lg font-extrabold text-ink-900 leading-snug group-hover:text-rose-700 transition-colors">
                {pick.headline}
              </h3>
              <p className="mt-2 text-xs md:text-sm text-ink-700 leading-relaxed">
                {pick.body}
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-rose-700 group-hover:underline">
                読む
                <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </ScrollReveal>

      {/* Pickup featured pillar/hub articles — surface curated entry points
          in a distinct band, separate from the date-ordered latest grid. */}
      <ScrollReveal as="section" delay={100} className="max-w-6xl mx-auto px-4 py-16">
        <div className="mb-5">
          <SunSpeechBubble>おすすめだよ！読んでみてね☀️</SunSpeechBubble>
        </div>
        <div className="mb-8">
          <h2 className="font-display text-2xl font-bold text-ink-900 flex items-center gap-3">
            <SunOrnament className="w-6 h-6 text-amber-500 shrink-0" />
            <span>お日さまのおすそわけ</span>
          </h2>
          <span aria-hidden="true" className="heading-rule mt-3 ml-9" />
          <p className="mt-3 ml-9 text-sm text-ink-500">
            最近の人気テーマから、編集部がいま読んでほしい記事をピックアップ。
          </p>
        </div>
        {featured.length === 0 ? (
          <p className="text-ink-500 text-sm">準備中です。</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.slice(0, 6).map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        )}
      </ScrollReveal>

      <PositiveBanner
        tone="cream"
        message="大丈夫、うまくいく！"
        mascotSrc="/images/mascot-sun-good.png"
      />

      {/* YouTube channel intro — bridge to /recommend-youtube without
          duplicating the channel cards on the home page. */}
      <ScrollReveal as="section" delay={100} className="max-w-6xl mx-auto px-4 py-16">
        <div className="mb-5">
          <SunSpeechBubble>ちょっと寄ってって〜</SunSpeechBubble>
        </div>
        <div className="mb-8">
          <h2 className="font-display text-2xl font-bold text-ink-900 flex items-center gap-3">
            <SunOrnament className="w-6 h-6 text-amber-500 shrink-0" />
            <span>ちょっと寄ってって</span>
          </h2>
          <span aria-hidden="true" className="heading-rule mt-3 ml-9" />
        </div>
        <Link
          href="/recommend-youtube/"
          className="group block rounded-2xl overflow-hidden border border-amber-200 bg-gradient-to-br from-amber-50 via-rose-50 to-orange-50 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_14px_32px_rgba(0,0,0,0.10)] hover:-translate-y-1 transition-all duration-300 ease-out"
        >
          <div className="grid gap-6 md:grid-cols-[auto_minmax(0,1fr)] items-center p-6 md:p-8">
            <div className="flex items-center justify-center">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/80 flex items-center justify-center shadow-inner">
                <svg viewBox="0 0 24 24" className="w-10 h-10 md:w-12 md:h-12 text-rose-500" fill="currentColor" aria-hidden="true">
                  <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6a3 3 0 0 0-2.1 2.1C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z" />
                </svg>
              </div>
            </div>
            <div>
              <p className="inline-flex items-center gap-2 text-amber-700 text-xs font-bold tracking-widest">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>RECOMMEND</span>
              </p>
              <h3 className="mt-2 font-display text-xl md:text-2xl font-extrabold text-ink-900 leading-snug group-hover:text-amber-700 transition-colors">
                開運に役立つおすすめYouTubeチャンネル
              </h3>
              <p className="mt-3 text-sm md:text-base text-ink-700 leading-relaxed">
                神社・パワースポット・占い・パワーストーン――。
                記事だけでは伝わらない空気感や語り手の熱量は、動画でしか得られないもの。
                Lucky Sun Shine が実際に視聴している、本当に学びになる4チャンネルを厳選して紹介します。
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-amber-700 group-hover:underline">
                おすすめチャンネルを見る
                <span aria-hidden="true">→</span>
              </span>
            </div>
          </div>
        </Link>
      </ScrollReveal>

      <PositiveBanner
        tone="gold"
        message="人生を楽しもう！"
        mascotSrc="/images/mascot-sun-cheer.png"
      />
    </>
  );
}
