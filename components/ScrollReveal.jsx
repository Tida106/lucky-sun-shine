// Fade-in-from-below as the element enters the viewport.
// Pure markup + CSS (see app/globals.css `[data-reveal]`) driven by a single
// shared IntersectionObserver (public/reveal.js loaded once in app/layout.jsx)
// instead of a 'use client' component per instance — a page with a dozen
// ScrollReveal sections used to mount a dozen separate React client trees
// (each with its own effects + observer) just for this fade-in. Honors
// `prefers-reduced-motion` entirely in CSS, so no JS branch is needed for it.

export default function ScrollReveal({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
}) {
  return (
    <Tag
      data-reveal=""
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={className}
    >
      {children}
    </Tag>
  );
}
