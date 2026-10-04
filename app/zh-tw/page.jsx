import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import PostCard from '@/components/PostCard';
import SunMascot from '@/components/SunMascot';
import SunOrnament from '@/components/icons/SunOrnament';

export const metadata = {
  title: 'Lucky Sun Shine｜水晶・能量景點與開運指南（繁體中文）',
  description:
    'Lucky Sun Shine 繁體中文版。太陽醬為你介紹水晶能量石與日本能量景點的開運故事，從《鬼滅之刃》《你的名字》《神隱少女》《犬夜叉》的聖地巡禮，到誕生石與生肖水晶指南。',
  alternates: { canonical: '/zh-tw/' },
};

export default function ZhTwTopPage() {
  const posts = getAllPosts('zh-tw');

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* ヒーロー: 太陽醬の紹介 */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-50 via-rose-50 to-yellow-50 border-2 border-amber-300 px-6 py-10 md:px-12 md:py-14 text-center shadow-[0_6px_24px_rgba(245,158,11,0.12)]">
        <span aria-hidden="true" className="pointer-events-none absolute -top-6 -left-6 text-4xl opacity-60">✨</span>
        <span aria-hidden="true" className="pointer-events-none absolute -bottom-6 -right-6 text-4xl opacity-60">✨</span>
        <div className="flex justify-center">
          <SunMascot
            size={140}
            priority
            alt="太陽醬 — Lucky Sun Shine 的官方吉祥物"
            className="drop-shadow-[0_4px_12px_rgba(245,158,11,0.25)]"
          />
        </div>
        <p className="mt-4 text-amber-700 text-xs font-bold tracking-widest">LUCKY SUN SHINE ・ 繁體中文版</p>
        <h1 className="mt-2 font-display text-3xl md:text-4xl font-extrabold text-ink-900">
          哈囉！我是太陽醬☀️
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-base md:text-lg text-ink-800 leading-relaxed">
          Lucky Sun Shine 是一個介紹水晶能量石、日本能量景點與開運生活習慣的日本網站。
          這裡先為台灣的朋友準備了幾篇精選文章——從《鬼滅之刃》《你的名字》《神隱少女》《犬夜叉》等動漫背後的真實聖地，
          到 365 天誕生石、生肖守護石、水晶禁忌搭配與居家風水方位的開運指南，歡迎慢慢閱讀！
        </p>
        <Link
          href="/zh-tw/about-mascot/"
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-100 border border-amber-300 text-amber-800 font-bold hover:bg-amber-200 hover:shadow-[0_0_14px_rgba(245,158,11,0.45)] transition-all"
        >
          <span aria-hidden="true">☀️</span>
          認識太陽醬，還有 LINE 貼圖！
          <span aria-hidden="true">→</span>
        </Link>
      </section>

      {/* 記事一覧 */}
      <section className="mt-14">
        <div className="mb-6">
          <h2 className="font-display text-xl md:text-2xl font-bold text-ink-900 flex items-center gap-3">
            <SunOrnament className="w-5 h-5 md:w-6 md:h-6 text-amber-500 shrink-0" />
            <span>精選文章</span>
          </h2>
          <span aria-hidden="true" className="heading-rule mt-3 ml-8" />
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} locale="zh-tw" />
          ))}
        </div>
      </section>

      {/* 提醒：目前僅繁體中文精選內容 */}
      <section className="mt-14 text-center text-sm text-ink-500">
        <p>
          目前繁體中文版僅提供精選文章。想閱讀更多內容嗎？
          <br />
          歡迎瀏覽
          <a href="https://lucky-sun-shine.com/" className="mx-1 underline hover:text-amber-700">日文版</a>
          或
          <a href="https://lucky-sun-shine.com/en/" className="mx-1 underline hover:text-amber-700">英文版</a>
          網站。
        </p>
      </section>
    </div>
  );
}
