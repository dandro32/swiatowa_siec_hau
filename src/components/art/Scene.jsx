import { DogCharacter, LOOKS } from './DogCharacter.jsx';

const INK = '#2b1d14';
const s = { stroke: INK, 'stroke-width': 3, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' };

const PROPS = {
  bone: <path d="M118 120 a8 8 0 1 0 4 14 h26 a8 8 0 1 0 4 -14 a8 8 0 0 0 -8 4 h-18 a8 8 0 0 0 -8 -4z" fill="#fff8e7" {...s} />,
  dance: <g {...s} fill="#ffd23f"><path d="M24 40 l4 10 l10 2 l-8 7 l2 10 l-8 -6 l-9 5 l3 -10 l-8 -7 l10 -1z" /><circle cx="150" cy="40" r="6" fill="#ff5d8f" /></g>,
  origami: <g {...s}><path d="M120 96 l24 -20 l24 20 l-24 14z" fill="#ff9f1c" /><path d="M144 76 v34" /></g>,
  garden: <g {...s}><path d="M20 140 v-26" /><circle cx="20" cy="108" r="9" fill="#ff5d8f" /><path d="M160 140 v-20" /><circle cx="160" cy="114" r="8" fill="#ffd23f" /></g>,
  birds: <g {...s} fill="none"><path d="M24 30 q6 -8 12 0 q6 -8 12 0" /><path d="M130 22 q6 -8 12 0 q6 -8 12 0" /><path d="M150 52 q5 -6 10 0 q5 -6 10 0" /></g>,
  fashion: <g {...s}><path d="M130 100 l16 -10 l16 10 l-4 30 h-24z" fill="#9b5de5" /></g>,
  mine: <g {...s}><path d="M128 100 l30 30" /><path d="M120 108 q16 -20 40 -6" fill="none" stroke-width="5" /></g>,
  book: <g {...s}><rect x="120" y="110" width="42" height="26" rx="3" fill="#6bcb77" /><path d="M141 110 v26" /></g>,
  draw: <g {...s}><path d="M126 130 l30 -30 l8 8 l-30 30 l-12 4z" fill="#ffd23f" /></g>,
  tricks: <g {...s} fill="#ff5d8f"><circle cx="140" cy="110" r="10" /><circle cx="162" cy="96" r="7" fill="#4aa3df" /><circle cx="24" cy="100" r="8" fill="#ffd23f" /></g>,
  music: <g {...s} fill={INK}><path d="M130 100 v-34 l24 -6 v34" fill="none" /><ellipse cx="124" cy="102" rx="8" ry="6" /><ellipse cx="148" cy="96" rx="8" ry="6" /></g>,
};

/** Miniatura filmu / ilustracja sceny. `kind` wybiera rekwizyt. */
export function Scene({ kind = 'bone', look = 'reksio', sky = '#bfe6ff', ground = '#8fd98a', mood = 'happy', width = '100%' }) {
  return (
    <svg viewBox="0 0 180 135" preserveAspectRatio="xMidYMid slice" style={{ width, display: 'block' }} role="img" aria-label="Ilustracja" class="scene">
      <rect width="180" height="135" fill={sky} />
      <defs><pattern id={`dots-${kind}`} width="8" height="8" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.2" fill="rgba(255,255,255,.55)" /></pattern></defs>
      <rect width="180" height="135" fill={`url(#dots-${kind})`} />
      <circle cx="150" cy="24" r="14" fill="#ffe27a" stroke={INK} stroke-width="3" />
      <ellipse cx="90" cy="140" rx="120" ry="34" fill={ground} stroke={INK} stroke-width="3" />
      {PROPS[kind]}
      <g transform="translate(50 6) scale(.8)"><DogCharacter {...(LOOKS[look] || LOOKS.reksio)} mood={mood} size={96} /></g>
    </svg>
  );
}

/** Okładka albumu: kolorowe kształty + nutka. */
export function Cover({ seed = 0, colors = ['#ff7bac', '#ffd23f', '#00b4a6'], size = '100%' }) {
  const [a, b, c] = colors;
  const v = seed % 4;
  return (
    <svg viewBox="0 0 100 100" style={{ width: size, display: 'block' }} role="img" aria-label="Okładka albumu" class="cover">
      <rect width="100" height="100" fill={a} />
      {v === 0 && <><circle cx="30" cy="70" r="34" fill={b} stroke={INK} stroke-width="3" /><circle cx="72" cy="30" r="20" fill={c} stroke={INK} stroke-width="3" /></>}
      {v === 1 && <><rect x="-10" y="55" width="120" height="30" fill={b} stroke={INK} stroke-width="3" transform="rotate(-18 50 70)" /><circle cx="70" cy="28" r="16" fill={c} stroke={INK} stroke-width="3" /></>}
      {v === 2 && <><path d="M0 100 q50 -80 100 0z" fill={b} stroke={INK} stroke-width="3" /><path d="M20 100 q30 -50 60 0z" fill={c} stroke={INK} stroke-width="3" /></>}
      {v === 3 && <><path d="M10 20 l30 -10 l30 20 l-10 40 l-40 10z" fill={b} stroke={INK} stroke-width="3" /><circle cx="68" cy="70" r="18" fill={c} stroke={INK} stroke-width="3" /></>}
      <g transform="translate(36 34) scale(.9)" fill="#fff" stroke={INK} stroke-width="3" stroke-linejoin="round"><path d="M10 40 v-30 l22 -6 v30" fill="none" /><ellipse cx="6" cy="42" rx="7" ry="5" /><ellipse cx="28" cy="36" rx="7" ry="5" /></g>
    </svg>
  );
}

/** Ekrany gier — makiety. */
export function GameScreen({ id, avatar }) {
  if (id === 'mega-robio') return (
    <svg viewBox="0 0 240 160" class="game-svg" role="img" aria-label="Mega Robio — makieta">
      <rect width="240" height="160" fill="#8fd1ff" />
      <rect y="110" width="240" height="50" fill="#8b5a2b" stroke={INK} stroke-width="3" />
      {[0,1,2].map((i) => <path key={i} d={`M${14 + i * 22} 12 q-8 -8 -8 -14 q8 -2 8 6 q0 -8 8 -6 q0 6 -8 14z`} transform="translate(0 20)" fill="#ff3d5a" stroke={INK} stroke-width="2.5" />)}
      <g font-family="Baloo 2, sans-serif" font-weight="800" font-size="13" fill={INK}>
        <rect x="190" y="8" width="44" height="82" rx="8" fill="#fff8e7" stroke={INK} stroke-width="3" />
        <text x="198" y="30">🪵85</text><text x="198" y="54">🪨99</text><text x="194" y="78">🪙400</text>
      </g>
      <rect x="110" y="64" width="50" height="46" fill="#ffd9a0" stroke={INK} stroke-width="3" /><path d="M104 66 l31 -26 l31 26z" fill="#e85d4a" stroke={INK} stroke-width="3" stroke-linejoin="round" />
      <g transform="translate(40 40) scale(.6)"><DogCharacter {...LOOKS.spike} size={96} /></g>
      <path d="M96 120 l30 -26" stroke={INK} stroke-width="5" stroke-linecap="round" />
    </svg>
  );
  if (id === 'owocki') return (
    <svg viewBox="0 0 240 160" class="game-svg" role="img" aria-label="Owocki — makieta">
      <rect width="240" height="160" fill="#c8f0c0" />
      <rect y="136" width="240" height="24" fill="#6bcb77" stroke={INK} stroke-width="3" />
      <g font-size="22"><text x="30" y="40">🍎</text><text x="90" y="70">🍌</text><text x="150" y="30">🍓</text><text x="200" y="80">🍊</text><text x="60" y="110">🍇</text></g>
      <g font-family="Baloo 2, sans-serif" font-weight="800" font-size="13" fill={INK}><rect x="6" y="6" width="150" height="24" rx="12" fill="#fff8e7" stroke={INK} stroke-width="3" /><text x="16" y="23">🍎 12 🍌 7 🍓 3</text></g>
      <g transform="translate(88 64) scale(.62)"><DogCharacter {...LOOKS.ari} size={96} /></g>
      <path d="M92 138 q28 -18 56 0z" fill="#d79b52" stroke={INK} stroke-width="3" />
    </svg>
  );
  return (
    <svg viewBox="0 0 240 160" class="game-svg" role="img" aria-label="Psiocaboca — makieta">
      <rect width="240" height="160" fill="#ffe6f0" />
      <rect x="100" y="14" width="130" height="136" fill="#fff8e7" stroke={INK} stroke-width="3" />
      <path d="M100 82 h130 M165 14 v136" stroke={INK} stroke-width="3" />
      <rect x="112" y="30" width="26" height="22" fill="#9ad7ff" stroke={INK} stroke-width="2.5" /><rect x="178" y="100" width="40" height="22" rx="4" fill="#ff9fb8" stroke={INK} stroke-width="2.5" />
      <circle cx="195" cy="48" r="12" fill="#ffd23f" stroke={INK} stroke-width="2.5" /><rect x="112" y="108" width="34" height="30" fill="#c68642" stroke={INK} stroke-width="2.5" />
      <g transform="translate(6 24) scale(.8)"><DogCharacter {...LOOKS.roxi} size={96} /></g>
    </svg>
  );
}
