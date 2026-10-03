import { site } from '@/lib/site';
import Breadcrumbs from '@/components/Breadcrumbs';
import stoneImageCredits from '@/data/stone-image-credits.json';

export const metadata = {
  title: 'Image Credits',
  description: `A list of sources, licenses, and photographer credits for the crystal photos used on ${site.name}.`,
  alternates: { canonical: '/en/credits/' },
};

export default function CreditsPageEn() {
  const entries = Object.entries(stoneImageCredits)
    .filter(([, c]) => c.source !== 'icon-fallback')
    .sort((a, b) => a[1].nameEn.localeCompare(b[1].nameEn));

  return (
    <article className="max-w-3xl mx-auto px-4 py-12 prose-article">
      <Breadcrumbs items={[{ name: 'Image Credits' }]} className="not-prose mb-6" locale="en" />
      <h1 className="font-display text-3xl font-extrabold text-ink-900 not-prose">
        Image Credits
      </h1>
      <p>
        The crystal photos used in our articles come from Wikipedia and Wikimedia Commons,
        released under a public-domain or Creative Commons license (CC BY / CC BY-SA, etc.).
        The table below lists the source file, license, and photographer credit for each photo.
      </p>
      <p>
        For a few stones where no suitable photo could be found, a category icon is shown
        instead of a photo.
      </p>

      <div className="not-prose overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-amber-200 text-left">
              <th className="py-2 pr-2">Stone</th>
              <th className="py-2 pr-2">File</th>
              <th className="py-2 pr-2">License</th>
              <th className="py-2 pr-2">Author</th>
            </tr>
          </thead>
          <tbody>
            {entries.map(([slug, c]) => (
              <tr key={slug} className="border-b border-amber-100 align-top">
                <td className="py-2 pr-2 whitespace-nowrap">{c.nameEn}</td>
                <td className="py-2 pr-2 break-all">
                  {c.descriptionUrl ? (
                    <a href={c.descriptionUrl} rel="noopener" target="_blank">
                      {c.sourceTitle}
                    </a>
                  ) : (
                    c.sourceTitle
                  )}
                </td>
                <td className="py-2 pr-2 whitespace-nowrap">
                  {c.licenseUrl ? (
                    <a href={c.licenseUrl} rel="noopener" target="_blank">
                      {c.license}
                    </a>
                  ) : (
                    c.license
                  )}
                </td>
                <td className="py-2 pr-2">{c.artist || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}
