const VIATOR_PID = 'P00298374';
const VIATOR_MCID = '42383';

function buildViatorUrl(query, campaignSlug) {
  const text = encodeURIComponent(query).replace(/%20/g, '+');
  const campaign = `luckysunshine-${campaignSlug}`;
  return `https://www.viator.com/searchResults/all?text=${text}&pid=${VIATOR_PID}&mcid=${VIATOR_MCID}&medium=link&campaign=${encodeURIComponent(campaign)}`;
}

// Affiliate tour links for powerspots articles (English site only). Renders
// nothing if no spots are configured for the post. Pure CSS/markup — no
// external script is loaded, so it carries no PageSpeed cost.
export default function ViatorTours({ spots, slug }) {
  if (!spots || spots.length === 0) return null;

  return (
    <section className="mt-12 p-6 md:p-8 bg-amber-50 rounded-2xl border border-amber-100">
      <h2 className="font-display text-lg md:text-xl font-bold text-ink-900 mb-4 flex items-center gap-2">
        Plan Your Visit
        <span className="text-[10px] font-bold tracking-widest text-ink-500 bg-white border border-amber-200 rounded px-1.5 py-0.5">
          Ad
        </span>
      </h2>
      <div className="flex flex-col gap-3">
        {spots.slice(0, 3).map((spot) => (
          <a
            key={spot.name}
            href={buildViatorUrl(spot.query || spot.name, slug)}
            target="_blank"
            rel="sponsored noopener"
            className="inline-flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-white border border-amber-200 text-sm font-bold text-amber-800 hover:bg-amber-100 hover:border-amber-300 transition-colors shadow-sm"
          >
            <span>See tours of {spot.name} on Viator</span>
            <span aria-hidden="true">→</span>
          </a>
        ))}
      </div>
      <p className="mt-4 text-xs text-ink-500">
        This section contains affiliate links. See our{' '}
        <a href="/en/disclosure/" className="underline hover:text-amber-700">
          disclosure
        </a>.
      </p>
    </section>
  );
}
