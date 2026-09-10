'use client';

import { useState, useEffect } from 'react';
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

// 🎯 AIによる追加：GA4へクリックデータを送る魔法の関数
const sendClickEventToGA4 = (itemName, itemUrl) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'affiliate_click', {
      'event_category': 'monetization',
      'event_label': itemName,
      'link_url': itemUrl,
    });
  }
};

export default function RelatedProducts({ post, heading = 'この記事に関連する商品', keywords }) {
  const category = post?.category;
  const cat = categories.find((c) => c.slug === category);
  let defaultItems = SUGGESTIONS[category] || [];

  const [rakutenItems, setRakutenItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // 📝 記事で指定されたkeywordsがあればそれを優先、なければタグ（石名）を使う
  const searchKeyword = keywords || (category === 'powerstones' && post?.tags && post.tags.length > 0 ? `${post.tags[0]} ブレスレット レディース` : null);

  useEffect(() => {
    if (!searchKeyword) return;

    async function fetchRakuten() {
      setLoading(true);
      try {
        const applicationId = process.env.NEXT_PUBLIC_RAKUTEN_APPLICATION_ID;
        const afb = process.env.NEXT_PUBLIC_RAKUTEN_AFB;
        if (!applicationId) return;

        const url = `https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706?format=json&keyword=${encodeURIComponent(searchKeyword)}&applicationId=${applicationId}&affiliateId=${afb}&hits=2`;

        const res = await fetch(url);
        const data = await res.json();

        if (data && data.Items) {
          const items = data.Items.map((itemObj) => {
            const item = itemObj.Item;
            return {
              title: item.itemName,
              price: `${item.itemPrice.toLocaleString()}円`,
              imageUrl: item.mediumImageUrls[0]?.imageUrl || '',
              url: withAffiliate(item.affiliateUrl || item.itemUrl),
            };
          });
          setRakutenItems(items);
        }
      } catch (err) {
        console.error('Failed to fetch Rakuten items:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchRakuten();
  }, [searchKeyword]);

  return (
    <section className="not-prose mt-12 rounded-2xl bg-amber-50 border border-amber-200 p-5 shadow-sm">
      <h3 className="font-display text-lg font-bold text-ink-900 flex items-center gap-2 mb-1">
        <span aria-hidden="true">🛍️</span> {heading}
      </h3>
      <p className="text-xs text-ink-500 mb-4">
        <span className="inline-block px-1.5 py-0.5 mr-1 rounded bg-amber-200 text-amber-900 font-bold align-middle">PR</span>
        この記事に関連するおすすめ商品を楽天市場・Amazonから自動取得しています。
      </p>

      {/* 楽天APIからの自動取得アイテムがある場合の表示 */}
      {searchKeyword && rakutenItems.length > 0 && (
        <div className="mb-4">
          <div className="grid gap-3 sm:grid-cols-2">
            {rakutenItems.map((item, idx) => (
              <a
                key={idx}
                href={item.url}
                target="_blank"
                rel="sponsored noopener nofollow"
                // 🎯 魔法発動：クリックされた瞬間にGA4へ通知を送る！
                onClick={() => sendClickEventToGA4(item.title, item.url)}
                className="flex items-center gap-3 p-3 rounded-xl bg-white border border-amber-200 hover:border-amber-400 hover:shadow-md transition-all group"
              >
                {item.imageUrl && (
                  <img src={item.imageUrl} alt={item.title} className="w-16 h-16 object-cover rounded-lg shrink-0 group-hover:scale-105 transition-transform" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-ink-900 line-clamp-2 mb-1 group-hover:text-amber-700 transition-colors">{item.title}</p>
                  <p className="text-xs font-semibold text-rose-600">{item.price}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {loading && <p className="text-xs text-ink-500 mb-3">商品データを自動取得中...</p>}

      {/* 通常のサジェストリンク */}
      <ul className="grid gap-2 sm:grid-cols-2">
        {searchKeyword && !keywords && ( // キーワード指定がない（自動タグ）の場合のみ表示
          <li>
            <a
              href={`https://www.amazon.co.jp/s?k=${encodeURIComponent(searchKeyword)}&tag=`}
              target="_blank"
              rel="sponsored noopener nofollow"
              onClick={() => sendClickEventToGA4(`Amazon検索: ${searchKeyword}`, 'amazon_search')}
              className="block px-4 py-3 rounded-xl bg-white border border-amber-200 hover:border-amber-400 hover:shadow-sm transition-all"
            >
              <span className="text-sm font-bold text-ink-900">Amazonで探す</span>
              <span className="block text-xs text-ink-500">→ 商品ページへ</span>
            </a>
          </li>
        )}
        {!keywords && defaultItems.map((item) => (
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
    </section>
  );
}