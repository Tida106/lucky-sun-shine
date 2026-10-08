import Link from 'next/link';
import { site } from '@/lib/site';

// 共通パンくず — ビジュアル(nav)と BreadcrumbList の JSON-LD を同時に出力する。
// items[].name は呼び出し側で既にロケールに応じた表示名に解決済みの前提
// (カテゴリ名の英訳は lib/categories.js の getCategoryTitle が単一の源)。
export default function Breadcrumbs({ items, className = '', locale = 'ja' }) {
  if (!items || items.length === 0) return null;

  const isEn = locale === 'en';
  const isZhTw = locale === 'zh-tw';
  const localePrefix = isZhTw ? '/zh-tw' : isEn ? '/en' : '';

  // 言語別のテキストとURL分岐
  const rootName = isZhTw ? '首頁' : isEn ? 'Home' : 'ホーム';
  const rootPath = isZhTw ? '/zh-tw/' : isEn ? '/en/' : '/';
  const ariaLabel = isZhTw ? '麵包屑導覽' : isEn ? 'Breadcrumbs' : 'パンくずリスト';
  const topText = isZhTw ? '首頁' : isEn ? 'Home' : 'トップ';

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
      // BreadcrumbList は、最後(現在地)以外の項目に item(URL)が必須。URLのない中間項目
      // (カテゴリページが無い記事のカテゴリ名など)は、画面のパンくずには残すが、
      // 構造化データからは除く(Search Console の「無効なアイテム」を防ぐ)。
      ...items.filter((it, i) => i === items.length - 1 || it.href).map((it, i, arr) => {
        const isLast = i === arr.length - 1;

        const base = {
          '@type': 'ListItem',
          position: i + 2,
          name: it.name,
        };
        // 末尾(現在地)は item を出さないのが推奨。中間ノードのみ URL を付ける。
        if (!isLast && it.href) {
          // 英語/繁体中文環境で中間のリンクがある場合はロケールprefixを付与
          const linkPath = localePrefix && !it.href.startsWith(`${localePrefix}/`) ? `${localePrefix}${it.href}` : it.href;
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
        <Link prefetch={false} href={rootPath} className="hover:text-amber-700">{topText}</Link>
        {items.map((it, i) => {
          const isLast = i === items.length - 1;
          // 英語/繁体中文環境で中間のリンクがある場合はロケールprefixを付与
          const linkPath = localePrefix && it.href && !it.href.startsWith(`${localePrefix}/`) ? `${localePrefix}${it.href}` : it.href;

          return (
            <span key={`${i}-${it.name}`}>
              <span className="mx-1">/</span>
              {isLast || !it.href ? (
                <span className="text-ink-700">{it.name}</span>
              ) : (
                <Link prefetch={false} href={linkPath} className="hover:text-amber-700">
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