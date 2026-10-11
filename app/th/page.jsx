import { getAllPosts } from '@/lib/posts';
import PostCard from '@/components/PostCard';
import SunMascot from '@/components/SunMascot';
import SunOrnament from '@/components/icons/SunOrnament';

export const metadata = {
  title: 'Lucky Sun Shine｜คู่มือคริสตัล สถานที่พลังงานดี และการเสริมดวง (ภาษาไทย)',
  description:
    'Lucky Sun Shine ฉบับภาษาไทย ซันจังพาไปรู้จักเรื่องราวของคริสตัลและพาวเวอร์สปอตในญี่ปุ่น ตั้งแต่การไหว้ศาลเจ้า ไปจนถึงคู่มือเลือกหินตามความต้องการ',
  alternates: { canonical: '/th/' },
};

export default function ThTopPage() {
  const posts = getAllPosts('th');

  return (
    <div lang="th" className="max-w-5xl mx-auto px-4 py-12">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-50 via-rose-50 to-yellow-50 border-2 border-amber-300 px-6 py-10 md:px-12 md:py-14 text-center shadow-[0_6px_24px_rgba(245,158,11,0.12)]">
        <span aria-hidden="true" className="pointer-events-none absolute -top-6 -left-6 text-4xl opacity-60">✨</span>
        <span aria-hidden="true" className="pointer-events-none absolute -bottom-6 -right-6 text-4xl opacity-60">✨</span>
        <div className="flex justify-center">
          <SunMascot
            size={140}
            priority
            alt="ซันจัง — มาสคอตของ Lucky Sun Shine"
            className="drop-shadow-[0_4px_12px_rgba(245,158,11,0.25)]"
          />
        </div>
        <p className="mt-4 text-amber-700 text-xs font-bold tracking-widest">LUCKY SUN SHINE ・ ภาษาไทย</p>
        <h1 className="mt-2 font-display text-3xl md:text-4xl font-extrabold text-ink-900">
          สวัสดี! ฉันซันจัง☀️
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-base md:text-lg text-ink-800 leading-loose">
          Lucky Sun Shine เป็นเว็บไซต์ญี่ปุ่นที่แนะนำเรื่องคริสตัลและหินนำโชค สถานที่พลังงานดีในญี่ปุ่น
          และนิสัยเล็กๆ ที่ช่วยให้ชีวิตสดใสขึ้น ตอนนี้เราคัดบทความบางส่วนมาแปลเป็นภาษาไทยก่อน
          ค่อยๆ อ่านไปได้เลยนะ
        </p>
      </section>

      <section className="mt-14">
        <div className="mb-6">
          <h2 className="font-display text-xl md:text-2xl font-bold text-ink-900 flex items-center gap-3">
            <SunOrnament className="w-5 h-5 md:w-6 md:h-6 text-amber-500 shrink-0" />
            <span>บทความคัดสรร</span>
          </h2>
          <span aria-hidden="true" className="heading-rule mt-3 ml-8" />
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} locale="th" />
          ))}
        </div>
      </section>

      <section className="mt-14 text-center text-sm text-ink-500">
        <p>
          ตอนนี้ฉบับภาษาไทยมีเฉพาะบทความคัดสรร อยากอ่านเพิ่มเติม?
          <br />
          เชิญอ่านที่
          <a href="/" className="mx-1 underline hover:text-amber-700">ฉบับภาษาญี่ปุ่น</a>
          หรือ
          <a href="/en/" className="mx-1 underline hover:text-amber-700">ฉบับภาษาอังกฤษ</a>
          ได้เลย
        </p>
      </section>
    </div>
  );
}
