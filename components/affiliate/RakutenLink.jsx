// 楽天アフィリエイト商品リンク。
// Usage:
//   <RakutenLink url="https://item.rakuten.co.jp/.../detail" title="..." price="¥..." />
//
// `afb` defaults to NEXT_PUBLIC_RAKUTEN_AFB (アフィリエイトID, 例: "208f8a99")。
// 楽天は商品URLに `?scid=af_<AFB>` を付与する形式で計測される。
function buildRakutenUrl(rawUrl, afb) {
  if (!rawUrl) return null;
  if (!afb) return rawUrl;
  const sep = rawUrl.includes('?') ? '&' : '?';
  return `${rawUrl}${sep}scid=af_${encodeURIComponent(afb)}`;
}

export default function RakutenLink({
  url,
  title,
  price,
  image,
  description,
  shopName,
  afb = process.env.NEXT_PUBLIC_RAKUTEN_AFB,
  className = '',
}) {
  const fullUrl = buildRakutenUrl(url, afb);
  if (!fullUrl) return null;
  return (
    <a
      href={fullUrl}
      target="_blank"
      rel="sponsored noopener nofollow"
      className={`group block my-5 p-4 rounded-xl border border-rose-200 bg-white hover:border-rose-400 hover:shadow-md transition-all not-prose ${className}`}
    >
      <div className="flex gap-4 items-start">
        {image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="w-24 h-24 object-contain rounded bg-rose-50 flex-shrink-0"
          />
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 text-xs text-rose-700 font-bold">
            <span>楽天市場</span>
            {shopName && <span className="text-ink-500 font-normal">{shopName}</span>}
            <span className="text-ink-500 font-normal">PR</span>
          </div>
          <h4 className="mt-1 font-bold text-ink-900 leading-snug group-hover:text-rose-700 line-clamp-2">
            {title}
          </h4>
          {description && (
            <p className="mt-1 text-sm text-ink-700 line-clamp-2">{description}</p>
          )}
          <div className="mt-2 flex items-center justify-between">
            {price ? (
              <span className="font-bold text-rose-700">{price}</span>
            ) : (
              <span className="text-sm text-ink-500">価格を見る</span>
            )}
            <span className="text-xs px-3 py-1 rounded-full bg-rose-500 text-white font-bold group-hover:bg-rose-600">
              楽天で見る →
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}
