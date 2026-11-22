import { useEffect, useState } from 'preact/hooks';

const PREFIX = 'psiuwuwu.';
const listeners = new Set();
const memory = {}; // zapas, gdy localStorage jest niedostępny

export function get(key, fallback = null) {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    if (raw !== null) return JSON.parse(raw);
  } catch { /* ignoruj */ }
  return key in memory ? memory[key] : fallback;
}

export function set(key, value) {
  memory[key] = value;
  try {
    if (value === null || value === undefined) localStorage.removeItem(PREFIX + key);
    else localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch { /* np. za duży obrazek — zostaje w pamięci */ }
  listeners.forEach((fn) => fn(key));
}

/** Hook: [wartość, ustaw] zsynchronizowane z localStorage i innymi komponentami. */
export function useStored(key, fallback = null) {
  const [val, setVal] = useState(() => get(key, fallback));
  useEffect(() => {
    const fn = (k) => { if (k === key) setVal(get(key, fallback)); };
    listeners.add(fn);
    return () => listeners.delete(fn);
  }, [key]);
  return [val, (v) => set(key, typeof v === 'function' ? v(get(key, fallback)) : v)];
}

export const useProfile = () => useStored('profil', null);

export function toggleIn(list, id) {
  return list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
}

const BAD = ['kurw', 'cholera', 'dupa', 'idiot', 'głupi', 'glupi', 'debil', 'zjeb'];
export const hasBadWords = (t) => BAD.some((w) => t.toLowerCase().includes(w));

// ---- profile (mock logowania): baza profili po imieniu + bieżący profil ----
const key = (n) => n.trim().toLowerCase();
export const findProfile = (name) => (get('profile', {}) || {})[key(name)] || null;
export function saveProfile(p) {
  set('profile', { ...(get('profile', {}) || {}), [key(p.imie)]: p });
  set('profil', p);
}
export const login = (p) => set('profil', p);
export const logout = () => set('profil', null);
export const validName = (n) => /^[\p{L}\p{N} .'-]{2,20}$/u.test(n.trim());
