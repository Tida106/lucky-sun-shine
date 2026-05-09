import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Analytics from '@/components/Analytics';
import AdSense from '@/components/AdSense';
import { site } from '@/lib/site';

const GSC_VERIFICATION = process.env.NEXT_PUBLIC_GSC_VERIFICATION;
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
    images: [{ url: '/og-default.svg', width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: site.name,
    description: site.description,
    images: ['/og-default.svg'],
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
  colorScheme: 'light dark',
};

// Set the dark/light class on <html> *before* React paints, so we
// don't flash light styles on a user who chose dark.
const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored || (prefersDark ? 'dark' : 'light');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  } catch (e) { /* localStorage may be denied — fail silently */ }
})();
`;

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
    <html lang="ja">
      <head>
        {/* Apply theme before paint to avoid FOUC */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {/* Lightweight in-browser security headers via http-equiv */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      </head>
      <body className="min-h-screen flex flex-col sunray-bg dark:bg-ink-900 dark:text-amber-50">
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
