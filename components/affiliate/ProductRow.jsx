// 同じ商品をAmazon・楽天・もしも経由で並列に出すための簡易レイアウト。
// 用途：「ローズクォーツのおすすめブレスレット」など、複数のECで同種の
// 商品を提示したいときに、横並び（PCレイアウト）で表示する。
import AmazonLink from './AmazonLink';
import RakutenLink from './RakutenLink';
import MoshimoLink from './MoshimoLink';

const NOTE_TEXT = {
  ja: '※ 価格・在庫は変動します。リンク先の最新情報をご確認ください。',
  en: '※ Prices and stock are subject to change. Please check the latest information on the linked page.',
  'zh-tw': '※ 價格與庫存可能變動,請以連結頁面的最新資訊為準。',
};

export default function ProductRow({ heading, amazon, rakuten, moshimo, locale = 'ja' }) {
  return (
    <section className="my-8 not-prose">
      {heading && (
        <h3 className="font-display text-lg font-bold text-ink-900 mb-3">
          {heading}
        </h3>
      )}
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {amazon && <AmazonLink {...amazon} locale={locale} />}
        {rakuten && <RakutenLink {...rakuten} locale={locale} />}
        {moshimo && <MoshimoLink {...moshimo} locale={locale} />}
      </div>
      <p className="mt-2 text-xs text-ink-500">
        {NOTE_TEXT[locale] || NOTE_TEXT.ja}
      </p>
    </section>
  );
}
