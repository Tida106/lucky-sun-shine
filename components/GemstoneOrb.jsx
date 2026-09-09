'use client';

import React, { useState, useEffect } from 'react';
import CategoryIcon from './CategoryIcon';

const WIKI_NAME_MAP = {
  'ローズクォーツ': '紅水晶',
  'スモーキークォーツ': '煙水晶',
  'タイガーアイ': '虎目石',
  'コーラル（珊瑚）': 'サンゴ',
  'ブラッドストーン': '血玉髄',
  'アイオライト': '菫青石',
  'アメジスト': 'アメシスト',
  'ヘマタイト': '赤鉄鉱',
  'クリソプレーズ': '緑玉髄',
  'ロードナイト': 'ばら輝石',
  'フローライト': '蛍石',
  'マラカイト': '孔雀石',
  'ブルートパーズ': 'トパーズ',
  'ムーンストーン': '月長石',
  'パール': '真珠',
  'ターコイズ': 'トルコ石',
  'カーネリアン': '紅玉髄',
  'アベンチュリン': '砂金石',
  'シトリン': '黄水晶',
};

export default function GemstoneOrb({ stoneName, catSlug, sizeClasses }) {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (!stoneName) return;
    const queryName = WIKI_NAME_MAP[stoneName] || stoneName;
    const url = `https://ja.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(queryName)}&redirects=1&prop=pageimages&format=json&pithumbsize=500&origin=*`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        const pages = data.query.pages;
        const pageId = Object.keys(pages)[0];
        if (pages[pageId]?.thumbnail?.source) {
          setImageUrl(pages[pageId].thumbnail.source);
        }
      })
      .catch(() => {});
  }, [stoneName]);

  // 画像が取得できた場合は美しいオーブを表示
  if (imageUrl) {
    return (
      <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full overflow-hidden border-[4px] border-white/80 shadow-[0_0_40px_rgba(255,255,255,0.7)] z-10 ${sizeClasses}`}>
        <img
          src={imageUrl}
          alt={stoneName}
          className="w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 rounded-full shadow-[inset_0_6px_15px_rgba(255,255,255,0.8)] pointer-events-none" />
        <div className="absolute inset-0 rounded-full shadow-[inset_0_-5px_15px_rgba(0,0,0,0.2)] pointer-events-none" />
      </div>
    );
  }

  // 画像がない場合や取得中の場合は、安全に白いアイコンを表示
  if (catSlug) {
    return (
      <CategoryIcon
        slug={catSlug}
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${sizeClasses} text-white/40 z-10`}
      />
    );
  }

  return null;
}