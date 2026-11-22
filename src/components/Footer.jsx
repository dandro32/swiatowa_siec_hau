import { useMemo } from 'preact/hooks';
import { FooterDog } from './art/FooterDog.jsx';
import { pick } from '../util.js';

const FACTS = [
  'Nos psa ma unikalny wzór — jak ludzki odcisk palca.',
  'Psy potrafią nauczyć się ponad 100 słów i gestów.',
  'Pies śpi nawet 14 godzin na dobę. Co za życie!',
  'Psy widzą świat głównie w odcieniach niebieskiego i żółtego.',
  'Węch psa jest tysiące razy lepszy niż nasz.',
  'Merdanie ogonem w prawo oznacza zwykle radość.',
  'Szczeniaczki rodzą się głuche i niewidzące, ale szybko to nadrabiają!',
  'Basenji to pies, który nie szczeka, tylko… jodłuje.',
];

export function Footer() {
  const fact = useMemo(() => pick(FACTS), []);
  return (
    <footer class="footer">
      <FooterDog />
      <p class="fact"><strong>Psi fakt dnia:</strong> {fact}</p>
      <p>© 2026 Światowa Sieć Hau. Żaden kot nie ucierpiał przy tworzeniu tej strony.</p>
      <p class="footer-links">
        <a href="#/" onClick={(e) => { e.preventDefault(); alert('Regulamin Merdania: § 1. Merdaj ile chcesz. § 2. Patrz § 1.'); }}>Regulamin Merdania</a>
        <a href="#/" onClick={(e) => { e.preventDefault(); alert('Polityka Kości: kości są wspólne, ale ta największa jest moja!'); }}>Polityka Kości</a>
        <a href="#/" onClick={(e) => { e.preventDefault(); alert('Hau hau! 🐶'); }}>Kontakt: zaszczekaj głośno</a>
      </p>
      <p class="muted">Działa na karmie i dobrym humorze 🦴</p>
      <p><strong>Twórczyni serwisu: Basia Dróżdzel</strong> 🐾</p>
    </footer>
  );
}
