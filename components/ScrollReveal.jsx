'use client';

import { useEffect, useRef, useState } from 'react';

// Fade-in-from-below as the element enters the viewport.
// Implemented with IntersectionObserver to avoid bundling framer-motion
// into the static export. Honors `prefers-reduced-motion`: those users
// see the content fully visible from first paint with no transform.

export default function ScrollReveal({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener?.('change', handler);
    return () => mq.removeEventListener?.('change', handler);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [reduced]);

  const baseTransition = reduced
    ? ''
    : 'transition-all duration-700 ease-out will-change-transform';
  const shownState = reduced
    ? ''
    : visible
      ? 'opacity-100 translate-y-0'
      : 'opacity-0 translate-y-4';

  return (
    <Tag
      ref={ref}
      style={reduced ? undefined : { transitionDelay: `${delay}ms` }}
      className={`${baseTransition} ${shownState} ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}
