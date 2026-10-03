import fs from 'node:fs';
import path from 'node:path';
import { notFound } from 'next/navigation';

// Dev-only QA page for the static stone image pipeline. In a production
// build (`next build`, which output:'export' always runs with
// NODE_ENV=production) this bails out to notFound() so no real content is
// exported; it only renders under `npm run dev`.
export default function StonesPreviewPage() {
  if (process.env.NODE_ENV === 'production') {
    notFound();
  }

  const credits = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'data', 'stone-image-credits.json'), 'utf8')
  );
  const slugs = Object.keys(credits).sort();

  return (
    <div style={{ padding: 24, fontFamily: 'sans-serif', background: '#fafafa' }}>
      <h1>石画像プレビュー（開発用・本番非公開）</h1>
      <p>{slugs.length} 件。欠け・小さすぎ・中心ずれがないか確認。</p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: 16,
        }}
      >
        {slugs.map((slug) => {
          const c = credits[slug];
          const isIcon = c.source === 'icon-fallback';
          return (
            <div
              key={slug}
              style={{
                background: '#fff',
                border: '1px solid #ddd',
                borderRadius: 8,
                padding: 12,
                textAlign: 'center',
              }}
            >
              <div style={{ fontWeight: 'bold', fontSize: 13 }}>{slug}</div>
              <div style={{ fontSize: 11, color: '#666', marginBottom: 8 }}>{c.nameJa}</div>
              {isIcon ? (
                <div
                  style={{
                    width: 80,
                    height: 80,
                    margin: '0 auto',
                    borderRadius: '50%',
                    background: '#eee',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#999',
                    fontSize: 11,
                  }}
                >
                  ICON
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
                  <div>
                    <img
                      src={`/images/stones/${slug}-320.webp`}
                      width={80}
                      height={80}
                      style={{ borderRadius: '50%', objectFit: 'cover', border: '1px solid #ccc' }}
                      alt={slug}
                    />
                    <div style={{ fontSize: 10, color: '#999' }}>320 (hero)</div>
                  </div>
                  <div>
                    <img
                      src={`/images/stones/${slug}-64.webp`}
                      width={28}
                      height={28}
                      style={{ borderRadius: '50%', objectFit: 'cover', border: '1px solid #ccc' }}
                      alt={slug}
                    />
                    <div style={{ fontSize: 10, color: '#999' }}>64 (thumb @28px)</div>
                  </div>
                </div>
              )}
              <div style={{ fontSize: 10, color: '#aaa', marginTop: 6 }}>{c.license || ''}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
