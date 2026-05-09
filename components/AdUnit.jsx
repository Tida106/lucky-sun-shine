'use client';
// AdSense in-article display unit.
// Use anywhere in body text:
//   <AdUnit slot="1234567890" />
//
// Renders nothing if NEXT_PUBLIC_ADSENSE_CLIENT is unset, so the
// component is safe to scatter through pages even before approval.
import { useEffect } from 'react';

export default function AdUnit({ slot, format = 'auto', responsive = true, className = '' }) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

  useEffect(() => {
    if (!client) return;
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (_) {
      // adsbygoogle may not be loaded yet on first paint — silently ignore.
    }
  }, [client]);

  if (!client) return null;
  return (
    <ins
      className={`adsbygoogle block ${className}`}
      style={{ display: 'block' }}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={responsive ? 'true' : 'false'}
    />
  );
}
