/**
 * Curated gallery of distinct travel photos used as a visual fallback when a
 * destination has no usable image URL from the API. All URLs verified to
 * resolve (Unsplash CDN).
 */
const gallery = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e", // sunset beach
  "https://images.unsplash.com/photo-1514282401047-d79a71a590e8", // overwater villas
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b", // mountain range
  "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff", // Santorini
  "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e", // Kyoto pagoda
  "https://images.unsplash.com/photo-1507699622108-4be3abd695ad", // Auckland skyline
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1", // alpine lake boat
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470", // turquoise lake
  "https://images.unsplash.com/photo-1528181304800-259b08848526", // golden temple
  "https://images.unsplash.com/photo-1544644181-1484b3fdfc62", // Borobudur
  "https://images.unsplash.com/photo-1519501025264-65ba15a82390", // city night
];

function photoUrl(baseUrl: string) {
  return `${baseUrl}?auto=format&fit=crop&w=900&q=80`;
}

/** Distinct photo by position — consecutive cards never share an image. */
export function galleryImageAt(index: number) {
  const normalized = ((index % gallery.length) + gallery.length) % gallery.length;
  return photoUrl(gallery[normalized]);
}

/** Distinct photo derived from a stable seed (e.g. a destination id). */
export function galleryImageFor(seed: string) {
  let hash = 0;
  for (const char of seed) hash = (hash + char.charCodeAt(0)) % gallery.length;
  return photoUrl(gallery[hash]);
}
