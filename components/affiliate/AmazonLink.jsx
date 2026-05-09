// Amazon associates product link.
// Usage:
//   <AmazonLink asin="B0XXXXXXX" title="商品名" price="¥2,980" />
//
// `tag` defaults to NEXT_PUBLIC_AMAZON_TAG (e.g. "luckysunshine-22").
// If neither prop nor env is set, the link drops the tag — links keep
// working but without affiliate attribution.
export default function AmazonLink({
  asin,
  title,
  price,
  image,
  description,
  tag = process.env.NEXT_PUBLIC_AMAZON_TAG,
  className = '',
}) {
  if (!asin) return null;
  const url = tag
    ? `https://www.amazon.co.jp/dp/${asin}/?tag=${encodeURIComponent(tag)}`
    : `https://www.amazon.co.jp/dp/${asin}/`;
  return (
    <a
      href={url}
      target="_blank"
      rel="sponsored noopener nofollow"
      className={`group block my-5 p-4 rounded-xl border border-amber-200 bg-white hover:border-amber-400 hover:shadow-md transition-all not-prose ${className}`}
    >
      <div className="flex gap-4 items-start">
        {image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="w-24 h-24 object-contain rounded bg-amber-50 flex-shrink-0"
          />
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 text-xs text-amber-700 font-bold">
            <span>Amazon</span>
            <span className="text-ink-500 font-normal">PR</span>
          </div>
          <h4 className="mt-1 font-bold text-ink-900 leading-snug group-hover:text-amber-700 line-clamp-2">
            {title}
          </h4>
          {description && (
            <p className="mt-1 text-sm text-ink-700 line-clamp-2">{description}</p>
          )}
          <div className="mt-2 flex items-center justify-between">
            {price ? (
              <span className="font-bold text-amber-800">{price}</span>
            ) : (
              <span className="text-sm text-ink-500">価格を見る</span>
            )}
            <span className="text-xs px-3 py-1 rounded-full bg-amber-500 text-white font-bold group-hover:bg-amber-600">
              Amazonで見る →
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}
