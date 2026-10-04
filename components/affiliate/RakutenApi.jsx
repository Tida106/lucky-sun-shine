import RakutenLink from './RakutenLink';

export default async function RakutenApi({ keyword, locale = 'ja' }) {
  const appId = "61035206-cd44-4f8d-949f-75033ef6c16d";
  const affId = "5738f936.e4c3f4e3.5738f937.de258ec8";
  const url = `https://app.rakuten.co.jp/services/api/IchibaItem/Search/20220601?format=json&keyword=${encodeURIComponent(keyword)}&applicationId=${appId}&affiliateId=${affId}&hits=1&imageFlag=1`;

  try {
    const res = await fetch(url, { cache: 'no-store' });
    const data = await res.json();

    if (data.Items && data.Items.length > 0) {
      const item = data.Items[0].Item;
      return (
        <RakutenLink
          url={item.itemUrl}
          title={item.itemName}
          price={`¥${item.itemPrice.toLocaleString()}`}
          image={item.mediumImageUrls[0]?.imageUrl}
          shopName={item.shopName}
          afb={affId}
          locale={locale}
        />
      );
    }
  } catch (error) {
    console.error("Rakuten API Error:", error);
  }

  return null;
}