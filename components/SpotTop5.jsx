import Link from 'next/link';
import ScrollReveal from './ScrollReveal';
import RotatingSpeechBubble from './RotatingSpeechBubble';

// 「まず行きたい！パワースポット TOP5」の多言語版（en / zh-tw / th）。
// 日本語トップ(app/page.jsx)と同じ並び・同じ水彩サムネ。リンクは各言語版の記事へ。
const SPOTS = [
  { slug: 'tokyo-daijingu', img: 'spot-tokyo-daijingu' },
  { slug: 'izumo-taisha', img: 'spot-izumo-taisha' },
  { slug: 'ise-jingu-power-spot', img: 'spot-ise-jingu' },
  { slug: 'meiji-jingu', img: 'spot-meiji-jingu' },
  { slug: 'itsukushima-jinja', img: 'spot-itsukushima' },
];
const BADGE = ['🥇', '🥈', '🥉', '🏅', '🏅'];

const T = {
  en: {
    prefix: '/en',
    heading: '⛩️ Top 5 Power Spots to Visit First',
    sub: 'For days you want love luck or a calmer mind. Easy-to-visit shrines, picked by our editors.',
    more: 'See more power spots →',
    rank: (n) => `#${n}`,
    alt: (name) => `Watercolor illustration of ${name}`,
    spots: [
      { name: 'Tokyo Daijingu', hook: 'Famous for matchmaking, right in central Tokyo' },
      { name: 'Izumo Taisha', hook: 'Japan’s sacred land of love and good relationships' },
      { name: 'Ise Jingu', hook: 'The spiritual heart of Japan. Worth a visit at least once' },
      { name: 'Meiji Jingu', hook: 'A forest in the city to settle your mind' },
      { name: 'Itsukushima Shrine', hook: 'Three goddesses and the famous floating torii' },
    ],
    bubbles: [
      'There’s a shrine waiting to meet you✨',
      'One small step today can bring good luck⛩️',
      'Just visiting a shrine can make your heart feel lighter✨',
      'Wanting to go somewhere is already a lovely sign⛩️',
      'The shrine that caught your eye is today’s right answer⛩️',
    ],
  },
  'zh-tw': {
    prefix: '/zh-tw',
    heading: '⛩️ 先去這裡！能量景點 TOP5',
    sub: '想求好姻緣、想讓心安定下來的日子，編輯部精選了好去的神社。',
    more: '看更多能量景點 →',
    rank: (n) => `第${n}名`,
    alt: (name) => `${name}的水彩插畫`,
    spots: [
      { name: '東京大神宮', hook: '以結緣聞名，就在東京都心的神社' },
      { name: '出雲大社', hook: '公認的結緣聖地' },
      { name: '伊勢神宮', hook: '日本人的心靈故鄉，一生至少去一次' },
      { name: '明治神宮', hook: '在都會的森林裡，讓心安定下來' },
      { name: '嚴島神社', hook: '供奉三女神，海上大鳥居最受歡迎' },
    ],
    bubbles: [
      '一定有一間神社，正在等你✨',
      '今天踏出的一步，會帶來好運⛩️',
      '光是走進神社，心就會輕盈起來✨',
      '有想去的地方，本身就很美好⛩️',
      '讓你在意的那間神社，就是今天的答案⛩️',
    ],
  },
  th: {
    prefix: '/th',
    heading: '⛩️ 5 พาวเวอร์สปอตที่อยากไปก่อน!',
    sub: 'ในวันที่อยากได้ความรัก หรืออยากให้ใจสงบ เราคัดศาลเจ้าที่ไปง่ายมาให้',
    more: 'ดูพาวเวอร์สปอตเพิ่มเติม →',
    rank: (n) => `อันดับ ${n}`,
    alt: (name) => `ภาพสีน้ำของ${name}`,
    spots: [
      { name: 'ศาลเจ้าโตเกียวไดจิงกู', hook: 'ขึ้นชื่อเรื่องเนื้อคู่ ใจกลางโตเกียว' },
      { name: 'อิซุโมะไทฉะ', hook: 'แดนศักดิ์สิทธิ์แห่งความรักและสายสัมพันธ์' },
      { name: 'อิเสะจิงกู', hook: 'บ้านเกิดทางใจของคนญี่ปุ่น ควรไปสักครั้ง' },
      { name: 'ศาลเจ้าเมจิ', hook: 'ป่าใจกลางเมือง ช่วยให้ใจสงบ' },
      { name: 'ศาลเจ้าอิสึคุชิมะ', hook: 'เทพธิดาสามองค์ และเสาโทริลอยน้ำที่ใครๆ ก็รัก' },
    ],
    bubbles: [
      'ต้องมีศาลเจ้าที่รอเจอเธออยู่แน่ๆ เลย✨',
      'ก้าวเล็กๆ ของวันนี้ นำโชคดีมาให้นะ⛩️',
      'แค่ไปศาลเจ้า ใจก็เบาสบายขึ้นได้นะ✨',
      'การมีที่ที่อยากไป ก็เป็นเรื่องน่ารักแล้ว⛩️',
      'ศาลเจ้าที่เธอสนใจ คือคำตอบของวันนี้เลย⛩️',
    ],
  },
};

export default function SpotTop5({ locale }) {
  const t = T[locale];
  return (
    <ScrollReveal as="section" className="max-w-3xl mx-auto px-4 pt-2 md:pt-4 pb-8 md:pb-12">
      <div className="flex justify-center mb-4">
        <RotatingSpeechBubble messages={t.bubbles} />
      </div>
      <div className="text-center mb-8">
        <h2 className="mt-2 font-display text-2xl md:text-3xl font-extrabold text-ink-900">{t.heading}</h2>
        <p className="mt-3 text-sm md:text-base text-ink-700">{t.sub}</p>
      </div>
      <ol className="space-y-3 md:space-y-4">
        {SPOTS.map((spot, i) => (
          <li key={spot.slug}>
            <Link prefetch={false} href={`${t.prefix}/blog/${spot.slug}/`} className="group flex items-center gap-4 rounded-2xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-3 md:p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-emerald-400 transition-all duration-300">
              <span className="text-3xl md:text-4xl shrink-0 w-10 text-center drop-shadow-sm" aria-hidden="true">{BADGE[i]}</span>
              <img
                src={`/images/ranking/${spot.img}.webp`}
                alt={t.alt(t.spots[i].name)}
                width="320"
                height="320"
                loading="lazy"
                decoding="async"
                className="w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover shrink-0 border border-emerald-100"
              />
              <div className="min-w-0">
                <div className="text-xs font-extrabold text-emerald-700">{t.rank(i + 1)}</div>
                <h3 className="font-display text-lg md:text-xl font-extrabold text-ink-900 leading-snug group-hover:text-emerald-700 transition-colors">{t.spots[i].name}</h3>
                <p className="mt-1 text-sm text-ink-700 leading-relaxed">{t.spots[i].hook}</p>
              </div>
            </Link>
          </li>
        ))}
      </ol>
      <div className="mt-6 text-center">
        <Link prefetch={false} href={`${t.prefix}/category/powerspots/`} className="inline-flex items-center gap-1 text-sm md:text-base font-bold text-emerald-700 hover:underline">
          {t.more}
        </Link>
      </div>
    </ScrollReveal>
  );
}
