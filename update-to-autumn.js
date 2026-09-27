const fs = require("fs");
const filePath = "app/page.jsx";
let content = fs.readFileSync(filePath, "utf8");

const oldSection = `      {/* 季節の特集 — 今の季節(夏) */}
      <ScrollReveal as="section" className="cv-section max-w-6xl mx-auto px-4 pb-16">
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
      </ScrollReveal>`;

const newSection = `      {/* 季節の特集 — 今の季節(秋) */}
      <ScrollReveal as="section" className="cv-section max-w-6xl mx-auto px-4 pb-16">
        <Link
          href="/blog/autumn-stones/"
          className="group block rounded-2xl overflow-hidden border border-orange-200 bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_14px_32px_rgba(0,0,0,0.10)] hover:-translate-y-1 transition-all duration-300 ease-out"
        >
          <div className="grid gap-6 md:grid-cols-[auto_minmax(0,1fr)] items-center p-6 md:p-8">
            <div className="flex items-center justify-center">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/80 flex items-center justify-center shadow-inner text-4xl md:text-5xl" aria-hidden="true">
                🍁
              </div>
            </div>
            <div>
              <p className="inline-flex items-center gap-2 text-orange-700 text-xs font-bold tracking-widest">
                <Sparkles className="w-4 h-4 text-orange-600" />
                <span>SEASONAL</span>
              </p>
              <h3 className="mt-2 font-display text-xl md:text-2xl font-extrabold text-ink-900 leading-snug group-hover:text-orange-700 transition-colors">
                秋にぴったりのパワーストーン
              </h3>
              <p className="mt-3 text-sm md:text-base text-ink-700 leading-relaxed">
                夏の疲れのリセット・実りの季節・心の変わり目。落ち着いた深みのある石たちが、秋の空気にそっと寄り添います。
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-orange-700 group-hover:underline">
                秋の特集を読む
                <span aria-hidden="true">→</span>
              </span>
            </div>
          </div>
        </Link>
      </ScrollReveal>`;

if (content.includes(oldSection)) {
  content = content.replace(oldSection, newSection);
  fs.writeFileSync(filePath, content, "utf8");
  console.log("秋特集セクションに変更: 成功");
} else {
  console.log("該当箇所が見つかりませんでした");
}
