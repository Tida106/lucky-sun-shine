'use client';
import { useState } from 'react';

// マスコット「太陽ちゃん」。
// public/images/mascot-sun.png が存在すれば <picture> で表示。
// WebP を優先し、未対応ブラウザは <img> の PNG にフォールバックする。
// まだ画像が配置されていない / 読み込みに失敗した場合は
// 金髪・天使の輪・笑顔のプレースホルダーSVGに自動フォールバック。
//
// サイズは size (px) で指定。装飾用途のため alt は空でも構わないが、
// 文脈で意味を持たせたい場所では caller 側で alt を上書き可能。

export default function SunMascot({
  size = 80,
  alt = '太陽ちゃん',
  className = '',
  priority = false,
  src = '/images/mascot-sun.png',
}) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return <MascotFallback size={size} className={className} aria-label={alt} />;
  }

  // .png のときだけ同名 .webp を <source> として優先提示する。
  // WebP は alphaQuality 90 で書き出してあるため透過もそのまま機能する。
  // 未対応ブラウザ(Safari 13 以前など)は <img> の PNG にフォールバック。
  const isPng = typeof src === 'string' && src.toLowerCase().endsWith('.png');
  const webpSrc = isPng ? src.replace(/\.png$/i, '.webp') : null;

  return (
    <picture>
      {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
      <img
        src={src}
        alt={alt}
        width={size}
        height={size}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onError={() => setErrored(true)}
        className={`select-none ${className}`}
        style={{ width: size, height: size }}
      />
    </picture>
  );
}

// 画像未配置時のプレースホルダー。
// 金髪・天使の輪・にこっとした笑顔のかわいい太陽の女の子。
function MascotFallback({ size = 80, className = '', ...rest }) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      role="img"
      aria-hidden="true"
      focusable="false"
      className={`select-none ${className}`}
      style={{ width: size, height: size }}
      {...rest}
    >
      {/* 太陽の光線（背景） */}
      <g stroke="#F5C447" strokeWidth="3" strokeLinecap="round" opacity="0.85">
        <line x1="50" y1="6"  x2="50" y2="14" />
        <line x1="50" y1="86" x2="50" y2="94" />
        <line x1="6"  y1="50" x2="14" y2="50" />
        <line x1="86" y1="50" x2="94" y2="50" />
        <line x1="18" y1="18" x2="24" y2="24" />
        <line x1="76" y1="76" x2="82" y2="82" />
        <line x1="18" y1="82" x2="24" y2="76" />
        <line x1="76" y1="24" x2="82" y2="18" />
      </g>
      {/* 太陽本体（顔のベース） */}
      <circle cx="50" cy="52" r="30" fill="#FFD66B" stroke="#E8B947" strokeWidth="2" />
      {/* 金髪：前髪のひと房 */}
      <path
        d="M28 42 Q34 28 50 26 Q66 28 72 42 Q66 36 58 38 Q52 32 46 38 Q38 36 28 42 Z"
        fill="#F5C447"
      />
      {/* 天使の輪 */}
      <ellipse
        cx="50" cy="18" rx="16" ry="4.5"
        fill="none" stroke="#F5C447" strokeWidth="2.5"
      />
      {/* ほっぺ */}
      <circle cx="36" cy="58" r="3.5" fill="#FF9AB0" opacity="0.85" />
      <circle cx="64" cy="58" r="3.5" fill="#FF9AB0" opacity="0.85" />
      {/* 目（にっこり） */}
      <path d="M40 52 q3 -4 6 0" fill="none" stroke="#5A3A1E" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M54 52 q3 -4 6 0" fill="none" stroke="#5A3A1E" strokeWidth="2.4" strokeLinecap="round" />
      {/* 口（笑顔） */}
      <path
        d="M42 64 Q50 72 58 64"
        fill="none"
        stroke="#5A3A1E"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
