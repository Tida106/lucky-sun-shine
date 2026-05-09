// 同じ商品をAmazon・楽天・もしも経由で並列に出すための簡易レイアウト。
// 用途：「ローズクォーツのおすすめブレスレット」など、複数のECで同種の
// 商品を提示したいときに、横並び（PCレイアウト）で表示する。
import AmazonLink from './AmazonLink';
import RakutenLink from './RakutenLink';
import MoshimoLink from './MoshimoLink';

export default function ProductRow({ heading, amazon, rakuten, moshimo }) {
  return (
    <section className="my-8 not-prose">
      {heading && (
        <h3 className="font-display text-lg font-bold text-ink-900 mb-3">
          {heading}
        </h3>
      )}
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {amazon && <AmazonLink {...amazon} />}
        {rakuten && <RakutenLink {...rakuten} />}
        {moshimo && <MoshimoLink {...moshimo} />}
      </div>
      <p className="mt-2 text-xs text-ink-500">
        ※ 価格・在庫は変動します。リンク先の最新情報をご確認ください。
      </p>
    </section>
  );
}
