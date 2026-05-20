import SunOrnament from './icons/SunOrnament';

// 記事末尾に挿入するFAQセクション。
// `<details>` ベースのアコーディオンなのでクライアントJSは不要。
// SEO（FAQPage リッチリザルト）のため、回答本文は閉じている状態でも
// DOM 内に存在する（display:none ではなく開閉のみ）。
export default function FaqSection({ faq }) {
  if (!faq || faq.length === 0) return null;
  return (
    <section className="mt-12">
      <div className="mb-6">
        <h2 className="font-display text-xl md:text-2xl font-bold text-ink-900 flex items-center gap-3">
          <SunOrnament className="w-5 h-5 md:w-6 md:h-6 text-amber-500 shrink-0" />
          <span>よくある質問</span>
        </h2>
        <span aria-hidden="true" className="heading-rule mt-3 ml-8" />
      </div>
      <div className="rounded-2xl border-2 border-amber-300 bg-amber-50/60 p-4 md:p-6 shadow-[0_2px_12px_rgba(245,158,11,0.08)]">
        <ul className="divide-y divide-amber-200">
          {faq.map((item, i) => (
            <li key={i} className="py-2">
              <details className="group">
                <summary
                  className="flex items-start gap-3 cursor-pointer list-none py-2 px-1 rounded-lg hover:bg-amber-100/60 transition-colors"
                >
                  <span
                    aria-hidden="true"
                    className="shrink-0 mt-0.5 inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-200 text-amber-900 font-bold text-xs"
                  >
                    Q
                  </span>
                  <span className="flex-1 font-bold text-ink-900 leading-relaxed">
                    {item.q}
                  </span>
                  <span
                    aria-hidden="true"
                    className="shrink-0 mt-1 text-amber-600 transition-transform duration-200 group-open:rotate-180"
                  >
                    ▼
                  </span>
                </summary>
                <div className="mt-2 ml-9 pr-2 pb-2 flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="shrink-0 mt-0.5 inline-flex items-center justify-center w-6 h-6 rounded-full bg-rose-200 text-rose-900 font-bold text-xs"
                  >
                    A
                  </span>
                  <p className="flex-1 text-sm md:text-[15px] text-ink-700 leading-relaxed whitespace-pre-line">
                    {item.a}
                  </p>
                </div>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
