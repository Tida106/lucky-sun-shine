'use client';

import { useState } from 'react';
import { Children } from 'react';

// 記事カードを最初の initial 件だけ見せ、「もっと見る」で step 件ずつ増やす。
// 残りのカードも HTML には出力しておく(hidden属性)ので、検索エンジンからはリンクが見える。
export default function LoadMoreGrid({ children, initial = 12, step = 12, label = 'もっと見る', className = '' }) {
  const items = Children.toArray(children);
  const [visible, setVisible] = useState(initial);
  const remaining = items.length - visible;

  return (
    <>
      <div className={className}>
        {items.map((child, i) => (
          <div key={i} className={i >= visible ? 'hidden' : 'contents'}>
            {child}
          </div>
        ))}
      </div>
      {remaining > 0 && (
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + step)}
            className="inline-flex items-center gap-2 rounded-full border-2 border-amber-300 bg-white px-6 py-2.5 text-sm font-bold text-amber-800 hover:bg-amber-50 transition-colors"
          >
            {label}（残り{remaining}件）
            <span aria-hidden="true">↓</span>
          </button>
        </div>
      )}
    </>
  );
}
