// Google Analytics (GA4) snippet — emitted only when an env-provided
// measurement ID is present at build time. NEXT_PUBLIC_GA_ID makes the
// value available in the browser bundle. Without it, the component
// renders nothing, so dev / preview builds stay clean.
import Script from 'next/script';

export default function Analytics() {
  const id = process.env.NEXT_PUBLIC_GA_ID;
  if (!id) return null;
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
