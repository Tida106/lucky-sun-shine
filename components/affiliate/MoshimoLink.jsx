// もしもアフィリエイト 商品リンク。
// もしも経由のリンクは「promotion URL」と「impression URL」がペアで
// 提供される。url にプロモーションURL、impression に1×1 imgのURLを
// 渡すと、クリック計測 + インプレッション計測が両方とも動く。
//
// Usage:
//   <MoshimoLink
//     url="https://af.moshimo.com/af/c/click?a_id=..&p_id=..&pc_id=..&pl_id=..&url=..."
//     impression="https://i.moshimo.com/af/i/impression?a_id=..&p_id=..&pc_id=..&pl_id=.."
//     title="商品名"
//     network="Amazon"   // or "楽天市場" / "Yahoo!ショッピング"
//   />
export default function MoshimoLink({
  url,
  impression,
  title,
  price,
  image,
  description,
  network = 'もしも',
  className = '',
}) {
  if (!url) return null;
  return (
    <div className={`my-5 not-prose ${className}`}>
      <a
        href={url}
        target="_blank"
        rel="sponsored noopener nofollow"
        className="group block p-4 rounded-xl border border-sun-200 bg-white hover:border-amber-400 hover:shadow-md transition-all"
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
              <span>{network}</span>
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
                <span className="text-sm text-ink-500">詳細を見る</span>
              )}
              <span className="text-xs px-3 py-1 rounded-full bg-amber-500 text-white font-bold group-hover:bg-amber-600">
                商品ページへ →
              </span>
            </div>
          </div>
        </div>
      </a>
      {impression && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={impression}
          alt=""
          width="1"
          height="1"
          loading="lazy"
          aria-hidden="true"
          style={{ position: 'absolute', width: 1, height: 1, opacity: 0 }}
        />
      )}
    </div>
  );
}
