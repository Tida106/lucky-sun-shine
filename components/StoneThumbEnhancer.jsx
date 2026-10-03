'use client';

import { useEffect, useRef } from 'react';
import { getStoneThumbnailBySlug } from '@/lib/stoneThumbnails';

// Renders pre-built article HTML (from renderMarkdown) and, after mount,
// inserts a small round thumbnail to the left of every "/blog/[stone-slug]/"
// link found inside a <table> — restoring the per-row stone photo that the
// 365-day birthstone table used to show. The article HTML itself is static
// (dangerouslySetInnerHTML), so the icons are inserted imperatively via the
// DOM rather than as React children.
export default function StoneThumbEnhancer({ html, className }) {
  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    let cancelled = false;

    const links = container.querySelectorAll('table a[href^="/blog/"]');
    links.forEach((link) => {
      const match = link.getAttribute('href').match(/^\/blog\/([a-z0-9-]+)\/?$/);
      const slug = match?.[1];
      if (!slug) return;
      if (link.previousElementSibling?.classList?.contains('stone-thumb-icon')) return;

      const icon = document.createElement('span');
      icon.className =
        'stone-thumb-icon inline-flex items-center justify-center w-6 h-6 rounded-full overflow-hidden mr-1.5 align-middle bg-amber-100 text-[10px] flex-shrink-0';
      icon.setAttribute('aria-hidden', 'true');
      icon.textContent = '💎';
      link.parentNode.insertBefore(icon, link);

      getStoneThumbnailBySlug(slug).then((url) => {
        if (cancelled || !url) return;
        icon.textContent = '';
        const img = document.createElement('img');
        img.src = url;
        img.alt = '';
        img.loading = 'lazy';
        img.className = 'w-full h-full object-cover';
        icon.appendChild(img);
      });
    });

    return () => {
      cancelled = true;
    };
  }, [html]);

  return <div ref={ref} className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}
