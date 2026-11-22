const INK = '#2b1d14';
const s = { stroke: INK, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' };

/** Ikony aplikacji (kafelki). */
export function AppIcon({ id, size = 96 }) {
  const body = {
    'psie-semes': (<>
      <path d="M26 26 q-14 -8 -12 14 q10 4 14 -6z" fill="#b97a3d" {...s} />
      <path d="M74 26 q14 -8 12 14 q-10 4 -14 -6z" fill="#b97a3d" {...s} />
      <rect x="26" y="14" width="48" height="76" rx="10" fill="#ff7bac" {...s} />
      <rect x="32" y="26" width="36" height="46" rx="4" fill="#fff8e7" {...s} stroke-width="3" />
      <circle cx="50" cy="81" r="4" fill="#fff8e7" {...s} stroke-width="3" />
      <path d="M38 44 q12 -8 24 0 M38 54 h16" fill="none" {...s} stroke-width="3" />
    </>),
    poogle: (<>
      <circle cx="44" cy="44" r="26" fill="#cdeeff" {...s} />
      <path d="M62 62 l26 26" {...s} stroke-width="9" />
      <ellipse cx="44" cy="50" rx="8" ry="6" fill={INK} />
      <circle cx="34" cy="36" r="4" fill={INK} /><circle cx="54" cy="36" r="4" fill={INK} />
      <circle cx="35" cy="35" r="1.4" fill="#fff" /><circle cx="55" cy="35" r="1.4" fill="#fff" />
    </>),
    piestajm: (<>
      <rect x="10" y="30" width="80" height="44" rx="22" fill="#9b5de5" {...s} />
      <path d="M26 52 h20 M36 42 v20" {...s} stroke="#fff" stroke-width="6" />
      <circle cx="70" cy="46" r="5" fill="#ffd23f" {...s} stroke-width="3" />
      <ellipse cx="72" cy="62" rx="9" ry="7" fill="#fff8e7" {...s} stroke-width="3" />
      <circle cx="66" cy="57" r="2.5" fill={INK} /><circle cx="72" cy="55" r="2.5" fill={INK} /><circle cx="78" cy="57" r="2.5" fill={INK} />
    </>),
    'mitch-halcz': (<>
      <rect x="12" y="22" width="76" height="52" rx="12" fill="#ff6b5b" {...s} />
      <path d="M42 36 l24 12 l-24 12 z" fill="#fff8e7" {...s} stroke-width="3" />
      <path d="M88 60 q10 -4 8 -20" fill="none" {...s} />
      <path d="M34 74 v10 M66 74 v10" {...s} />
    </>),
    'ear-in-the-dog': (<>
      <path d="M22 50 q-14 -30 14 -30 l6 22 z" fill="#8a5a2b" {...s} />
      <path d="M78 50 q14 -30 -14 -30 l-6 22 z" fill="#8a5a2b" {...s} />
      <path d="M26 56 q0 -30 24 -30 q24 0 24 30" fill="none" {...s} stroke-width="7" />
      <rect x="14" y="50" width="20" height="32" rx="9" fill="#00b4a6" {...s} />
      <rect x="66" y="50" width="20" height="32" rx="9" fill="#00b4a6" {...s} />
      <path d="M44 74 q6 -12 12 0 M40 84 q10 8 20 0" fill="none" {...s} stroke-width="3" />
    </>),
    wkrotce: (<>
      <path d="M22 30 a10 10 0 1 0 6 16 h44 a10 10 0 1 0 6 -16 a10 10 0 0 0 -10 6 h-36 a10 10 0 0 0 -10 -6z" fill="#e8dcc6" {...s} transform="translate(0,14)" />
      <rect x="36" y="56" width="28" height="26" rx="5" fill="#9aa0a6" {...s} />
      <path d="M41 56 v-8 a9 9 0 0 1 18 0 v8" fill="none" {...s} />
      <circle cx="50" cy="68" r="3.5" fill={INK} />
    </>),
  }[id] || null;
  return <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden="true">{body}</svg>;
}
