'use client';

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

const sendClickEventToGA4 = (itemName, itemUrl) => {
  if (typeof window !== 'undefined') {
    if (window.gtag) {
      window.gtag('event', 'affiliate_click', {
        'event_category': 'monetization',
        'event_label': itemName,
        'link_url': itemUrl,
      });
    } else {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        'event': 'affiliate_click',
        'event_category': 'monetization',
        'event_label': itemName,
        'link_url': itemUrl
      });
    }
  }
};

export default function RelatedProducts({ post, heading = 'この記事に関連する商品', keywords }) {
  const category = post?.category;
  
  // 🎯 必殺技：タグが読み込めない環境でも、タイトルから絶対に見つけ出す超強力ロジック！
  let searchKeyword = keywords;

  if (!searchKeyword && post) {
    // 1. まずタグ配列をチェック
    if (Array.isArray(post.tags) && post.tags.length > 0) {
      searchKeyword = post.tags[0];
    } 
    // 2. なぜか文字列になってしまっている場合の対策
    else if (typeof post.tags === 'string') {
      searchKeyword = post.tags.split(',')[0].replace(/[\[\]"' ]/g, '');
    }
    
    // 3. 🚨それでもダメなら、記事タイトルから強引にキーワードを抽出！
    if (!searchKeyword && post.title) {
      if (post.title.includes('さざれ石')) searchKeyword = 'さざれ石';
      else if (post.title.includes('誕生石')) searchKeyword = '誕生石';
      else if (post.title.includes('寝室') || post.title.includes('風水')) searchKeyword = 'パワーストーン 原石';
    }
  }

  // キーワードが確定した場合の、クリック率が高いリッチなリンクカード
  let customItems = [];
  if (searchKeyword) {
    const encodedKw = encodeURIComponent(searchKeyword);
    customItems = [
      {
        title: `楽天市場で「${searchKeyword}」を探す`,
        price: 'おすすめアイテム一覧',
        url: `https://hb.afl.rakuten.co.jp/hgc/49d07b81.208f8a99.49d07b82.80a916ab/?pc=${encodeURIComponent(`https://search.rakuten.co.jp/search/mall/${encodedKw}/`)}&link_type=text`,
      },
      {
        title: `Amazonで「${searchKeyword}」を探す`,
        price: '関連グッズをチェック',
        url: `https://www.amazon.co.jp/s?k=${encodedKw}&tag=${process.env.NEXT_PUBLIC_AMAZON_TAG || ''}`,
      }
    ];
  }

  const defaultItems = SUGGESTIONS[category] || [];

  return (
    <section className="not-prose mt-12 mb-8 rounded-2xl bg-amber-50 border border-amber-200 p-5 shadow-sm">
      <h3 className="font-display text-lg font-bold text-ink-900 flex items-center gap-2 mb-1">
        <span aria-hidden="true">🛍️</span> {heading}
      </h3>
      <p className="text-xs text-ink-500 mb-4">
        <span className="inline-block px-1.5 py-0.5 mr-1 rounded bg-amber-200 text-amber-900 font-bold align-middle">PR</span>
        この記事に関連するおすすめ商品を楽天市場・Amazonからチェックできます。
      </p>

      {customItems.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {customItems.map((item, idx) => (
            <a
              key={idx}
              href={item.url}
              target="_blank"
              rel="sponsored noopener nofollow"
              onClick={() => sendClickEventToGA4(item.title, item.url)}
              className="flex items-center gap-3 p-4 rounded-xl bg-white border border-amber-200 hover:border-amber-400 hover:shadow-md transition-all group"
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-ink-900 line-clamp-2 mb-1 group-hover:text-amber-700 transition-colors">{item.title}</p>
                <p className="text-xs font-semibold text-rose-600">{item.price} →</p>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <ul className="grid gap-2 sm:grid-cols-2">
          {defaultItems.map((item) => (
            <li key={item.url}>
              <a
                href={withAffiliate(item.url)}
                target="_blank"
                rel="sponsored noopener nofollow"
                onClick={() => sendClickEventToGA4(item.label, item.url)}
                className="block px-4 py-3 rounded-xl bg-white border border-amber-200 hover:border-amber-400 hover:shadow-sm transition-all"
              >
                <span className="text-sm font-bold text-ink-900">{item.label}</span>
                <span className="block text-xs text-ink-500">→ 商品ページへ</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}