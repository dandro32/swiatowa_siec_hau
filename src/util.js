import { useEffect, useState } from 'preact/hooks';

/** Normalizacja do wyszukiwania: bez polskich znaków i wielkości liter. */
export const norm = (s) =>
  s.toLowerCase().replace(/ł/g, 'l').normalize('NFD').replace(/[̀-ͯ]/g, '');

export const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

export function useMedia(query) {
  const [m, setM] = useState(() => matchMedia(query).matches);
  useEffect(() => {
    const mq = matchMedia(query);
    const fn = () => setM(mq.matches);
    mq.addEventListener('change', fn);
    return () => mq.removeEventListener('change', fn);
  }, [query]);
  return m;
}

const imgCache = {};
/** Losowe zdjęcie rasy z Dog CEO (z cache); null gdy brak / offline. */
export function fetchBreedImage(dog) {
  if (!dog) return Promise.resolve(null);
  if (!imgCache[dog]) {
    imgCache[dog] = fetch(`https://dog.ceo/api/breed/${dog}/images/random`)
      .then((r) => r.json())
      .then((j) => (j.status === 'success' ? j.message : null))
      .catch(() => null);
  }
  return imgCache[dog];
}

export function useBreedImage(breed) {
  const [src, setSrc] = useState(null);
  useEffect(() => {
    let alive = true;
    setSrc(null);
    if (breed?.id === 'cavalier') { setSrc('assets/breeds/cavalier.jpg'); return; }
    fetchBreedImage(breed?.dog).then((u) => alive && setSrc(u));
    return () => { alive = false; };
  }, [breed?.id]);
  return src;
}

/** Przycina do kwadratu i zmniejsza zdjęcie do ~256 px (dataURL JPEG). */
export function resizeToSquare(file, size = 256) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const s = Math.min(img.width, img.height);
      const c = document.createElement('canvas');
      c.width = c.height = size;
      c.getContext('2d').drawImage(img, (img.width - s) / 2, (img.height - s) / 2, s, s, 0, 0, size, size);
      URL.revokeObjectURL(url);
      resolve(c.toDataURL('image/jpeg', 0.8));
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Nie da się wczytać zdjęcia')); };
    img.src = url;
  });
}

export const fmt = (n) => (n >= 1000 ? (n / 1000).toFixed(1).replace('.', ',') + ' tys.' : String(n));
export const today = () => new Date().toISOString().slice(0, 10);
