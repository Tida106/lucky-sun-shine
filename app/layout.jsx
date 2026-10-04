import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Analytics from '@/components/Analytics';
import AdSense from '@/components/AdSense';
import { site } from '@/lib/site';
import { getAllPosts } from '@/lib/posts';

// next/font/google は使わない。
// 理由: 189KB×2 のレンダーブロッキングCSSファイルを生成し FCP/LCP を大幅に遅延させる。
// さらにGoogle Fonts配信そのものも、漢字を多数含むページではunicode-range
// 分割されたWOFF2が70個超に断片化し、TBTを悪化させるため不採用
// (詳細は下記 FONT_URL 付近のコメント)。自前サブセットを window の load 後に
// 非同期ロードすることで、描画を一切ブロックしない。

const GSC_VERIFICATION =
  process.env.NEXT_PUBLIC_GSC_VERIFICATION ||
  '9oLtqYSKbP7j7gtvkwyf5HGJT_Ty9eN7VTD6G8zggeQ';
const BASE = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: site.locale,
    siteName: site.name,
    title: site.name,
    description: site.description,
    url: site.url,
    images: [
      {
        url: `${site.url}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: site.name,
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: site.name,
    description: site.description,
    images: [`${site.url}/og-image.jpg`],
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.svg',
  },
  manifest: '/manifest.webmanifest',
  other: {
    'referrer': 'strict-origin-when-cross-origin',
  },
  ...(GSC_VERIFICATION
    ? { verification: { google: GSC_VERIFICATION } }
    : {}),
};

export const viewport = {
  themeColor: '#f59e0b',
  colorScheme: 'light',
};

// Noto Sans/Serif JP は Google Fonts配信だと、漢字を多数含む記事ページで
// unicode-range分割されたWOFF2が70個超・2MB超に達し、その取得・style再計算が
// 主スレッドを長時間占有してLCP/TBTを悪化させる主因になっていた
// (scripts/README参照: public/fonts/fonts.css が自前サブセット版の実体)。
// そこでJIS常用域をカバーする自前サブセットを1ウェイトにつき1ファイルで
// 自己ホストし、断片化を解消。読み込み自体も window の load 後まで遅延させ、
// 初期表示の帯域・CPUをヒーロー画像や本文の描画に使い切らせる。critical CSS
// 側で指定済みのシステムフォント(Hiragino/Meiryo等)がそれまで表示を担うため、
// 見た目は変わらずフォントが後から swap されるだけ。
const FONT_URL = `${BASE}/fonts/fonts.css`;

// Service Worker登録・Webフォント読み込み・AdSense審査用スクリプトを、
// いずれも window の 'load' 後にまとめて実行する。レンダーをブロックしない
// 点は変わらないが、初期ロード中の帯域・CPUをページ本体の描画に優先させる。
const deferredLoadScript = `
window.addEventListener('load', function () {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('${BASE}/sw.js').catch(function(){});
  }
  var f = document.createElement('link');
  f.rel = 'stylesheet';
  f.href = '${FONT_URL}';
  document.head.appendChild(f);

  var a = document.createElement('script');
  a.async = true;
  a.crossOrigin = 'anonymous';
  a.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4224563062633828';
  document.head.appendChild(a);
});
`;

export default function RootLayout({ children }) {
  // Header の言語切り替えボタンが「その言語版が実在する記事」だけ
  // /en/blog/[slug]/ や /zh-tw/blog/[slug]/ に飛ばせるように、実在する
  // スラッグ一覧を渡す。
  const enSlugs = getAllPosts('en').map((p) => p.slug);
  const zhTwSlugs = getAllPosts('zh-tw').map((p) => p.slug);
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: site.url,
    inLanguage: site.language,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${site.url}/search/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
  return (
    <html lang="ja">
      <head>
        {/* Critical CSS: 描画直前に必要な最小スタイルをインライン化。
            外部CSSに先行して確実に適用され、FCP/LCPを短縮する。 */}
        <style dangerouslySetInnerHTML={{ __html: `*,*::before,*::after{box-sizing:border-box}body{background-color:#FAF4E6;color:#1a1410;margin:0;min-height:100vh;display:flex;flex-direction:column;-webkit-font-smoothing:antialiased;font-family:'Noto Sans JP',system-ui,-apple-system,'Hiragino Kaku Gothic ProN',Meiryo,sans-serif;line-height:1.8}.sunray-bg{background:radial-gradient(ellipse at 50% -10%,rgba(201,169,110,.35) 0%,transparent 55%),linear-gradient(180deg,#FAF4E6 0%,#fff 60%)}h1,h2,h3{font-family:'Noto Serif JP','Hiragino Mincho ProN',Georgia,serif;letter-spacing:.05em}` }} />
        {/* AdSense: preconnect で事前接続だけ済ませておく。
            実際の読み込みは window の load 後 (deferredLoadScript) まで遅延。
            Webフォントは自己ホスト化したため fonts.googleapis.com 等への
            preconnect は不要。 */}
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        {/* JS 無効環境向けフォールバック: フォントだけは即時リンクで読む */}
        <noscript dangerouslySetInnerHTML={{ __html: `<link rel="stylesheet" href="${FONT_URL}">` }} />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="p:domain_verify" content="1caf8bfd103298033b3b1c290667cbe9" />
      </head>
      <body className="min-h-screen flex flex-col sunray-bg">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <Header enSlugs={enSlugs} zhTwSlugs={zhTwSlugs} />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
        <AdSense />
        <script dangerouslySetInnerHTML={{ __html: deferredLoadScript }} />
      </body>
    </html>
  );
}