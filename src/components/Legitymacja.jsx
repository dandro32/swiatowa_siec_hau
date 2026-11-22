import { Paw } from './art/Logo.jsx';
import { DEFAULT_PHOTO } from './PhotoPicker.jsx';

export function Legitymacja({ imie, rasa, zdjecie }) {
  return (
    <div class="id-card">
      <div class="id-head"><Paw size={20} /> Psia Legitymacja</div>
      <div class="id-body">
        <img class="id-photo" src={zdjecie || DEFAULT_PHOTO} alt={`Zdjęcie: ${imie || 'pies'}`} />
        <dl>
          <dt>Imię</dt><dd>{imie || '…'}</dd>
          <dt>Rasa</dt><dd>{rasa?.nazwa || 'Cavalier King Charles spaniel'}</dd>
        </dl>
      </div>
    </div>
  );
}
