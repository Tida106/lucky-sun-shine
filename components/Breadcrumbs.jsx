import Link from 'next/link';
import { site } from '@/lib/site';

// 共通パンくず — ビジュアル(nav)と BreadcrumbList の JSON-LD を同時に出力する。
//
// items は「ホーム」を除いた階層の配列。各要素 { name, href? }。
// 末尾の要素は現在地として扱われ、href があってもリンクにはせずプレーン表示にする
// （Google のパンくず構造化データのガイドラインに合わせる）。
//
// 例: 記事ページ
//   <Breadcrumbs items={[
//     { name: 'パワーストーン', href: '/category/powerstones/' },
//     { name: 'パワーストーンの選び方 完全ガイド', href: '/blog/how-to-choose-powerstones/' },
//     { name: 'ローズクォーツの意味' },
//   ]} />
export default function Breadcrumbs({ items, className = '' }) {
  if (!items || items.length === 0) return null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'ホーム',
        item: `${site.url}/`,
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
          base.item = `${site.url}${it.href}`;
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
      <nav aria-label="パンくずリスト" className={`text-xs text-ink-500 ${className}`}>
        <Link href="/" className="hover:text-amber-700">トップ</Link>
        {items.map((it, i) => {
          const isLast = i === items.length - 1;
          return (
            <span key={`${i}-${it.name}`}>
              <span className="mx-1">/</span>
              {isLast || !it.href ? (
                <span className="text-ink-700">{it.name}</span>
              ) : (
                <Link href={it.href} className="hover:text-amber-700">
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
