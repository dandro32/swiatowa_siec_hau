import { useEffect, useState } from 'preact/hooks';

export function parseHash() {
  const raw = location.hash.replace(/^#/, '') || '/';
  const [path, qs = ''] = raw.split('?');
  return { path: path || '/', query: Object.fromEntries(new URLSearchParams(qs)) };
}

export function useRoute() {
  const [route, setRoute] = useState(parseHash);
  useEffect(() => {
    const fn = () => { setRoute(parseHash()); window.scrollTo(0, 0); };
    addEventListener('hashchange', fn);
    return () => removeEventListener('hashchange', fn);
  }, []);
  return route;
}

export const go = (to) => { location.hash = '#' + to; };
export const replace = (to) => { history.replaceState(null, '', '#' + to); dispatchEvent(new HashChangeEvent('hashchange')); };
