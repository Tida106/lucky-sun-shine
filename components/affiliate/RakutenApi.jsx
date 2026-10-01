import RakutenLink from './RakutenLink';

export default async function RakutenApi({ keyword }) {
  const appId = "61035206-cd44-4f8d-949f-75033ef6c16d";
  const affId = "5738f936.e4c3f4e3.5738f937.de258ec8";
  const url = `https://app.rakuten.co.jp/services/api/IchibaItem/Search/20220601?format=json&keyword=${encodeURIComponent(keyword)}&applicationId=${appId}&affiliateId=${affId}&hits=1&imageFlag=1`;

  try {
    // キャッシュのせいで古いエラーが残るのを防ぐ
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
        />
      );
    } else {
      // データがない場合、透明にせずエラーの理由を画面に出力する
      return (
        <div className="my-4 p-4 border border-red-300 bg-red-50 text-red-700 text-sm rounded">
          <strong>【楽天API 取得エラー】</strong><br />
          レスポンス内容: {JSON.stringify(data)}
        </div>
      );
    }
  } catch (error) {
    return (
      <div className="my-4 p-4 border border-red-300 bg-red-50 text-red-700 text-sm rounded">
        <strong>【通信エラー】</strong> {error.message}
      </div>
    );
  }
}