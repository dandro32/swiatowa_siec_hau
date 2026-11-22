/** Generator psa-postaci w stylu komiksowym (stoi na dwóch łapach, w ubranku). */
const INK = '#2b1d14';

function shade(hex, amt) {
  if (hex.length === 4) hex = '#' + [...hex.slice(1)].map((c) => c + c).join('');
  const n = parseInt(hex.slice(1), 16);
  const c = (v) => Math.max(0, Math.min(255, v + amt));
  return '#' + [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => c(v).toString(16).padStart(2, '0')).join('');
}

export function DogCharacter({
  fur = '#c68642', ear = 'long', hair = 'none', outfit = '#4aa3df', accessory = null,
  mood = 'happy', size = 120, bg = null, title = 'Piesek',
}) {
  const dark = shade(fur, -45);
  const light = shade(fur, 55);
  const stroke = { stroke: INK, 'stroke-width': 3.5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' };
  return (
    <svg viewBox="0 0 120 150" width={size} height={size * 1.25} role="img" aria-label={title} class="dog-char">
      {bg && <circle cx="60" cy="75" r="70" fill={bg} />}
      {/* ogon */}
      <path d="M86 112 q22 -6 20 -28" fill="none" {...stroke} class="dog-tail" />
      {/* nogi */}
      <path d="M46 128 v16 h-8 q-4 0 0 -4" fill={fur} {...stroke} />
      <path d="M74 128 v16 h8 q4 0 0 -4" fill={fur} {...stroke} />
      {/* ubranko */}
      <path d="M36 96 q24 -10 48 0 l6 40 q-30 8 -60 0 z" fill={outfit} {...stroke} />
      <path d="M52 100 l8 8 l8 -8" fill="none" {...stroke} stroke-width="2.5" />
      <circle cx="60" cy="124" r="2.5" fill={INK} />
      {/* ręce */}
      <path d="M36 102 q-14 10 -10 26" fill="none" {...stroke} stroke-width="6" stroke={INK} />
      <path d="M36 102 q-14 10 -10 26" fill="none" stroke={fur} stroke-width="2" stroke-linecap="round" />
      <path d="M84 102 q14 10 10 26" fill="none" {...stroke} stroke-width="6" />
      <path d="M84 102 q14 10 10 26" fill="none" stroke={fur} stroke-width="2" stroke-linecap="round" />
      {/* uszy (tył) */}
      {ear === 'long' && (<>
        <path d="M34 36 q-22 6 -18 50 q16 4 26 -22 z" fill={dark} {...stroke} />
        <path d="M86 36 q22 6 18 50 q-16 4 -26 -22 z" fill={dark} {...stroke} />
      </>)}
      {ear === 'curly' && (<>
        <path d="M34 38 q-26 4 -20 24 q-6 20 14 22 q10 -2 14 -22 z" fill={dark} {...stroke} />
        <path d="M86 38 q26 4 20 24 q6 20 -14 22 q-10 -2 -14 -22 z" fill={dark} {...stroke} />
      </>)}
      {ear === 'up' && (<>
        <path d="M32 44 l-4 -32 l24 18 z" fill={fur} {...stroke} />
        <path d="M88 44 l4 -32 l-24 18 z" fill={fur} {...stroke} />
        <path d="M33 38 l-1 -14 l10 9 z" fill="#f4a6b0" />
        <path d="M87 38 l1 -14 l-10 9 z" fill="#f4a6b0" />
      </>)}
      {/* głowa */}
      <ellipse cx="60" cy="62" rx="32" ry="30" fill={fur} {...stroke} />
      <ellipse cx="60" cy="74" rx="17" ry="13" fill={light} />
      {/* fryzura */}
      {hair === 'fringe' && <path d="M30 56 q4 -34 30 -32 q26 -2 30 32 q-12 -20 -30 -14 q-18 -6 -30 14 z" fill={dark} {...stroke} />}
      {hair === 'tuft' && <path d="M52 32 q8 -18 16 0 q-8 -4 -16 0 z" fill={dark} {...stroke} />}
      {hair === 'bangs' && <path d="M30 54 q2 -30 30 -30 q28 0 30 30 l-8 -4 l-6 8 l-8 -10 l-8 10 l-8 -10 l-6 8 z" fill={dark} {...stroke} />}
      {/* oczy */}
      {mood === 'sleepy' ? (<>
        <path d="M43 60 q5 4 10 0" fill="none" {...stroke} stroke-width="3" />
        <path d="M67 60 q5 4 10 0" fill="none" {...stroke} stroke-width="3" />
      </>) : (<>
        <ellipse cx="48" cy="60" rx="6" ry="7.5" fill={INK} />
        <ellipse cx="72" cy="60" rx="6" ry="7.5" fill={INK} />
        <circle cx="50" cy="57" r="2.4" fill="#fff" />
        <circle cx="74" cy="57" r="2.4" fill="#fff" />
        <circle cx="46.5" cy="62.5" r="1.1" fill="#fff" />
        <circle cx="70.5" cy="62.5" r="1.1" fill="#fff" />
      </>)}
      {/* rumieńce */}
      <ellipse cx="38" cy="72" rx="5" ry="3" fill="#ff8fa3" opacity=".7" />
      <ellipse cx="82" cy="72" rx="5" ry="3" fill="#ff8fa3" opacity=".7" />
      {/* nos i uśmiech ω */}
      <ellipse cx="60" cy="69" rx="5" ry="3.5" fill={INK} />
      <path d={mood === 'sad' ? 'M52 82 q4 -4 8 0 q4 -4 8 0' : 'M52 76 q4 7 8 0 q4 7 8 0'} fill="none" {...stroke} stroke-width="2.8" />
      {mood === 'happy' && <path d="M56 80 q4 8 8 0" fill="#f4727f" stroke={INK} stroke-width="2" stroke-linecap="round" class="dog-tongue" />}
      {/* akcesoria */}
      {accessory === 'bow' && (<g {...stroke} stroke-width="3"><path d="M60 34 l-14 -8 v16 z" fill="#ff5d8f" /><path d="M60 34 l14 -8 v16 z" fill="#ff5d8f" /><circle cx="60" cy="34" r="4" fill="#ff8fb3" /></g>)}
      {accessory === 'glasses' && (<g fill="rgba(255,255,255,.35)" {...stroke} stroke-width="3"><circle cx="48" cy="60" r="10" /><circle cx="72" cy="60" r="10" /><path d="M58 60 h4" /></g>)}
      {accessory === 'cap' && (<g {...stroke}><path d="M30 42 q30 -34 60 0 z" fill="#e85d4a" /><path d="M86 42 q20 0 24 6 q-10 2 -26 -2 z" fill="#c9402f" /></g>)}
      {accessory === 'crown' && <path d="M40 32 l6 -16 l7 10 l7 -14 l7 14 l7 -10 l6 16 z" fill="#ffd23f" {...stroke} stroke-width="3" />}
    </svg>
  );
}

/** Zestawy postaci używane w całej aplikacji. */
export const LOOKS = {
  reksio: { fur: '#f2e3c6', ear: 'long', hair: 'tuft', outfit: '#ef476f' },
  corali: { fur: '#e8a85a', ear: 'long', hair: 'fringe', outfit: '#ff7bac', accessory: 'bow' },
  ellie: { fur: '#fff4de', ear: 'curly', hair: 'none', outfit: '#6bcb77' },
  spike: { fur: '#7a5230', ear: 'up', hair: 'tuft', outfit: '#333a4d', accessory: 'cap' },
  ari: { fur: '#d9d9d9', ear: 'up', hair: 'none', outfit: '#ffd23f', accessory: 'glasses' },
  green: { fur: '#b97a3d', ear: 'long', hair: 'bangs', outfit: '#2fa84f' },
  roxi: { fur: '#ffc98b', ear: 'long', hair: 'fringe', outfit: '#9b5de5', accessory: 'bow' },
  muszeli: { fur: '#a05a2c', ear: 'curly', hair: 'none', outfit: '#4aa3df' },
  kk: { fur: '#6d4527', ear: 'long', hair: 'bangs', outfit: '#ff9f1c', accessory: 'glasses' },
  remsiusiek: { fur: '#f6c177', ear: 'up', hair: 'tuft', outfit: '#c77dff' },
  nook: { fur: '#e0b07a', ear: 'long', hair: 'fringe', outfit: '#00b4a6' },
  lilka: { fur: '#fff', ear: 'curly', hair: 'bangs', outfit: '#ff6b9d', accessory: 'bow' },
  minka: { fur: '#9c6b43', ear: 'long', hair: 'none', outfit: '#f77f00' },
  luke: { fur: '#4a3426', ear: 'up', hair: 'tuft', outfit: '#1982c4', accessory: 'cap' },
  maja: { fur: '#fff1dc', ear: 'long', hair: 'fringe', outfit: '#ff7bac', accessory: 'bow' },
};
