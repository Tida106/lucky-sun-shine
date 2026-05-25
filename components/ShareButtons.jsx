'use client';
import { useState } from 'react';

// 記事末尾のシェアボタン。X / Pinterest / LINE / URLコピー。
// - サーバーで URL/タイトルを確定して受け取る(クライアント側で再構築しない)
// - 各サービスへの遷移は target=_blank で、rel="noopener noreferrer"
// - URLコピーのみ navigator.clipboard を使う(client island)。失敗時は
//   フォールバックとして window.prompt で URL を表示する。
// - Pinterest は media が必要。post に cover があればそれを、なければ
//   サイト共通の og-image を使う(必ず1200x630の絶対URLが入る)。

function xUrl(url, title) {
  const params = new URLSearchParams({ url, text: title });
  return `https://twitter.com/intent/tweet?${params.toString()}`;
}

function pinterestUrl(url, title, image) {
  const params = new URLSearchParams({
    url,
    media: image,
    description: title,
  });
  return `https://www.pinterest.com/pin/create/button/?${params.toString()}`;
}

function lineUrl(url) {
  const params = new URLSearchParams({ url });
  return `https://social-plugins.line.me/lineit/share?${params.toString()}`;
}

export default function ShareButtons({ url, title, image, className = '' }) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      } else if (typeof window !== 'undefined') {
        // 古い iOS Safari など clipboard API が無い環境のフォールバック。
        window.prompt('URLをコピーしてください', url);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      if (typeof window !== 'undefined') {
        window.prompt('URLをコピーしてください', url);
      }
    }
  };

  const linkClass =
    'inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs md:text-sm font-bold text-white shadow-sm hover:opacity-90 active:scale-[0.98] transition-all min-w-[88px]';

  return (
    <section
      aria-label="この記事をシェアする"
      className={`not-prose rounded-2xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 via-white to-rose-50 p-4 md:p-5 ${className}`}
    >
      <h3 className="font-display text-sm font-bold text-ink-900 flex items-center gap-2 mb-3">
        <span aria-hidden="true">☀️</span>
        <span>この記事をシェアする</span>
      </h3>
      <div className="flex flex-wrap gap-2 md:gap-3">
        <a
          href={xUrl(url, title)}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
          style={{ backgroundColor: '#000000' }}
          aria-label="X(旧Twitter)でシェア"
        >
          {/* X (旧 Twitter) ロゴ */}
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
            <path d="M18.244 2H21.5l-7.5 8.57L23 22h-6.844l-5.357-7.014L4.6 22H1.342l8.07-9.214L1 2h7.018l4.84 6.401L18.244 2zm-2.4 18h1.86L8.27 4H6.273l9.572 16z" />
          </svg>
          <span>Xでシェア</span>
        </a>
        <a
          href={pinterestUrl(url, title, image)}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
          style={{ backgroundColor: '#E60023' }}
          aria-label="Pinterestでシェア"
        >
          {/* Pinterest ロゴ */}
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
            <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.964 1.407-5.964s-.359-.72-.359-1.781c0-1.667.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
          </svg>
          <span>Pinterest</span>
        </a>
        <a
          href={lineUrl(url)}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
          style={{ backgroundColor: '#06C755' }}
          aria-label="LINEで送る"
        >
          {/* LINE ロゴ簡略版 */}
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
            <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
          </svg>
          <span>LINEで送る</span>
        </a>
        <button
          type="button"
          onClick={onCopy}
          className={linkClass}
          style={{ backgroundColor: copied ? '#9C7A47' : '#C9A96E' }}
          aria-label="URLをコピー"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {copied ? (
              <path d="M5 13l4 4L19 7" />
            ) : (
              <>
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </>
            )}
          </svg>
          <span>{copied ? 'コピー済み！' : 'URLをコピー'}</span>
        </button>
      </div>
      <p className="mt-3 text-[11px] text-ink-500 leading-relaxed">
        この記事が役に立ったら、SNSでシェアしていただけるととても嬉しいです☀️
      </p>
    </section>
  );
}
