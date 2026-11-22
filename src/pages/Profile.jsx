import { useState } from 'preact/hooks';
import { go } from '../router.js';
import { logout, saveProfile, useProfile, validName } from '../store.js';
import breeds from '../data/breeds.pl.json';
import { BreedSearch } from '../components/BreedSearch.jsx';
import { PhotoPicker } from '../components/PhotoPicker.jsx';
import { Legitymacja } from '../components/Legitymacja.jsx';

export function Profile() {
  const [profil] = useProfile();
  const [edit, setEdit] = useState(false);
  const [imie, setImie] = useState(profil?.imie || '');
  const [rasa, setRasa] = useState(profil ? breeds.find((b) => b.id === profil.rasa.id) : null);
  const [zdjecie, setZdjecie] = useState(profil?.zdjecie);
  const [err, setErr] = useState('');

  if (!profil) return (
    <section class="panel narrow center"><h2>Nie jesteś zalogowany</h2><a class="btn" href="#/login">Wejdź do budy</a></section>
  );

  const save = () => {
    if (!validName(imie)) { setErr('Imię musi mieć 2–20 znaków, bez znaków specjalnych.'); return; }
    saveProfile({ ...profil, imie: imie.trim(), rasa: { id: rasa.id, nazwa: rasa.nazwa }, zdjecie });
    setEdit(false); setErr('');
  };

  return (
    <section class="panel narrow">
      <h2>Mój profil</h2>
      {!edit ? (<>
        <Legitymacja {...profil} />
        <p class="hint">W budzie od: {profil.utworzono}</p>
        <div class="wizard-nav">
          <button class="btn" onClick={() => setEdit(true)}>✏️ Edytuj</button>
          <button class="btn ghost" onClick={() => { logout(); go('/'); }}>Wyloguj (idę spać do budy)</button>
        </div>
      </>) : (<>
        <label class="label" for="pn">Imię</label>
        <input id="pn" class="input" value={imie} maxLength={20} onInput={(e) => setImie(e.target.value)} />
        <label class="label">Rasa</label>
        <BreedSearch value={rasa} onSelect={setRasa} />
        <label class="label">Zdjęcie</label>
        <PhotoPicker breed={rasa} value={zdjecie} onChange={setZdjecie} />
        {err && <p class="error" role="alert">{err}</p>}
        <div class="wizard-nav">
          <button class="btn ghost" onClick={() => setEdit(false)}>Anuluj</button>
          <button class="btn" onClick={save}>Zapisz</button>
        </div>
      </>)}
    </section>
  );
}
