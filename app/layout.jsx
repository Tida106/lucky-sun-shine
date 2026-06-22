import './globals.css';
import { Noto_Sans_JP, Noto_Serif_JP } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Analytics from '@/components/Analytics';
import AdSense from '@/components/AdSense';
import { site } from '@/lib/site';

const notoSansJp = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-sans-jp',
  display: 'swap',
  preload: false,
});

const notoSerifJp = Noto_Serif_JP({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-serif-jp',
  display: 'swap',
  preload: false,
});

// Google Search Console verification token. Hardcoded for reliability
// (so the meta tag ships even if the GitHub Variable is unset). An env
// override is honored for future rotation without a code change.
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
    // Absolute URL so external crawlers (Twitter/Facebook/Slack) get a
    // working preview without relying on metadataBase resolution.
    // 1200x630 JPEG — the canonical OG card aspect.
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
  // Static-export sites can't set HTTP headers from code, but the
  // referrer-policy meta tag and the http-equiv tags above provide a
  // similar effect within the browser.
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

// Register the service worker as soon as the page is interactive.
// Skipped when no SW file is present (static export still serves /sw.js
// via the public/ dir).
const swRegisterScript = `
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('${BASE}/sw.js').catch(function(){});
  });
}
`;

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
    <html lang="ja" className={`${notoSansJp.variable} ${notoSerifJp.variable}`}>
      <head>
        {/* Critical CSS: ファーストビュー描画に必要な最小スタイルをインライン化。
            外部CSSファイルより先に確実に適用されるため、FCP/LCPが短縮される。 */}
        <style dangerouslySetInnerHTML={{ __html: `*,*::before,*::after{box-sizing:border-box}body{background-color:#FAF4E6;color:#1a1410;margin:0;min-height:100vh;display:flex;flex-direction:column;-webkit-font-smoothing:antialiased;font-family:system-ui,sans-serif;line-height:1.8}.sunray-bg{background:radial-gradient(ellipse at 50% -10%,rgba(201,169,110,.35) 0%,transparent 55%),linear-gradient(180deg,#FAF4E6 0%,#fff 60%)}h1,h2,h3{font-family:Georgia,serif;letter-spacing:.05em}` }} />
        {/* Lightweight in-browser security headers via http-equiv */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="p:domain_verify" content="1caf8bfd103298033b3b1c290667cbe9" />
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
