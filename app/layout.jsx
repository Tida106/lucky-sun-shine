import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Analytics from '@/components/Analytics';
import AdSense from '@/components/AdSense';
import { site } from '@/lib/site';

// next/font/google は廃止。
// 理由: 189KB×2 のレンダーブロッキングCSSファイルを生成し FCP/LCP を大幅に遅延させる。
// Google Fontsをインラインスクリプトで非同期ロードすることで描画を一切ブロックしない。

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

const swRegisterScript = `
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('${BASE}/sw.js').catch(function(){});
  });
}
`;

// Google Fonts を動的に追加するインラインスクリプト。
// 動的に追加された <link rel="stylesheet"> はレンダーをブロックしない (Chrome仕様)。
// preconnect で DNS/TCPを事前確立し、フォントCSSのダウンロードを最速化する。
const FONT_URL =
  'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&family=Noto+Serif+JP:wght@400;700&display=swap';
const fontLoaderScript = `!function(){var l=document.createElement('link');l.rel='stylesheet';l.href='${FONT_URL}';document.head.appendChild(l)}()`;

export default function RootLayout({ children }) {
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
        {/* Google Fonts: preconnect で事前接続。フォントCSSは非同期スクリプトで非ブロッキングロード */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* このスクリプトは <head> 解析中に実行されるが、動的追加のリンクはレンダーをブロックしない */}
        <script dangerouslySetInnerHTML={{ __html: fontLoaderScript }} />
        {/* JS 無効環境向けフォールバック */}
        <noscript dangerouslySetInnerHTML={{ __html: `<link rel="stylesheet" href="${FONT_URL}">` }} />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="p:domain_verify" content="1caf8bfd103298033b3b1c290667cbe9" />
        
        {/* Google AdSense 審査用コード */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4224563062633828" crossOrigin="anonymous"></script>
      </head>
      <body className="min-h-screen flex flex-col sunray-bg">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
        <AdSense />
        <script dangerouslySetInnerHTML={{ __html: swRegisterScript }} />
      </body>
    </html>
  );
}