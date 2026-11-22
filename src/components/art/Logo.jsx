const INK = '#2b1d14';
export function Logo({ size = 48 }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} role="img" aria-label="Logo Światowa Sieć Hau" class="logo-svg">
      <path d="M22 30 q-18 0 -14 34 q14 2 20 -22 z" fill="#8a5a2b" stroke={INK} stroke-width="4" stroke-linejoin="round" />
      <path d="M78 30 q18 0 14 34 q-14 2 -20 -22 z" fill="#8a5a2b" stroke={INK} stroke-width="4" stroke-linejoin="round" />
      <circle cx="50" cy="52" r="36" fill="#5ab4ea" stroke={INK} stroke-width="4" />
      <path d="M30 40 q10 -10 22 -2 q6 8 -6 12 q-10 2 -8 10 q-8 -4 -8 -20z" fill="#6bcb77" stroke={INK} stroke-width="3" stroke-linejoin="round" />
      <path d="M60 58 q10 -4 14 6 q-2 10 -12 10 q-6 -6 -2 -16z" fill="#6bcb77" stroke={INK} stroke-width="3" stroke-linejoin="round" />
      <ellipse cx="50" cy="60" rx="7" ry="5" fill={INK} />
      <circle cx="40" cy="48" r="3" fill="#fff" stroke={INK} stroke-width="2" />
      <circle cx="60" cy="48" r="3" fill="#fff" stroke={INK} stroke-width="2" />
    </svg>
  );
}

export function Paw({ size = 24, color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" fill={color}>
      <ellipse cx="12" cy="16" rx="5.5" ry="4.5" />
      <ellipse cx="5.5" cy="10.5" rx="2.2" ry="2.8" />
      <ellipse cx="9.5" cy="6" rx="2.2" ry="3" />
      <ellipse cx="14.5" cy="6" rx="2.2" ry="3" />
      <ellipse cx="18.5" cy="10.5" rx="2.2" ry="2.8" />
    </svg>
  );
}

export function Bone({ size = 24, color = '#fff8e7' }) {
  return (
    <svg viewBox="0 0 40 20" width={size * 2} height={size} aria-hidden="true">
      <path d="M8 3 a4 4 0 1 0 2 7 h20 a4 4 0 1 0 2 -7 a4 4 0 0 0 -4 2 h-16 a4 4 0 0 0 -4 -2z" fill={color} stroke={INK} stroke-width="2" stroke-linejoin="round" />
    </svg>
  );
}
