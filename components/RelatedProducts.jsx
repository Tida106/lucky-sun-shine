// Article-footer related products area. Picks affiliate hooks based on
// post.category + post.tags. Today this is a curated lookup; once we
// have a product database it can be replaced with a real fetch.
import Link from 'next/link';
import { categories } from '@/lib/categories';

const SUGGESTIONS = {
  powerstones: [
    { label: 'パワーストーン総合検索', url: 'https://www.amazon.co.jp/s?k=パワーストーン+ブレスレット&tag=', external: true },
    { label: '楽天市場 パワーストーン特集', url: 'https://search.rakuten.co.jp/search/mall/パワーストーン/', external: true },
  ],
  powerspots: [
    { label: '御朱印帳をAmazonで探す', url: 'https://www.amazon.co.jp/s?k=御朱印帳&tag=', external: true },
    { label: 'お守り 楽天市場で探す', url: 'https://search.rakuten.co.jp/search/mall/お守り/', external: true },
  ],
  'lucky-goods': [
    { label: '長財布をAmazonで探す', url: 'https://www.amazon.co.jp/s?k=金運+長財布&tag=', external: true },
    { label: '開運グッズを楽天で探す', url: 'https://search.rakuten.co.jp/search/mall/開運グッズ/', external: true },
  ],
  'luck-habits': [
    { label: 'ホワイトセージをAmazonで探す', url: 'https://www.amazon.co.jp/s?k=ホワイトセージ&tag=', external: true },
    { label: 'お香・浄化グッズを楽天で', url: 'https://search.rakuten.co.jp/search/mall/ホワイトセージ/', external: true },
  ],
};

// Apply the correct affiliate parameter for each network. Amazon URLs
// in SUGGESTIONS deliberately end in `&tag=` so we just complete them;
// if the env var is missing, we strip the empty trailing `tag=` so the
// link still works without leaking the half-parameter.
function withAffiliate(url) {
  if (!url) return url;
  if (url.includes('amazon')) {
    const tag = process.env.NEXT_PUBLIC_AMAZON_TAG;
    if (tag) {
      return url.endsWith('tag=') ? `${url}${encodeURIComponent(tag)}` : url;
    }
    return url.replace(/[?&]tag=$/, '');
  }
  if (url.includes('rakuten')) {
    const afb = process.env.NEXT_PUBLIC_RAKUTEN_AFB;
    if (!afb) return url;
    const sep = url.includes('?') ? '&' : '?';
    return `${url}${sep}scid=af_${encodeURIComponent(afb)}`;
  }
  return url;
}

export default function RelatedProducts({ post, heading = 'この記事に関連する商品' }) {
  const category = post?.category;
  const cat = categories.find((c) => c.slug === category);
  const items = SUGGESTIONS[category] || [];

  if (items.length === 0) return null;

  return (
    <section className="not-prose mt-12 rounded-2xl bg-amber-50 dark:bg-ink-900 border border-amber-200 dark:border-amber-700 p-5">
      <h3 className="font-display text-lg font-bold text-ink-900 dark:text-amber-50 flex items-center gap-2 mb-1">
        <span aria-hidden="true">🛍️</span> {heading}
      </h3>
      <p className="text-xs text-ink-500 dark:text-amber-200 mb-3">
        <span className="inline-block px-1.5 py-0.5 mr-1 rounded bg-amber-200 text-amber-900 font-bold align-middle">PR</span>
        {cat?.title}関連の商品をAmazon・楽天市場でチェックできます。本セクションはアフィリエイトリンクを含み、リンク経由で購入された場合に運営者へ紹介料が支払われることがあります。
      </p>
      <ul className="grid gap-2 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item.url}>
            {item.external ? (
              <a
                href={withAffiliate(item.url)}
                target="_blank"
                rel="sponsored noopener nofollow"
                className="block px-4 py-3 rounded-xl bg-white dark:bg-ink-700 border border-amber-200 dark:border-amber-700 hover:border-amber-400 hover:shadow-sm transition-all"
              >
                <span className="text-sm font-bold text-ink-900 dark:text-amber-50">{item.label}</span>
                <span className="block text-xs text-ink-500 dark:text-amber-200">→ 商品ページへ</span>
              </a>
            ) : (
              <Link
                href={item.url}
                className="block px-4 py-3 rounded-xl bg-white dark:bg-ink-700 border border-amber-200 dark:border-amber-700 hover:border-amber-400 hover:shadow-sm"
              >
                <span className="text-sm font-bold">{item.label}</span>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
