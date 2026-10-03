import stoneImageCredits from '../data/stone-image-credits.json';

// Resolve a birthstone article slug (e.g. "garnet") to its static thumbnail
// image path, or null if the slug has no photo (unknown stone, or a stone
// that fell back to the category icon because no suitable Commons image
// could be found).
export function getStoneThumbnailBySlug(slug) {
  const entry = stoneImageCredits[slug];
  if (!entry || entry.source === 'icon-fallback') return null;
  return `/images/stones/${slug}-64.webp`;
}
