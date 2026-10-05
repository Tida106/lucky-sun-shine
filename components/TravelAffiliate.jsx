import travel from "@/data/travel-links.json";

// 旅行アフィリエイト(KKday / Ouros Jewels)枠。en・zh-tw の個別記事ページ専用。
// 対応表 data/travel-links.json にある記事だけに表示し、金額は載せない。

const COPY = {
  en: {
    heading: "Plan your trip",
    note: "This section contains affiliate links.",
    esimNote: "Please check the details before booking.",
    place: (name) => `Find tours & experiences in ${name} on KKday`,
    names: {
      tokyo: "Tokyo",
      kyoto: "Kyoto",
      nara: "Nara",
      nikko: "Nikko",
      suwa: "Lake Suwa",
      hida: "Hida",
      fukuoka: "Fukuoka",
      takachiho: "Takachiho",
      hokkaido: "Hokkaido",
      kumano: "Kumano",
      yakushima: "Yakushima",
      izumo: "Izumo",
      chichibu: "Chichibu",
      ise: "Ise",
    },
    special: {
      dogo: "Browse hotels and ryokan in Dogo Onsen on KKday",
      shikoku: "All Shikoku Rail Pass on KKday",
      hiroshima: "Visit Hiroshima Tourist Pass on KKday",
      fuji: "Mt. Fuji day tour from Tokyo on KKday",
      enoshima: "Kamakura & Enoshima day trip from Tokyo on KKday",
      aso: "Mt. Aso day tour from Fukuoka on KKday",
      hiei: "Day trip to Mt. Hiei Enryaku-ji on KKday",
      esim: "Need data in Japan? Compare eSIM plans on KKday",
    },
    ouros: "Looking for lab-grown diamond jewelry? Browse the collection at Ouros Jewels.",
  },
  "zh-tw": {
    heading: "規劃你的旅程",
    note: "本區塊含有聯盟連結。",
    esimNote: "預訂前請確認內容。",
    place: (name) => `在 KKday 查看${name}的行程與體驗`,
    names: {
      tokyo: "東京",
      kyoto: "京都",
      nara: "奈良",
      nikko: "日光",
      suwa: "諏訪湖",
      hida: "飛驒",
      fukuoka: "福岡",
      takachiho: "高千穗",
      hokkaido: "北海道",
      kumano: "熊野",
      yakushima: "屋久島",
      izumo: "出雲",
      chichibu: "秩父",
      ise: "伊勢",
    },
    special: {
      dogo: "在 KKday 查看道後溫泉的旅館與飯店",
      shikoku: "在 KKday 查看四國鐵路周遊券",
      hiroshima: "在 KKday 查看廣島觀光周遊券",
      fuji: "在 KKday 查看東京出發的富士山一日遊",
      enoshima: "在 KKday 查看東京出發的鎌倉・江之島一日遊",
      aso: "在 KKday 查看從福岡出發的阿蘇一日遊",
      hiei: "在 KKday 查看比叡山延曆寺一日遊",
      esim: "需要日本上網？在 KKday 比較 eSIM 方案",
    },
    ouros: null,
  },
};

const linkClass =
  "inline-flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-white border border-amber-200 text-sm font-bold text-amber-800 hover:bg-amber-100 hover:border-amber-300 transition-colors shadow-sm";

function AffiliateLink({ href, children }) {
  return (
    <a href={href} target="_blank" rel="sponsored noopener" className={linkClass}>
      <span>{children}</span>
      <span aria-hidden="true">→</span>
    </a>
  );
}

export default function TravelAffiliate({ slug, locale = "en" }) {
  const copy = COPY[locale];
  if (!copy || !slug) return null;

  const places = travel.posts[slug];
  const isEsimOnly = travel.esimOnly.includes(slug);
  const showOuros = locale === "en" && copy.ouros && travel.ouros.includes(slug);
  const showTrip = Boolean(places) || isEsimOnly;
  if (!showTrip && !showOuros) return null;

  const placeKeys = places || [];
  const labelFor = (key) => copy.special[key] || copy.place(copy.names[key]);

  return (
    <section className="mt-12 p-6 md:p-8 bg-amber-50 rounded-2xl border border-amber-100">
      {showTrip && (
        <>
          <h2 className="font-display text-lg md:text-xl font-bold text-ink-900 mb-4">
            {copy.heading}
          </h2>
          <div className="flex flex-col gap-3">
            {placeKeys.map((key) => (
              <AffiliateLink key={key} href={travel.links[key]}>
                {labelFor(key)}
              </AffiliateLink>
            ))}
            <AffiliateLink href={travel.links.esim}>{copy.special.esim}</AffiliateLink>
            <p className="text-xs text-ink-500 -mt-1">{copy.esimNote}</p>
          </div>
        </>
      )}
      {showOuros && (
        <div className={`flex flex-col gap-3 ${showTrip ? "mt-6" : ""}`}>
          <AffiliateLink href={travel.links.ouros}>{copy.ouros}</AffiliateLink>
        </div>
      )}
      <p className="mt-4 text-xs text-ink-500">{copy.note}</p>
    </section>
  );
}
