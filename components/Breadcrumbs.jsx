import Link from 'next/link';
import { site } from '@/lib/site';

// 共通パンくず — ビジュアル(nav)と BreadcrumbList の JSON-LD を同時に出力する。
// items[].name は呼び出し側で既にロケールに応じた表示名に解決済みの前提
// (カテゴリ名の英訳は lib/categories.js の getCategoryTitle が単一の源)。
export default function Breadcrumbs({ items, className = '', locale = 'ja' }) {
  if (!items || items.length === 0) return null;

  const isEn = locale === 'en';
  
  // 英語/日本語のテキストとURL分岐
  const rootName = isEn ? 'Home' : 'ホーム';
  const rootPath = isEn ? '/en/' : '/';
  const ariaLabel = isEn ? 'Breadcrumbs' : 'パンくずリスト';
  const topText = isEn ? 'Home' : 'トップ';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: rootName,
        item: `${site.url}${rootPath}`,
      },
      ...items.map((it, i) => {
        const isLast = i === items.length - 1;

        const base = {
          '@type': 'ListItem',
          position: i + 2,
          name: it.name,
        };
        // 末尾(現在地)は item を出さないのが推奨。中間ノードのみ URL を付ける。
        if (!isLast && it.href) {
          // 英語環境で中間のリンクがある場合は /en/ を付与する考慮
          const linkPath = isEn && !it.href.startsWith('/en/') ? `/en${it.href}` : it.href;
          base.item = `${site.url}${linkPath}`;
        }
        return base;
      }),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label={ariaLabel} className={`text-xs text-ink-500 ${className}`}>
        <Link href={rootPath} className="hover:text-amber-700">{topText}</Link>
        {items.map((it, i) => {
          const isLast = i === items.length - 1;
          // 英語環境で中間のリンクがある場合は /en/ を付与
          const linkPath = isEn && it.href && !it.href.startsWith('/en/') ? `/en${it.href}` : it.href;

          return (
            <span key={`${i}-${it.name}`}>
              <span className="mx-1">/</span>
              {isLast || !it.href ? (
                <span className="text-ink-700">{it.name}</span>
              ) : (
                <Link href={linkPath} className="hover:text-amber-700">
                  {it.name}
                </Link>
              )}
            </span>
          );
        })}
      </nav>
    </>
  );
}