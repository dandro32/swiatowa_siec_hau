import { useRef, useState } from 'preact/hooks';
import { resizeToSquare, useBreedImage } from '../util.js';

export const DEFAULT_PHOTO = 'assets/breeds/cavalier.jpg';

export function PhotoPicker({ breed, value, onChange }) {
  const input = useRef();
  const [err, setErr] = useState('');
  const breedImg = useBreedImage(breed);

  const onFile = async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    try { setErr(''); onChange(await resizeToSquare(f)); }
    catch { setErr('Hau! Nie udało się wczytać tego zdjęcia.'); }
  };

  return (
    <div class="photo-picker">
      <div class="photo-preview"><img src={value || DEFAULT_PHOTO} alt="Podgląd zdjęcia" /></div>
      <div class="photo-actions">
        <input ref={input} type="file" accept="image/*" capture="user" hidden onChange={onFile} />
        <button type="button" class="btn" onClick={() => input.current.click()}>📷 Wgraj swoje zdjęcie jako pies</button>
        <button type="button" class="btn alt" disabled={!breedImg} onClick={() => onChange(breedImg)}>
          🐶 Użyj zdjęcia rasy{breed ? ` (${breed.nazwa})` : ''}
        </button>
        <button type="button" class="btn ghost" onClick={() => onChange(DEFAULT_PHOTO)}>Domyślny Cavalier</button>
        <p class="hint">Zdjęcie zostaje tylko na tym urządzeniu — nigdzie go nie wysyłamy.</p>
        {err && <p class="error" role="alert">{err}</p>}
      </div>
    </div>
  );
}
