import { DogCharacter, LOOKS } from './DogCharacter.jsx';
/** Pies wystający zza krawędzi stopki. */
export function FooterDog() {
  return (
    <div class="footer-dog" aria-hidden="true">
      <DogCharacter {...LOOKS.reksio} size={80} />
    </div>
  );
}
