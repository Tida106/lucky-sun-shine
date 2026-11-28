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
const RANK_STYLES = [
  { box: 'border-yellow-400 hover:border-yellow-600 from-yellow-100 via-yellow-50 to-white', text: 'text-yellow-800', hover: 'group-hover:text-yellow-800', img: 'border-yellow-200' },
  { box: 'border-red-400 hover:border-red-600 from-red-100 via-red-50 to-white', text: 'text-red-800', hover: 'group-hover:text-red-800', img: 'border-red-200' },
  { box: 'border-sky-400 hover:border-sky-600 from-sky-100 via-sky-50 to-white', text: 'text-sky-800', hover: 'group-hover:text-sky-800', img: 'border-sky-200' },
  { box: 'border-violet-400 hover:border-violet-600 from-violet-100 via-violet-50 to-white', text: 'text-violet-800', hover: 'group-hover:text-violet-800', img: 'border-violet-200' },
  { box: 'border-lime-400 hover:border-lime-600 from-lime-100 via-lime-50 to-white', text: 'text-lime-800', hover: 'group-hover:text-lime-800', img: 'border-lime-200' },
];
// 右側のハブタイル（日本語トップと同じ色）。記事が無い言語では hubLabels に無いものを自動で省く。
const HUBS = [
  { slug: 'shrine-kinun-guide', box: 'border-orange-400 hover:border-orange-600', bar: 'bg-orange-100 group-hover:bg-orange-200 text-orange-900' },
  { slug: 'shrine-enmusubi-guide', box: 'border-pink-400 hover:border-pink-600', bar: 'bg-pink-100 group-hover:bg-pink-200 text-pink-900' },
  { slug: 'shrine-kanto-guide', box: 'border-indigo-400 hover:border-indigo-600', bar: 'bg-indigo-100 group-hover:bg-indigo-200 text-indigo-900' },
  { slug: 'shrine-chubu-guide', box: 'border-emerald-400 hover:border-emerald-600', bar: 'bg-emerald-100 group-hover:bg-emerald-200 text-emerald-900' },
  { slug: 'shrine-kansai-guide', box: 'border-blue-700 hover:border-blue-900', bar: 'bg-blue-200 group-hover:bg-blue-300 text-blue-900' },
  { slug: 'shrine-kyushu-guide', box: 'border-yellow-500 hover:border-yellow-700', bar: 'bg-yellow-200 group-hover:bg-yellow-300 text-yellow-900' },
];

const T = {
  en: {
    prefix: '/en',
    heading: '⛩️ Top 5 Power Spots to Visit First',
    sub: 'For days you want love luck or a calmer mind. Easy-to-visit shrines, picked by our editors.',
    more: 'See more power spots →',
    hubLabels: { 'shrine-kinun-guide': '💰 Money Luck', 'shrine-enmusubi-guide': '💕 Love & Bonds', 'shrine-kanto-guide': '🗼 Kanto', 'shrine-chubu-guide': '🏔️ Chubu', 'shrine-kansai-guide': '🏯 Kansai', 'shrine-kyushu-guide': '🌺 Kyushu & Okinawa' },
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
    hubLabels: { 'shrine-kinun-guide': '💰 財運', 'shrine-enmusubi-guide': '💕 結緣', 'shrine-kanto-guide': '🗼 關東', 'shrine-chubu-guide': '🏔️ 中部', 'shrine-kansai-guide': '🏯 關西', 'shrine-kyushu-guide': '🌺 九州・沖繩' },
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
    hubLabels: { 'shrine-kinun-guide': '💰 เงินทอง', 'shrine-enmusubi-guide': '💕 เนื้อคู่' },
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

export default function SpotTop5({ locale, tight = false }) {
  const t = T[locale];
  const hubs = HUBS.filter((h) => t.hubLabels[h.slug]);
  const groups = [hubs.slice(0, 2), hubs.slice(2)].filter((g) => g.length > 0);
  return (
    <ScrollReveal as="section" className={`max-w-6xl mx-auto px-4 pt-2 md:pt-4 ${tight ? 'pb-2' : 'pb-8 md:pb-12'}`}>
      <div className="flex justify-center mb-3">
        <RotatingSpeechBubble messages={t.bubbles} />
      </div>
      <div className="text-center mb-5">
        <h2 className="mt-1 font-display text-2xl md:text-3xl font-extrabold text-ink-900">{t.heading}</h2>
        <p className="mt-2 text-sm md:text-base text-ink-700">{t.sub}</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-12 lg:items-stretch">
        <ol className="grid gap-3">
          {SPOTS.map((spot, i) => {
            const st = RANK_STYLES[i];
            return (
              <li key={spot.slug}>
                <Link prefetch={false} href={`${t.prefix}/blog/${spot.slug}/`} className={`group flex items-center gap-4 rounded-2xl border-2 bg-gradient-to-br ${st.box} px-4 py-3 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300`}>
                  <span className="text-3xl shrink-0 w-9 text-center drop-shadow-sm" aria-hidden="true">{BADGE[i]}</span>
                  <img
                    src={`/images/ranking/${spot.img}.webp`}
                    alt={t.alt(t.spots[i].name)}
                    width="320"
                    height="320"
                    loading="lazy"
                    decoding="async"
                    className={`w-16 h-16 rounded-xl object-cover shrink-0 border ${st.img}`}
                  />
                  <div className="min-w-0">
                    <div className={`text-xs font-extrabold ${st.text}`}>{t.rank(i + 1)}</div>
                    <h3 className={`font-display text-lg md:text-xl font-extrabold text-ink-900 leading-snug ${st.hover} transition-colors`}>{t.spots[i].name}</h3>
                    <p className="text-xs md:text-sm text-ink-700 leading-snug">{t.spots[i].hook}</p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ol>
        <div className="flex flex-col gap-4 lg:gap-8 lg:justify-between">
          {groups.map((group, gi) => (
            <div key={gi} className="grid grid-cols-2 gap-3">
              {group.map((h) => (
                <Link prefetch={false} key={h.slug} href={`${t.prefix}/blog/${h.slug}/`} className={`group flex flex-col overflow-hidden rounded-2xl border-2 bg-white ${h.box} shadow-sm hover:shadow-md transition-all duration-300`}>
                  <img
                    src={`/images/cards/${h.slug}-wide.webp`}
                    alt={t.hubLabels[h.slug].replace(/^\S+\s/, '')}
                    width="1290"
                    height="600"
                    loading="lazy"
                    decoding="async"
                    className="w-full aspect-[1290/600] object-cover"
                  />
                  <span className={`flex-1 flex items-center justify-center px-2 py-2 text-sm font-extrabold transition-colors ${h.bar}`}>
                    {t.hubLabels[h.slug]} <span aria-hidden="true" className="ml-1">→</span>
                  </span>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-5 text-center">
        <Link prefetch={false} href={`${t.prefix}/category/powerspots/`} className="inline-flex items-center gap-1 text-sm md:text-base font-bold text-emerald-700 hover:underline">
          {t.more}
        </Link>
      </div>
    </ScrollReveal>
  );
}
