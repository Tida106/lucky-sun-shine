// Recommended fortune/lucky-related SNS accounts.
// Add a new object to `accounts` to grow the list — no other code changes needed.
// `platform` must match a key in PLATFORM_META below.

const accounts = [
  {
    platform: 'instagram',
    name: 'ゲッターズ飯田',
    subtitle: '本人公式アカウント',
    handle: '@iidanobutaka',
    url: 'https://www.instagram.com/iidanobutaka/',
    description:
      '芸能界最強の占い師として知られるゲッターズ飯田氏の本人公式Instagram。これまで7万人以上を無償で占ってきた経験から、日々の開運メッセージや前向きになれる言葉を発信。フォロワー59万人超え。毎日の暮らしに開運のヒントを取り入れたい方におすすめのアカウントです。',
    color:
      'from-rose-100 via-fuchsia-100 to-amber-100',
    accent:
      'bg-gradient-to-r from-fuchsia-500 via-rose-500 to-amber-500 hover:from-fuchsia-600 hover:via-rose-600 hover:to-amber-600',
    cta: 'アカウントを見る',
  },
];

function InstagramIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.43.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.43.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.43-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.43-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.86 5.86 0 0 0-2.13 1.38A5.86 5.86 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.73 1.46 1.38 2.13.67.65 1.34 1.07 2.13 1.38.76.3 1.64.5 2.91.56 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.86 5.86 0 0 0 2.13-1.38c.65-.67 1.07-1.34 1.38-2.13.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91A5.86 5.86 0 0 0 22 2.01a5.86 5.86 0 0 0-2.14-1.38C19.1.33 18.22.13 16.95.07 15.67.01 15.26 0 12 0z" />
      <path d="M12 5.84A6.16 6.16 0 1 0 18.16 12 6.17 6.17 0 0 0 12 5.84zM12 16a4 4 0 1 1 4-4 4 4 0 0 1-4 4z" />
      <circle cx="18.41" cy="5.59" r="1.44" />
    </svg>
  );
}

const PLATFORM_META = {
  instagram: {
    label: 'Instagram',
    Icon: InstagramIcon,
  },
};

export default function RecommendSns() {
  return (
    <section className="mt-12 pt-10 border-t border-amber-200">
      <header className="text-center mb-8">
        <p className="text-amber-700 text-xs font-bold tracking-widest">
          RECOMMEND SNS
        </p>
        <h2 className="mt-2 font-display text-2xl md:text-3xl font-extrabold text-ink-900 flex items-center justify-center gap-2">
          <span aria-hidden="true">✨</span>
          おすすめ開運SNSアカウント
        </h2>
        <p className="mt-3 max-w-2xl mx-auto text-sm text-ink-700 leading-relaxed">
          毎日の暮らしに前向きなヒントを届けてくれる、開運・占いの公式SNSアカウントを厳選して紹介します。
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2">
        {accounts.map((a) => {
          const meta = PLATFORM_META[a.platform];
          const Icon = meta.Icon;
          return (
            <article
              key={a.url}
              className={`rounded-2xl border border-amber-200 bg-gradient-to-br ${a.color} p-5 md:p-6 flex flex-col`}
            >
              <div className="flex items-center gap-2 text-xs font-bold text-amber-700 tracking-wider">
                <Icon width={16} height={16} />
                <span>{meta.label}</span>
              </div>
              <h3 className="mt-2 font-display text-xl md:text-2xl font-extrabold text-ink-900">
                {a.name}
              </h3>
              <div className="text-xs text-ink-500 mt-0.5">
                {a.subtitle} ・ {a.handle}
              </div>

              <p className="mt-3 text-sm text-ink-700 leading-relaxed">
                {a.description}
              </p>

              <div className="mt-5 pt-4 border-t border-amber-200/60">
                <a
                  href={a.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className={`inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-full ${a.accent} text-white font-bold text-sm shadow-sm transition-colors`}
                  aria-label={`${a.name} の${meta.label}アカウントを新しいタブで開く`}
                >
                  <Icon />
                  {a.cta}
                  <span aria-hidden="true">→</span>
                </a>
                <p className="mt-2 text-[11px] text-ink-500 text-center">
                  {meta.label} に移動します
                </p>
              </div>
            </article>
          );
        })}
      </div>

      <p className="mt-6 text-xs text-ink-500 text-center leading-relaxed">
        ※ 紹介アカウントの運営者様とは資本関係・PR関係はありません。
        「Instagram」は Meta Platforms, Inc. の商標です。
      </p>
    </section>
  );
}
