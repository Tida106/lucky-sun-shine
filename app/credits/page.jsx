import { site } from '@/lib/site';
import Breadcrumbs from '@/components/Breadcrumbs';
import stoneImageCredits from '@/data/stone-image-credits.json';

export const metadata = {
  title: '画像クレジット',
  description: `${site.name} で使用しているパワーストーン写真の出典・ライセンス・撮影者クレジットの一覧です。`,
  alternates: { canonical: '/credits/' },
};

export default function CreditsPage() {
  const entries = Object.entries(stoneImageCredits)
    .filter(([, c]) => c.source !== 'icon-fallback')
    .sort((a, b) => a[1].nameJa.localeCompare(b[1].nameJa, 'ja'));

  return (
    <article className="max-w-3xl mx-auto px-4 py-12 prose-article">
      <Breadcrumbs items={[{ name: '画像クレジット' }]} className="not-prose mb-6" />
      <h1 className="font-display text-3xl font-extrabold text-ink-900 not-prose">
        画像クレジット
      </h1>
      <p>
        当サイトのパワーストーン記事で使用している石の写真は、Wikipedia / Wikimedia Commons
        で公開されているパブリックドメインまたは Creative Commons
        ライセンス（CC BY / CC BY-SA 等）の画像を使用しています。
        以下に、使用画像ごとの出典・ライセンス・撮影者（クレジット表記）を一覧で記載します。
      </p>
      <p>
        一部の石（適切な画像が見つからなかったもの）は、写真の代わりにカテゴリアイコンを表示しています。
      </p>

      <div className="not-prose overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-amber-200 text-left">
              <th className="py-2 pr-2">石名</th>
              <th className="py-2 pr-2">ファイル名</th>
              <th className="py-2 pr-2">ライセンス</th>
              <th className="py-2 pr-2">作者</th>
            </tr>
          </thead>
          <tbody>
            {entries.map(([slug, c]) => (
              <tr key={slug} className="border-b border-amber-100 align-top">
                <td className="py-2 pr-2 whitespace-nowrap">{c.nameJa}</td>
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
