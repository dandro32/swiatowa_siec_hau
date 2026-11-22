import { useEffect, useState } from 'preact/hooks';
import { playlists, artists, tracks, albums, radia } from '../../data/music.js';
import { toggleIn, useStored } from '../../store.js';
import { Cover } from '../../components/art/Scene.jsx';
import { DogCharacter, LOOKS } from '../../components/art/DogCharacter.jsx';
import { HeartButton } from '../../components/HeartButton.jsx';

const mmss = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

function Player({ now, playing, setPlaying, onNext, onClose, fav, toggleFav }) {
  const [pos, setPos] = useState(0);
  const [vol, setVol] = useState(70);
  const live = now.type === 'radio';
  useEffect(() => { setPos(0); }, [now.item.id]);
  useEffect(() => {
    if (!playing || live) return;
    const t = setInterval(() => setPos((p) => {
      if (p + 1 >= now.item.sek) { onNext(); return 0; }
      return p + 1;
    }), 1000);
    return () => clearInterval(t);
  }, [playing, now.item.id]);

  const title = now.item.tytul || now.item.nazwa;
  const album = now.type === 'track' ? albums[now.item.album] : null;
  return (
    <div class="mini-player" role="region" aria-label="Odtwarzacz">
      <div class="mp-cover">{album ? <Cover seed={now.item.album} colors={album.kolory} /> : <span class="radio-ico">📻</span>}</div>
      <div class="mp-info"><strong>{title}</strong><small>{live ? 'Na żywo 🔴' : now.item.artysta}</small></div>
      <div class="mp-controls">
        <button class="btn small" onClick={() => setPlaying(!playing)} aria-label={playing ? 'Pauza' : 'Graj'}>{playing ? '⏸' : '▶'}</button>
        <button class="btn small" onClick={onNext} aria-label="Następny">⏭</button>
        <button class={`btn small ${fav ? 'on' : ''}`} onClick={toggleFav} aria-label="Dodaj do ulubionych" aria-pressed={fav}>✓</button>
        <button class="btn small" onClick={onClose} aria-label="Zamknij odtwarzacz">✕</button>
      </div>
      <div class="mp-sliders">
        {!live && <label><span class="sr">Postęp</span><input type="range" min="0" max={now.item.sek} value={pos} onInput={(e) => setPos(+e.target.value)} /><small>{mmss(pos)} / {mmss(now.item.sek)}</small></label>}
        <label>🔊<span class="sr">Głośność</span><input type="range" min="0" max="100" value={vol} onInput={(e) => setVol(+e.target.value)} /></label>
      </div>
    </div>
  );
}

function TrackItem({ t, active, liked, onPlay, onHeart }) {
  return (
    <div class={`track ${active ? 'active' : ''}`}>
      <button class="track-play" onClick={() => onPlay(t)} aria-label={`Graj: ${t.tytul}`}>
        <Cover seed={t.album} colors={albums[t.album].kolory} /><span class="play">▶</span>
      </button>
      <strong>{t.tytul}</strong>
      <HeartButton active={liked} onClick={onHeart} label={`Serduszko: ${t.tytul}`} />
    </div>
  );
}

export function EarInTheDog() {
  const [view, setView] = useState('lib');
  const [pl, setPl] = useState(null);
  const [hearts, setHearts] = useStored('serduszka.utwory', []);
  const [favT, setFavT] = useStored('ulubione.utwory', []);
  const [favR, setFavR] = useStored('ulubione.radia', []);
  const [now, setNow] = useState(null);
  const [playing, setPlaying] = useState(false);

  const play = (type, item) => { setNow({ type, item }); setPlaying(true); };
  const list = pl ? tracks.filter((t) => t.playlist === pl) : tracks;
  const next = () => {
    if (!now) return;
    const src = now.type === 'track' ? tracks : radia;
    play(now.type, src[(src.findIndex((x) => x.id === now.item.id) + 1) % src.length]);
  };
  const isFav = now && (now.type === 'track' ? favT : favR).includes(now.item.id);
  const toggleFav = () => (now.type === 'track' ? setFavT(toggleIn(favT, now.item.id)) : setFavR(toggleIn(favR, now.item.id)));
  const grid = (arr) => (
    <div class="tgrid">{arr.map((t) => (
      <TrackItem key={t.id} t={t} active={now?.item.id === t.id} liked={hearts.includes(t.id)} onPlay={(x) => play('track', x)} onHeart={() => setHearts(toggleIn(hearts, t.id))} />
    ))}</div>
  );
  const radioList = (arr) => (
    <ul class="radios">{arr.map((r) => (
      <li key={r.id} class="card radio"><span class="radio-ico">📻</span><div><strong>{r.nazwa}</strong><small>{r.opis}</small></div>
        <button class="btn small" onClick={() => play('radio', r)}>▶ Słuchaj</button>
        <HeartButton active={favR.includes(r.id)} onClick={() => setFavR(toggleIn(favR, r.id))} label={`Ulubione: ${r.nazwa}`} /></li>
    ))}</ul>
  );

  return (
    <section class={`ear ${now ? 'with-player' : ''}`}>
      <div class="tabs flat" role="tablist">
        {[['lib', '🎵 Biblioteka'], ['fav', '❤️ Ulubione'], ['radio', '📻 Radia']].map(([id, n]) => (
          <button key={id} role="tab" aria-selected={view === id} class={`tab ${view === id ? 'on' : ''}`} onClick={() => setView(id)}>{n}</button>
        ))}
      </div>

      {view === 'lib' && (
        <div class="ear-layout">
          <aside class="panel ear-side">
            <h3>Playlisty</h3>
            <ul class="playlists">
              <li><button class={`pl ${!pl ? 'on' : ''}`} onClick={() => setPl(null)}>Wszystkie utwory</button></li>
              {playlists.map((p) => <li key={p.id}><button class={`pl ${pl === p.id ? 'on' : ''}`} onClick={() => setPl(p.id)}>{p.nazwa}</button></li>)}
            </ul>
            {artists.map((a) => (
              <div key={a.id} class="artist"><DogCharacter {...LOOKS[a.look]} size={90} bg="#ffe0ee" /><strong>{a.nazwa}</strong><small>{a.opis}</small></div>
            ))}
          </aside>
          <div>
            <h3>{pl ? playlists.find((p) => p.id === pl).nazwa : 'Wszystkie utwory'}</h3>
            {grid(list)}
            {!pl && (<><h3>Albumy</h3><div class="albums">{albums.map((a, i) => <figure key={a.nazwa}><Cover seed={i} colors={a.kolory} /><figcaption>{a.nazwa}</figcaption></figure>)}</div></>)}
          </div>
        </div>
      )}
      {view === 'fav' && (
        <div>
          <h3>Ulubione utwory</h3>
          {favT.length || hearts.length ? grid(tracks.filter((t) => favT.includes(t.id) || hearts.includes(t.id))) : <p class="muted">Jeszcze nic tu nie ma. Kliknij serduszko przy utworze!</p>}
          <h3>Ulubione radia</h3>
          {favR.length ? radioList(radia.filter((r) => favR.includes(r.id))) : <p class="muted">Brak ulubionych radiostacji.</p>}
        </div>
      )}
      {view === 'radio' && <div><h3>Radia</h3>{radioList(radia)}</div>}

      {now && <Player now={now} playing={playing} setPlaying={setPlaying} onNext={next} onClose={() => { setNow(null); setPlaying(false); }} fav={isFav} toggleFav={toggleFav} />}
    </section>
  );
}
