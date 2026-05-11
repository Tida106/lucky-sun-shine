// Google Analytics (GA4) snippet — emitted only on production builds
// when an env-provided measurement ID is present. NEXT_PUBLIC_GA_ID
// makes the value available in the browser bundle. `npm run dev` runs
// with NODE_ENV='development', so local sessions are never counted.
import Script from 'next/script';

export default function Analytics() {
  const id = process.env.NEXT_PUBLIC_GA_ID;
  if (!id) return null;
  if (process.env.NODE_ENV !== 'production') return null;
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${id}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
