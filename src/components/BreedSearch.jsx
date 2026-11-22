import { useState } from 'preact/hooks';
import breeds from '../data/breeds.pl.json';
import { norm, useBreedImage } from '../util.js';
import { DogCharacter } from './art/DogCharacter.jsx';

export function BreedThumb({ breed, size = 40 }) {
  const src = useBreedImage(breed);
  return (
    <span class="breed-thumb" style={{ width: size + 'px', height: size + 'px' }}>
      {src ? <img src={src} alt="" loading="lazy" /> : <DogCharacter size={size * 0.8} title="" />}
    </span>
  );
}

export function findBreeds(q, limit = 6) {
  const n = norm(q.trim());
  if (!n) return [];
  return breeds.filter((b) => norm(b.nazwa).includes(n)).slice(0, limit);
}

/** Wyszukiwarka ras z autouzupełnianiem (bez polskich znaków i wielkości liter). */
export function BreedSearch({ value, onSelect, placeholder = 'Zacznij pisać, np. jamn…' }) {
  const [q, setQ] = useState(value?.nazwa || '');
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  const list = open ? findBreeds(q) : [];

  const choose = (b) => { onSelect(b); setQ(b.nazwa); setOpen(false); };
  const onKey = (e) => {
    if (!list.length) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); setIdx((idx + 1) % list.length); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setIdx((idx - 1 + list.length) % list.length); }
    else if (e.key === 'Enter') { e.preventDefault(); choose(list[idx]); }
    else if (e.key === 'Escape') setOpen(false);
  };

  return (
    <div class="breed-search">
      <input class="input" type="search" value={q} placeholder={placeholder} aria-label="Szukaj rasy"
        autocomplete="off" role="combobox" aria-expanded={list.length > 0}
        onInput={(e) => { setQ(e.target.value); setOpen(true); setIdx(0); }} onKeyDown={onKey} onFocus={() => setOpen(true)} />
      {open && q.trim() && (
        <ul class="suggest" role="listbox">
          {list.length === 0 && <li class="suggest-empty">Hmm, nie znam takiej rasy… Wybierz „Kundelek / mieszaniec”!</li>}
          {list.map((b, i) => (
            <li key={b.id} role="option" aria-selected={i === idx} class={i === idx ? 'sel' : ''}
              onMouseDown={(e) => { e.preventDefault(); choose(b); }}>
              <BreedThumb breed={b} /> <span>{b.nazwa}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
