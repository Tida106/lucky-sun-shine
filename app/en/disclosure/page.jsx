import { site } from '@/lib/site';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
  title: 'Affiliate Disclosure',
  description: `${site.name}'s affiliate disclosure. We participate in affiliate programs including Awin, Viator, and Expedia, and may earn a commission on qualifying bookings and purchases.`,
  alternates: { canonical: '/en/disclosure/' },
};

export default function DisclosurePageEn() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12 prose-article">
      <Breadcrumbs items={[{ name: 'Affiliate Disclosure' }]} className="not-prose mb-6" locale="en" />
      <h1 className="font-display text-3xl font-extrabold text-ink-900 not-prose">
        Affiliate Disclosure
      </h1>

      <p>
        {site.name} ({site.url}) participates in several affiliate marketing programs, including
        (but not limited to) <strong>Awin</strong>, <strong>Viator</strong>, and{' '}
        <strong>Expedia</strong>. This means that some of the links on our site are affiliate
        links.
      </p>
      <p>
        If you click on one of these links and make a booking or purchase, we may earn a small
        commission from the program or retailer. This comes at <strong>no extra cost to you</strong>
        —the price you pay stays exactly the same whether you use our link or go directly to the
        site.
      </p>
      <p>
        We only recommend places, tours, and products that we believe add genuine value for our
        readers. Any commission we earn helps support the running of this site, so we can keep
        publishing free guides to crystals, power spots, and good luck culture in Japan.
      </p>
      <p>
        If you have any questions about our affiliate relationships, please reach out through our{' '}
        <a href="/contact/">contact form</a>.
      </p>
    </article>
  );
}
