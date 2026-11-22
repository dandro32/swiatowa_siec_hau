import { useState } from 'preact/hooks';
import breeds from '../../data/breeds.pl.json';
import { games } from '../../data/games.js';
import { useProfile, useStored } from '../../store.js';
import { BreedSearch } from '../../components/BreedSearch.jsx';
import { Avatar } from '../../components/Avatar.jsx';
import { GameScreen } from '../../components/art/Scene.jsx';

function PlayerPanel() {
  const [profil] = useProfile();
  const [over, setOver] = useStored('piestajm', null);
  const [open, setOpen] = useState(false);
  const imie = over?.imie || profil?.imie || 'Gość';
  const rasaId = over?.rasaId || profil?.rasa?.id;
  const rasa = breeds.find((b) => b.id === rasaId);

  return (
    <aside class="panel player-panel">
      <h3>Dane psiużytkownika</h3>
      <div class="player-row"><Avatar src={profil?.zdjecie} look="reksio" size={64} label={imie} />
        <div><div class="label">Imię</div><strong>{imie}</strong><div class="label">Rasa</div><strong>{rasa?.nazwa || 'Cavalier King Charles spaniel'}</strong></div>
      </div>
      {over && <p class="hint">Używasz innych danych tylko w grach.</p>}
      <button class="btn small" onClick={() => setOpen(!open)}>{open ? 'Zamknij' : '✏️ Zmień na potrzeby gier'}</button>
      {open && (
        <div class="player-edit">
          <label class="label" for="gn">Imię gracza</label>
          <input id="gn" class="input" maxLength={20} value={over?.imie ?? profil?.imie ?? ''}
            onInput={(e) => setOver({ imie: e.target.value, rasaId: over?.rasaId || profil?.rasa?.id })} />
          <label class="label">Rasa gracza</label>
          <BreedSearch value={rasa} onSelect={(b) => setOver({ imie: over?.imie ?? profil?.imie ?? '', rasaId: b.id })} />
          <button class="btn small ghost" onClick={() => setOver(null)}>Przywróć z profilu</button>
        </div>
      )}
    </aside>
  );
}

export function PiesTajm() {
  const [game, setGame] = useState(null);
  const g = games.find((x) => x.id === game);
  return (
    <section class="piestajm">
      <PlayerPanel />
      <div class="games">
        {!g ? (
          <div class="game-grid">
            {games.map((x) => (
              <article key={x.id} class="card game-card">
                <div class="game-thumb" style={{ background: x.kolor }}><GameScreen id={x.id} /></div>
                <h3>{x.tytul}</h3><p>{x.opis}</p>
                <button class="btn" onClick={() => setGame(x.id)}>Graj ▶</button>
              </article>
            ))}
          </div>
        ) : (
          <div class="card game-view">
            <div class="game-badge">Gra wkrótce! 🚧</div>
            <GameScreen id={g.id} />
            <h3>{g.tytul}</h3>
            <p>{g.opis} Na razie to tylko makieta.</p>
            <button class="btn ghost" onClick={() => setGame(null)}>← Wróć do gier</button>
          </div>
        )}
      </div>
    </section>
  );
}
