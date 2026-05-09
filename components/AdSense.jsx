// Google AdSense — Auto Ads loader.
// Emitted only when NEXT_PUBLIC_ADSENSE_CLIENT (e.g. ca-pub-XXXXXXXXXXXX)
// is provided at build time. Without it, no script tag is rendered, so
// the site loads cleanly during AdSense審査の前段階や開発中。
import Script from 'next/script';

export default function AdSense() {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  if (!client) return null;
  return (
    <Script
      id="adsbygoogle-loader"
      async
      strategy="afterInteractive"
      crossOrigin="anonymous"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`}
    />
  );
}
