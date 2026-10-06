import ReactDOM from 'react-dom';
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
  title: 'Lucky Sun Shine | Crystals, Power Spots & Good Luck Guide',
  description:
    'Discover the latest info on crystals, power spots, lucky items, and habits to boost your fortune. Start your lucky action today!',
};

// カテゴリ名の英語変換用辞書
const categoryEnMap = {
  'パワーストーン': { title: 'Crystals', tagline: 'A complete guide to stones and their meanings.' },
  'パワースポット': { title: 'Power Spots', tagline: 'Sacred places filled with nature\'s energy.' },
  '開運グッズ': { title: 'Lucky Items', tagline: 'Everyday items to invite good fortune.' },
  '運気アップ習慣': { title: 'Good Luck Habits', tagline: 'Small daily routines to brighten your life.' },
};

const WORRY_PICKS = [
  {
    slug: 'powerstone-broken-meaning',
    emoji: '💔',
    headline: 'My stone broke...',
    body: 'Is it taking the fall for me? Understand the meaning and your next steps.',
  },
  {
    slug: 'bad-combination-stones',
    emoji: '⚠️',
    headline: 'Bad combinations?',
    body: 'The truth about stones that supposedly don\'t mix well together.',
  },
  {
    slug: 'fake-stone-identification',
    emoji: '🔍',
    headline: 'How to spot fakes',
    body: 'Imitations, treatments, and synthetics: A beginner\'s guide to identifying stones.',
  },
  {
    slug: 'left-right-hand-powerstone',
    emoji: '🤲',
    headline: 'Left or right hand?',
    body: 'Does the meaning change? How to choose which wrist to wear your bracelet on.',
  },
];

const PURPOSE_PICKS = [
  { slug: 'purpose-money-stones',      label: 'Wealth',       emoji: '💰', tone: 'from-amber-50 via-yellow-50 to-orange-50',   accent: 'text-amber-700',  border: 'border-amber-300'   },
  { slug: 'purpose-love-stones',       label: 'Love',         emoji: '💗', tone: 'from-rose-50 via-pink-50 to-amber-50',      accent: 'text-rose-600',   border: 'border-rose-300'    },
  { slug: 'purpose-work-stones',       label: 'Career',       emoji: '💼', tone: 'from-sky-50 via-indigo-50 to-amber-50',      accent: 'text-sky-700',    border: 'border-sky-300'     },
  { slug: 'purpose-health-stones',     label: 'Health',       emoji: '🌿', tone: 'from-emerald-50 via-lime-50 to-amber-50',    accent: 'text-emerald-700', border: 'border-emerald-300' },
  { slug: 'purpose-relation-stones',   label: 'Relations',    emoji: '🤝', tone: 'from-orange-50 via-amber-50 to-yellow-50',   accent: 'text-orange-700',  border: 'border-orange-300'  },
  { slug: 'purpose-protection-stones', label: 'Protection',   emoji: '🛡️', tone: 'from-violet-50 via-purple-50 to-amber-50',   accent: 'text-violet-700',  border: 'border-violet-300'  },
];

const FENGSHUI_PICKS = [
  {
    slug: 'fengshui-direction-stones',
    label: 'By Direction',
    headline: 'Stones by Direction',
    body: 'North, South, East, West, and Center. Guardian stones for every direction.',
  },
  {
    slug: 'fengshui-room-stones',
    label: 'By Room',
    headline: 'Stones for Every Room',
    body: 'Living room, bedroom, kitchen. The best stone matches for each space.',
  },
  {
    slug: 'genkan-powerstone-guide',
    label: 'Entrance',
    headline: 'Entrance Feng Shui',
    body: 'Invite good energy and block the bad. A beginner guide to entrance stones.',
  },
  {
    slug: 'fengshui-desk-stones',
    label: 'Desk',
    headline: 'Stones for Your Desk',
    body: 'Focus, relationships, and wealth. Boost your career with desk Feng Shui.',
  },
];

const GIFT_PICKS = [
  {
    slug: 'powerstone-gift-guide',
    label: 'Gift Guide',
    headline: 'Crystal Gift Guide',
    body: 'How to choose by recipient and budget, plus message ideas to include.',
  },
  {
    slug: 'birthday-gift-stones',
    label: 'Birthdays',
    headline: 'Birthday Stones',
    body: 'Tips for choosing a special stone based on birthstones and birth months.',
  },
  {
    slug: 'christmas-stones',
    label: 'Christmas',
    headline: 'Christmas Stones',
    body: 'Warm and beautiful stones perfect for a holy winter night gift.',
  },
];

const FEATURED_SLUGS = [
  'powerstone-broken-meaning',
  'bad-combination-stones',
  'fake-stone-identification',
  'left-right-hand-powerstone',
  'fengshui-room-stones',
  'powerstone-gift-guide',
];

export default function EnHomePage() {
  ReactDOM.preload('/images/hero-crystals-480.webp', { as: 'image', fetchPriority: 'high', media: '(max-width: 480px)' });
  ReactDOM.preload('/images/hero-crystals-640.webp', { as: 'image', fetchPriority: 'high', media: '(min-width: 481px) and (max-width: 640px)' });
  ReactDOM.preload('/images/hero-crystals-960.webp', { as: 'image', fetchPriority: 'high', media: '(min-width: 641px) and (max-width: 960px)' });
  ReactDOM.preload('/images/hero-crystals.webp',     { as: 'image', fetchPriority: 'high', media: '(min-width: 961px)' });

  // 英語ロケールを指定して記事を取得
  const posts = getAllPosts('en');
  const latest = posts.slice(0, 10);
  const featured = FEATURED_SLUGS
    .map((slug) => posts.find((p) => p.slug === slug))
    .filter(Boolean);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden isolate">
        <picture aria-hidden="true" className="absolute inset-0 -z-10 pointer-events-none">
          <source media="(max-width: 480px)"  srcSet="/images/hero-crystals-480.webp" type="image/webp" />
          <source media="(max-width: 640px)"  srcSet="/images/hero-crystals-640.webp" type="image/webp" />
          <source media="(max-width: 960px)"  srcSet="/images/hero-crystals-960.webp" type="image/webp" />
          <img
            src="/images/hero-crystals.webp"
            alt=""
            width={1376}
            height={768}
            fetchPriority="high"
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover object-center select-none"
          />
        </picture>
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
                Brighten your days <br className="md:hidden" />
                like the sun.
              </span>
              <SunOrnament className="hidden md:inline-block w-6 h-6 text-amber-500 opacity-70 shrink-0" strokeWidth={1.1} />
            </span>
          </h1>
          <div className="mt-6 flex items-center justify-center gap-3 md:gap-5">
            <SunMascot
              size={112}
              src="/images/mascot-sun-morning.png"
              className="shrink-0 md:!w-48 md:!h-48"
              priority
              alt="Sun-chan (GOOD MORNING!)"
            />
            <div className="space-y-2 font-display font-bold text-amber-700 leading-snug text-left">
              <p className="text-lg md:text-2xl">When your mood goes up, your luck goes up!</p>
              <p className="text-lg md:text-2xl">You are absolutely lucky!</p>
            </div>
          </div>
          <div className="mt-6 flex justify-center">
            <SunSpeechBubble>Welcome☀️ I've been waiting for you!</SunSpeechBubble>
          </div>
          <p className="mt-6 max-w-2xl mx-auto text-ink-700 text-sm md:text-base leading-relaxed">
            Crystals, power spots, lucky items, and good luck habits.<br />
            A media dedicated to bringing a "little good omen" into your daily life.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            {categories.map((c) => {
              const catInfo = categoryEnMap[c.title] || { title: c.title };
              return (
                <Link prefetch={false}
                  key={c.slug}
                  href={`/category/${c.slug}/`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm border border-amber-200 text-sm font-medium text-amber-900 hover:bg-amber-50 hover:border-amber-400 transition-colors"
                >
                  <CategoryIcon slug={c.slug} className="w-4 h-4 text-amber-600" />
                  {catInfo.title}
                </Link>
              );
            })}
          </div>
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

      <DailyMessage locale="en" />

      {/* LINE Stickers */}
      <div className="max-w-6xl mx-auto px-4 mt-16 md:mt-20 mb-10 md:mb-14">
        <div className="rounded-2xl bg-gradient-to-r from-green-300 via-emerald-200 to-green-300 p-1 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="block rounded-xl bg-white/95 px-5 py-16 md:py-20 md:px-10 text-center backdrop-blur-sm">
            <span className="inline-block rounded-full bg-[#06C755] px-4 py-1.5 text-xs font-bold tracking-wider text-white mb-8 shadow-sm">
              ✨ NEW RELEASE ✨
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-amber-500 drop-shadow-sm mb-8 leading-snug">
              Out Now! LINE Stickers featuring<br className="sm:hidden" /> "Sun-chan", the lucky angel!
            </h2>
            <p className="text-sm md:text-base font-medium text-ink-600 mb-10 leading-relaxed max-w-2xl mx-auto">
              Thank you for always visiting "Lucky Sun Shine"!<br />
              Our adorable mascot, "Sun-chan", is now available as LINE stickers for your daily chats☀️<br />
              Filled with happy and positive energy like "GOOD MORNING!", "THANK YOU!", and "CHEER UP!"✨<br />
              <span className="inline-block mt-5 font-bold text-amber-600">
                Send them to your friends and family to boost everyone's luck!
              </span>
            </p>
            <a
              href="https://store.line.me/stickershop/product/31602987/en"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-[#06C755] text-white font-bold text-base md:text-lg py-4 px-12 rounded-full shadow-md hover:bg-green-600 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              👉 Check it out on LINE STORE!
            </a>
          </div>
        </div>
      </div>

      {/* Trending */}
      <ScrollReveal as="section" className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        <div className="flex justify-center mb-4">
          <SunSpeechBubble>Our go-to reads, picked for you!✨</SunSpeechBubble>
        </div>
        <div className="text-center mb-8">
          <h2 className="mt-2 font-display text-2xl md:text-3xl font-extrabold text-ink-900">
            ✨ Classic Favorites
          </h2>
          <p className="mt-3 text-sm md:text-base text-ink-700">
            A handpicked selection of classic articles on Lucky Sun Shine!
          </p>
        </div>
        <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <Link prefetch={false} href="/en/blog/birthday-stone-365" className="group block rounded-2xl border-2 border-amber-400 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 p-5 md:p-6 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="text-4xl mb-3 drop-shadow-sm">✨</div>
            <div className="text-[11px] font-bold tracking-widest text-amber-700 mb-1">A CLASSIC TO START WITH</div>
            <h3 className="font-display text-lg md:text-xl font-extrabold text-ink-900 leading-snug group-hover:text-amber-700 transition-colors">
              365 Days of Birthstones
            </h3>
            <p className="mt-3 text-sm text-ink-700 leading-relaxed">
              Find your birth date's guardian stone and invite good fortune.
            </p>
          </Link>

          <Link prefetch={false} href="/en/blog/bad-combination-stones" className="group block rounded-2xl border-2 border-slate-300 bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-100 p-5 md:p-6 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="text-4xl mb-3 drop-shadow-sm">✨</div>
            <div className="text-[11px] font-bold tracking-widest text-slate-600 mb-1">GOOD TO KNOW</div>
            <h3 className="font-display text-lg md:text-xl font-extrabold text-ink-900 leading-snug group-hover:text-slate-700 transition-colors">
              Bad Stone Combinations?
            </h3>
            <p className="mt-3 text-sm text-ink-700 leading-relaxed">
              The truth about stones that supposedly don't mix. The right knowledge to keep your luck up.
            </p>
          </Link>

          <Link prefetch={false} href="/en/blog/genkan-powerstone-guide" className="group block rounded-2xl border-2 border-orange-300 bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50 p-5 md:p-6 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="text-4xl mb-3 drop-shadow-sm">✨</div>
            <div className="text-[11px] font-bold tracking-widest text-orange-700 mb-1">FOR YOUR ENTRANCE</div>
            <h3 className="font-display text-lg md:text-xl font-extrabold text-ink-900 leading-snug group-hover:text-orange-700 transition-colors">
              Entrance Crystals Guide
            </h3>
            <p className="mt-3 text-sm text-ink-700 leading-relaxed">
              Invite good energy and block the bad. How to choose and place stones at your entrance.
            </p>
          </Link>

          <Link prefetch={false} href="/en/blog/fengshui-room-stones" className="group block rounded-2xl border-2 border-emerald-300 bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-100 p-5 md:p-6 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="text-4xl mb-3 drop-shadow-sm">✨</div>
            <div className="text-[11px] font-bold tracking-widest text-emerald-700 mb-1">FOR EVERY ROOM</div>
            <h3 className="font-display text-lg md:text-xl font-extrabold text-ink-900 leading-snug group-hover:text-emerald-700 transition-colors">
              Feng Shui Stones by Room
            </h3>
            <p className="mt-3 text-sm text-ink-700 leading-relaxed">
              Living room, bedroom, kitchen. A quick chart for placing selected stones in 7 spaces.
            </p>
          </Link>

          <Link prefetch={false} href="/en/blog/sazare-ishi-guide" className="group block rounded-2xl border-2 border-sky-300 bg-gradient-to-br from-sky-50 via-blue-50 to-sky-100 p-5 md:p-6 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="text-4xl mb-3 drop-shadow-sm">✨</div>
            <div className="text-[11px] font-bold tracking-widest text-sky-700 mb-1">PURIFICATION STAPLE</div>
            <h3 className="font-display text-lg md:text-xl font-extrabold text-ink-900 leading-snug group-hover:text-sky-700 transition-colors">
              Crushed Stones Guide
            </h3>
            <p className="mt-3 text-sm text-ink-700 leading-relaxed">
              From purification to interior design. The essential item to extend your stone's life.
            </p>
          </Link>
        </div>
      </ScrollReveal>

      {/* 🔮 Nine Star Ki Calculator entry point */}
      <div className="max-w-6xl mx-auto px-4 mt-2 mb-10 md:mb-14">
        <Link prefetch={false}
          href="/en/kyusei/"
          className="group block rounded-2xl overflow-hidden border border-violet-200 bg-gradient-to-br from-violet-50 via-white to-amber-50 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_14px_32px_rgba(0,0,0,0.10)] hover:-translate-y-1 transition-all duration-300 ease-out"
        >
          <div className="grid gap-6 md:grid-cols-[auto_minmax(0,1fr)] items-center p-6 md:p-8">
            <div className="flex items-center justify-center">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/80 flex items-center justify-center shadow-inner text-4xl md:text-5xl" aria-hidden="true">
                🔮
              </div>
            </div>
            <div>
              <p className="inline-flex items-center gap-2 text-violet-700 text-xs font-bold tracking-widest">
                <Sparkles className="w-4 h-4 text-violet-600" />
                <span>NEW</span>
              </p>
              <h3 className="mt-2 font-display text-xl md:text-2xl font-extrabold text-ink-900 leading-snug group-hover:text-violet-700 transition-colors">
                Nine Star Ki Calculator
              </h3>
              <p className="mt-3 text-sm md:text-base text-ink-700 leading-relaxed">
                Enter your birth date to find your main star, personality, lucky crystals, and this year's lucky directions ☀️
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-violet-700 group-hover:underline">
                Find your star
                <span aria-hidden="true">→</span>
              </span>
            </div>
          </div>
        </Link>
      </div>

      {/* 365 Birthstones Banner */}
      <div className="max-w-6xl mx-auto px-4 mt-6 md:mt-8 mb-16 md:mb-20">
        <div className="rounded-2xl bg-gradient-to-r from-amber-300 via-orange-200 to-amber-300 p-1 shadow-sm hover:shadow-md transition-all">
          <Link prefetch={false} href="/en/blog/birthday-stone-365" className="block rounded-xl bg-white/80 px-4 py-10 md:py-12 text-center backdrop-blur-sm transition-colors hover:bg-white/95 sm:px-6">
            <span className="inline-block rounded-full bg-orange-500 px-3 py-1 text-xs font-bold tracking-wider text-white mb-4">
              🔥 Trending Now! Most Read Article
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink-900 mb-3">
              365 Days of Birthstones 💎
            </h2>
            <p className="text-sm md:text-base font-medium text-ink-600">
              Find your birth date's guardian stone and invite good fortune!
            </p>
          </Link>
        </div>
      </div>

      <SunDivider />

      {/* Categories */}
      <ScrollReveal as="section" className="max-w-6xl mx-auto px-4 py-16">
        <div className="mb-5">
          <SunSpeechBubble>Where to boost your luck?</SunSpeechBubble>
        </div>
        <div className="mb-8">
          <h2 className="font-display text-2xl font-bold text-ink-900 flex items-center gap-3">
            <SunOrnament className="w-6 h-6 text-amber-500 shrink-0" />
            <span>Where should we boost your luck today?</span>
          </h2>
          <span aria-hidden="true" className="heading-rule mt-3 ml-9" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => {
            const catInfo = categoryEnMap[c.title] || { title: c.title, tagline: c.tagline };
            return (
              <Link prefetch={false}
                key={c.slug}
                href={`/category/${c.slug}/`}
                className={`group block rounded-2xl p-5 overflow-hidden border border-white/60 ${c.pastel.bg} shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_14px_32px_rgba(0,0,0,0.10)] hover:-translate-y-1 transition-all duration-300 ease-out`}
              >
                <CategoryIcon
                  slug={c.slug}
                  className={`w-10 h-10 mb-3 ${c.pastel.accent} transition-transform duration-500 ease-out group-hover:scale-105`}
                />
                <h3 className={`font-display font-bold text-lg ${c.pastel.accent} transition-colors`}>{catInfo.title}</h3>
                <p className="mt-1 text-xs text-[#5A5A5A] leading-relaxed">{catInfo.tagline}</p>
              </Link>
            );
          })}
        </div>
      </ScrollReveal>

      <PositiveBanner
        tone="pink"
        message="You are awesome!"
        mascotSrc="/images/mascot-sun-yay.png"
      />

      {/* Troubleshooting Guides */}
      <ScrollReveal as="section" className="max-w-6xl mx-auto px-4 py-16">
        <div className="mb-5">
          <SunSpeechBubble>Let's untangle those worries☀️</SunSpeechBubble>
        </div>
        <div className="mb-8">
          <h2 className="font-display text-2xl font-bold text-ink-900 flex items-center gap-3">
            <SunOrnament className="w-6 h-6 text-amber-500 shrink-0" />
            <span>Troubleshooting Guide</span>
          </h2>
          <span aria-hidden="true" className="heading-rule mt-3 ml-9" />
          <p className="mt-3 ml-9 text-sm text-ink-500">
            Straight answers to the most common "Is this okay?" questions.
          </p>
        </div>
        <div className="grid gap-4 md:gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WORRY_PICKS.map((pick) => (
            <Link prefetch={false}
              key={pick.slug}
              href={`/en/blog/${pick.slug}/`}
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
                Read
                <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </ScrollReveal>

      {/* Find by Purpose */}
      <ScrollReveal as="section" delay={50} className="max-w-6xl mx-auto px-4 pb-16">
        <div className="mb-5">
          <SunSpeechBubble>Choose by the luck you want✨</SunSpeechBubble>
        </div>
        <div className="mb-8">
          <h2 className="font-display text-2xl font-bold text-ink-900 flex items-center gap-3">
            <SunOrnament className="w-6 h-6 text-amber-500 shrink-0" />
            <span>Find by Purpose</span>
          </h2>
          <span aria-hidden="true" className="heading-rule mt-3 ml-9" />
          <p className="mt-3 ml-9 text-sm text-ink-500">
            Wealth, love, career, health, relationships, or protection. Find the perfect stone for the luck you need most right now.
          </p>
        </div>
        <div className="grid gap-3 md:gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
          {PURPOSE_PICKS.map((pick) => (
            <Link prefetch={false}
              key={pick.slug}
              href={`/en/blog/${pick.slug}/`}
              className={`group block rounded-2xl border ${pick.border} bg-gradient-to-br ${pick.tone} p-4 md:p-5 text-center shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_14px_32px_rgba(0,0,0,0.10)] hover:-translate-y-1 transition-all duration-300 ease-out`}
            >
              <div className="text-3xl md:text-4xl" aria-hidden="true">{pick.emoji}</div>
              <h3 className={`mt-2 font-display text-sm md:text-base font-extrabold ${pick.accent}`}>
                {pick.label}
              </h3>
              <span className="mt-1 block text-[10px] md:text-xs text-ink-500 group-hover:underline">
                View Stones →
              </span>
            </Link>
          ))}
        </div>
      </ScrollReveal>

      <PositiveBanner tone="peach" message="Thankful for today!" />

      {/* Latest posts + sidebar popular */}
      <ScrollReveal as="section" delay={100} className="cv-section-lg max-w-6xl mx-auto px-4 py-16 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0">
          <div className="mb-5">
            <SunSpeechBubble>Here's what we've been gathering✨</SunSpeechBubble>
          </div>
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="font-display text-2xl font-bold text-ink-900 flex items-center gap-3">
                <SunOrnament className="w-6 h-6 text-amber-500 shrink-0" />
                <span>Latest Articles</span>
              </h2>
              <span aria-hidden="true" className="heading-rule mt-3 ml-9" />
            </div>
            <span className="text-sm text-ink-500">{posts.length} articles</span>
          </div>
          {latest.length === 0 ? (
            <p className="text-ink-500 text-sm">Articles are being prepared.</p>
          ) : (
            <>
              <div className="grid gap-5 sm:grid-cols-2">
                {latest.map((p) => (
                  <PostCard locale="en" key={p.slug} post={p} />
                ))}
              </div>
              <div className="mt-8 text-center">
                <Link prefetch={false}
                  href="/en/blog/"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-500 text-white font-bold text-sm shadow-[0_4px_14px_rgba(245,158,11,0.35)] hover:bg-amber-600 hover:shadow-[0_8px_22px_rgba(245,158,11,0.45)] transition-all"
                >
                  View all articles
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </>
          )}
        </div>
        <div className="space-y-6">
          <PopularPosts limit={5} locale="en" />
        </div>
      </ScrollReveal>

      {/* Feng Shui */}
      <ScrollReveal as="section" className="cv-section max-w-6xl mx-auto px-4 pb-16">
        <div className="mb-5">
          <SunSpeechBubble>Let's align the energy flow🌬️</SunSpeechBubble>
        </div>
        <div className="mb-8">
          <h2 className="font-display text-2xl font-bold text-ink-900 flex items-center gap-3">
            <SunOrnament className="w-6 h-6 text-amber-500 shrink-0" />
            <span>Feng Shui for Good Luck</span>
          </h2>
          <span aria-hidden="true" className="heading-rule mt-3 ml-9" />
          <p className="mt-3 ml-9 text-sm text-ink-500">
            Directions, rooms, entrances, and desks. Optimize the energy pathways in your home and workspace.
          </p>
        </div>
        <div className="grid gap-4 md:gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FENGSHUI_PICKS.map((pick) => (
            <Link prefetch={false}
              key={pick.slug}
              href={`/en/blog/${pick.slug}/`}
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
                Read
                <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </ScrollReveal>

      {/* Seasonal Feature */}
      <ScrollReveal as="section" className="cv-section max-w-6xl mx-auto px-4 pb-16">
        <Link prefetch={false}
          href="/en/blog/summer-stones/"
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
                Perfect Crystals for Summer
              </h3>
              <p className="mt-3 text-sm md:text-base text-ink-700 leading-relaxed">
                Strong sunlight, summer fatigue, and crowded exhaustion. These cool and refreshing stones will gently balance your energy during the hot season.
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-sky-700 group-hover:underline">
                Read Summer Feature
                <span aria-hidden="true">→</span>
              </span>
            </div>
          </div>
        </Link>
      </ScrollReveal>

      {/* Gift Guide */}
      <ScrollReveal as="section" className="cv-section max-w-6xl mx-auto px-4 pb-16">
        <div className="mb-5">
          <SunSpeechBubble>Gifts for your loved ones🎁</SunSpeechBubble>
        </div>
        <div className="mb-8">
          <h2 className="font-display text-2xl font-bold text-ink-900 flex items-center gap-3">
            <SunOrnament className="w-6 h-6 text-amber-500 shrink-0" />
            <span>Gift Guide</span>
          </h2>
          <span aria-hidden="true" className="heading-rule mt-3 ml-9" />
          <p className="mt-3 ml-9 text-sm text-ink-500">
            Birthdays, Christmas, anniversaries. How to choose stones that truly convey your feelings.
          </p>
        </div>
        <div className="grid gap-4 md:gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {GIFT_PICKS.map((pick) => (
            <Link prefetch={false}
              key={pick.slug}
              href={`/en/blog/${pick.slug}/`}
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
                Read
                <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </ScrollReveal>

      {/* Editor's Picks */}
      <ScrollReveal as="section" delay={100} className="cv-section-lg max-w-6xl mx-auto px-4 py-16">
        <div className="mb-5">
          <SunSpeechBubble>Highly recommended! Take a look☀️</SunSpeechBubble>
        </div>
        <div className="mb-8">
          <h2 className="font-display text-2xl font-bold text-ink-900 flex items-center gap-3">
            <SunOrnament className="w-6 h-6 text-amber-500 shrink-0" />
            <span>Editor's Shared Picks</span>
          </h2>
          <span aria-hidden="true" className="heading-rule mt-3 ml-9" />
          <p className="mt-3 ml-9 text-sm text-ink-500">
            Hand-picked recommendations from our editorial team based on current popular themes.
          </p>
        </div>
        {featured.length === 0 ? (
          <p className="text-ink-500 text-sm">Preparing content.</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.slice(0, 6).map((p) => (
              <PostCard locale="en" key={p.slug} post={p} />
            ))}
          </div>
        )}
      </ScrollReveal>

      <PositiveBanner
        tone="cream"
        message="Everything will be alright!"
        mascotSrc="/images/mascot-sun-good.png"
      />

      {/* YouTube channel intro */}
      <ScrollReveal as="section" delay={100} className="cv-section max-w-6xl mx-auto px-4 py-16">
        <div className="mb-5">
          <SunSpeechBubble>Drop by for a bit!</SunSpeechBubble>
        </div>
        <div className="mb-8">
          <h2 className="font-display text-2xl font-bold text-ink-900 flex items-center gap-3">
            <SunOrnament className="w-6 h-6 text-amber-500 shrink-0" />
            <span>Check This Out</span>
          </h2>
          <span aria-hidden="true" className="heading-rule mt-3 ml-9" />
        </div>
        <Link prefetch={false}
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
                Recommended YouTube Channels for Good Luck
              </h3>
              <p className="mt-3 text-sm md:text-base text-ink-700 leading-relaxed">
                Shrines, power spots, fortune-telling, and crystals. There are atmospheres and passions you can only truly grasp through video. Here are 4 channels carefully selected by Lucky Sun Shine that are genuinely worth watching.
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-amber-700 group-hover:underline">
                View Recommended Channels
                <span aria-hidden="true">→</span>
              </span>
            </div>
          </div>
        </Link>
      </ScrollReveal>

      <PositiveBanner
        tone="gold"
        message="Enjoy life!"
        mascotSrc="/images/mascot-sun-cheer.png"
      />
    </>
  );
}