import { useState } from 'preact/hooks';
import { go } from '../router.js';
import { saveProfile, validName } from '../store.js';
import { today } from '../util.js';
import breeds from '../data/breeds.pl.json';
import { BreedSearch } from '../components/BreedSearch.jsx';
import { PhotoPicker, DEFAULT_PHOTO } from '../components/PhotoPicker.jsx';
import { Legitymacja } from '../components/Legitymacja.jsx';
import { Paw } from '../components/art/Logo.jsx';

const cavalier = breeds.find((b) => b.id === 'cavalier');
const STEPS = ['Imię', 'Rasa', 'Zdjęcie', 'Gotowe'];

export function Onboarding() {
  const [step, setStep] = useState(0);
  const [imie, setImie] = useState(() => sessionStorage.getItem('psiuwuwu.nowe') || '');
  const [rasa, setRasa] = useState(null);
  const [zdjecie, setZdjecie] = useState(null);
  const [err, setErr] = useState('');

  const next = () => {
    if (step === 0 && !validName(imie)) { setErr('Imię musi mieć 2–20 znaków, bez znaków specjalnych.'); return; }
    setErr(''); setStep(step + 1);
  };
  const finish = () => {
    const r = rasa || cavalier;
    saveProfile({ imie: imie.trim(), rasa: { id: r.id, nazwa: r.nazwa }, zdjecie: zdjecie || DEFAULT_PHOTO, utworzono: today() });
    sessionStorage.removeItem('psiuwuwu.nowe');
    go('/');
  };

  return (
    <section class="panel narrow">
      <ol class="paws-progress" aria-label="Postęp">
        {STEPS.map((s, i) => (
          <li key={s} class={i <= step ? 'done' : ''} aria-current={i === step ? 'step' : undefined}><Paw size={28} /><span>{s}</span></li>
        ))}
      </ol>

      {step === 0 && (<>
        <h2>Jak masz na imię?</h2>
        <input class="input" value={imie} maxLength={20} aria-label="Imię" placeholder="np. Reksio" onInput={(e) => { setImie(e.target.value); setErr(''); }} />
      </>)}
      {step === 1 && (<>
        <h2>Jaką jesteś rasą?</h2>
        <BreedSearch value={rasa} onSelect={setRasa} />
        <p class="hint">Nie wiesz? Wybierz „Kundelek / mieszaniec”. Jeśli nic nie wybierzesz, zostaniesz Cavalierem.</p>
        {rasa && <p class="chosen">Wybrano: <strong>{rasa.nazwa}</strong></p>}
      </>)}
      {step === 2 && (<>
        <h2>Pokaż się!</h2>
        <PhotoPicker breed={rasa || cavalier} value={zdjecie} onChange={setZdjecie} />
      </>)}
      {step === 3 && (<>
        <h2>Twoja psia legitymacja</h2>
        <Legitymacja imie={imie.trim()} rasa={rasa || cavalier} zdjecie={zdjecie} />
      </>)}

      {err && <p class="error" role="alert">{err}</p>}
      <div class="wizard-nav">
        {step > 0 ? <button class="btn ghost" onClick={() => setStep(step - 1)}>← Wstecz</button> : <a class="btn ghost" href="#/login">← Anuluj</a>}
        {step < 3 ? <button class="btn" onClick={next}>Dalej →</button> : <button class="btn big" onClick={finish}>Gotowe, hau!</button>}
      </div>
    </section>
  );
}
