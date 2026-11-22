import { useState } from 'preact/hooks';
import { go } from '../router.js';
import { findProfile, login, validName } from '../store.js';
import { DogCharacter, LOOKS } from '../components/art/DogCharacter.jsx';

export function Login() {
  const [name, setName] = useState('');
  const [err, setErr] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (!validName(name)) { setErr('Imię musi mieć 2–20 znaków: litery, cyfry, spacje lub myślniki.'); return; }
    const existing = findProfile(name);
    if (existing) { login(existing); go('/'); }
    else { sessionStorage.setItem('psiuwuwu.nowe', name.trim()); go('/kreator'); }
  };

  return (
    <section class="panel narrow center">
      <DogCharacter {...LOOKS.reksio} size={120} />
      <div class="bubble">Hau! Kim jesteś?</div>
      <h2>Wejdź do budy</h2>
      <form onSubmit={submit}>
        <label class="label" for="login">Psie imię / login</label>
        <input id="login" class="input" value={name} maxLength={20} autocomplete="off" placeholder="np. Reksio"
          onInput={(e) => { setName(e.target.value); setErr(''); }} />
        {err && <p class="error" role="alert">{err}</p>}
        <button class="btn big" type="submit">Wejdź do budy 🐾</button>
      </form>
      <p class="hint">Bez hasła i bez e-maila — wystarczy imię. Nikomu go nie wysyłamy.</p>
    </section>
  );
}
