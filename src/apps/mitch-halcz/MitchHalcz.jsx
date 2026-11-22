import { useState } from 'preact/hooks';
import { videos, kategorie, channels, defaultComments } from '../../data/videos.js';
import { hasBadWords, toggleIn, useProfile, useStored } from '../../store.js';
import { fmt, resizeToSquare, today } from '../../util.js';
import { Avatar } from '../../components/Avatar.jsx';
import { HeartButton } from '../../components/HeartButton.jsx';
import { Modal } from '../../components/Modal.jsx';
import { Scene } from '../../components/art/Scene.jsx';

function Thumb({ v }) {
  return v.miniatura ? <img class="vthumb" src={v.miniatura} alt="" /> : <Scene kind={v.scena} look={v.look} sky={v.sky} />;
}

function Card({ v, hearts, onOpen }) {
  const ch = channels[v.kanal] || { nazwa: v.kanalNazwa, look: 'reksio' };
  return (
    <button type="button" class="vcard" onClick={() => onOpen(v)}>
      <div class="vcard-thumb"><Thumb v={v} /><span class="play">▶</span></div>
      <div class="vcard-info">
        <Avatar look={ch.look} src={v.kanalZdjecie} size={40} label={ch.nazwa} />
        <div><strong>{v.tytul}</strong><small>{ch.nazwa} · {fmt(v.wyswietlenia)} wyśw. · ❤️ {v.serca + (hearts.includes(v.id) ? 1 : 0)}</small></div>
      </div>
    </button>
  );
}

function Player({ v, hearts, setHearts, onBack }) {
  const [profil] = useProfile();
  const [coms, setComs] = useStored('komentarze', {});
  const [playing, setPlaying] = useState(false);
  const [text, setText] = useState('');
  const [err, setErr] = useState('');
  const ch = channels[v.kanal] || { nazwa: v.kanalNazwa, look: 'reksio' };
  const list = [...(defaultComments[v.id] || []), ...((coms || {})[v.id] || [])];

  const add = (e) => {
    e.preventDefault();
    const t = text.trim();
    if (!t) return;
    if (t.length > 140) { setErr('Komentarz może mieć najwyżej 140 znaków.'); return; }
    if (hasBadWords(t)) { setErr('Hau! Piszmy miło — tego słowa nie możemy wysłać.'); return; }
    setComs({ ...(coms || {}), [v.id]: [...((coms || {})[v.id] || []), { autor: profil?.imie || 'Gość', zdjecie: profil?.zdjecie, tekst: t, data: today() }] });
    setText(''); setErr('');
  };

  return (
    <div class="watch">
      <button class="btn small ghost" onClick={onBack}>← Wszystkie filmiki</button>
      <div class={`video-box ${playing ? 'playing' : ''}`}>
        <Thumb v={v} />
        <button class="big-play" onClick={() => setPlaying(!playing)} aria-label={playing ? 'Pauza' : 'Odtwórz'}>{playing ? '⏸' : '▶'}</button>
        {playing && <div class="video-note">To tylko makieta — prawdziwy filmik pojawi się później 🎬</div>}
      </div>
      <h2>{v.tytul}</h2>
      <div class="watch-meta">
        <Avatar look={ch.look} src={v.kanalZdjecie} size={44} label={ch.nazwa} /><strong>{ch.nazwa}</strong>
        <span class="muted">{fmt(v.wyswietlenia + (playing ? 1 : 0))} wyśw.</span>
        <HeartButton active={hearts.includes(v.id)} count={v.serca + (hearts.includes(v.id) ? 1 : 0)} onClick={() => setHearts(toggleIn(hearts, v.id))} />
      </div>
      <p>{v.opis}</p>
      <h3>Komentarze ({list.length})</h3>
      <form class="chat-form" onSubmit={add}>
        <input class="input" value={text} maxLength={140} placeholder="Napisz komentarz…" aria-label="Komentarz" onInput={(e) => { setText(e.target.value); setErr(''); }} />
        <button class="btn" type="submit">Wyślij</button>
      </form>
      {err && <p class="error" role="alert">{err}</p>}
      <ul class="comments">
        {list.map((c, i) => (
          <li key={i}><Avatar src={c.zdjecie} look="ellie" size={36} label={c.autor} /><div><strong>{c.autor}</strong> <small>{c.data}</small><p>{c.tekst}</p></div></li>
        ))}
        {list.length === 0 && <li class="muted">Bądź pierwszy! Napisz „Hau!”.</li>}
      </ul>
    </div>
  );
}

function Upload({ onClose, onAdd }) {
  const [tytul, setTytul] = useState('');
  const [opis, setOpis] = useState('');
  const [plik, setPlik] = useState(null);
  const [mini, setMini] = useState(null);
  const [err, setErr] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (tytul.trim().length < 3) { setErr('Tytuł musi mieć co najmniej 3 znaki.'); return; }
    if (hasBadWords(tytul + ' ' + opis)) { setErr('Hau! Wybierz milszy tytuł i opis.'); return; }
    onAdd({ tytul: tytul.trim(), opis: opis.trim(), miniatura: mini, plik: plik?.name || null });
  };
  return (
    <Modal title="Dodaj swój filmik" onClose={onClose}>
      <form onSubmit={submit}>
        <label class="label" for="vt">Tytuł</label><input id="vt" class="input" maxLength={60} value={tytul} onInput={(e) => setTytul(e.target.value)} />
        <label class="label" for="vo">Opis</label><textarea id="vo" class="input" rows="3" maxLength={200} value={opis} onInput={(e) => setOpis(e.target.value)} />
        <label class="label" for="vf">Plik z filmikiem</label><input id="vf" type="file" accept="video/*" onChange={(e) => setPlik(e.target.files?.[0] || null)} />
        <label class="label" for="vm">Miniatura</label>
        <input id="vm" type="file" accept="image/*" onChange={async (e) => { const f = e.target.files?.[0]; if (f) setMini(await resizeToSquare(f, 200)); }} />
        <p class="hint">Plik nigdzie nie jest wysyłany — filmik pojawi się tylko na tej liście, na tym urządzeniu.</p>
        {err && <p class="error" role="alert">{err}</p>}
        <button class="btn big" type="submit">Wyślij filmik 🐾</button>
      </form>
    </Modal>
  );
}

export function MitchHalcz() {
  const [profil] = useProfile();
  const [kat, setKat] = useState('Polecane');
  const [cur, setCur] = useState(null);
  const [upload, setUpload] = useState(false);
  const [hearts, setHearts] = useStored('serduszka.filmy', []);
  const [mine, setMine] = useStored('filmyUzytkownika', []);

  const list = kat === 'Moje filmiki' ? mine : videos.filter((v) => v.kat.includes(kat));
  const addVideo = (d) => {
    setMine([{ id: 'u' + Date.now(), ...d, kanalNazwa: profil?.imie || 'Gość', kanalZdjecie: profil?.zdjecie, scena: 'tricks', look: 'reksio', kat: ['Moje filmiki'], wyswietlenia: 0, serca: 0 }, ...mine]);
    setUpload(false); setKat('Moje filmiki');
  };

  if (cur) return <Player v={cur} hearts={hearts} setHearts={setHearts} onBack={() => setCur(null)} />;
  return (
    <section>
      <div class="toolbar">
        <div class="tabs flat" role="tablist">
          {kategorie.map((k) => <button key={k} role="tab" aria-selected={kat === k} class={`tab ${kat === k ? 'on' : ''}`} onClick={() => setKat(k)}>{k}</button>)}
        </div>
        <button class="btn" onClick={() => setUpload(true)}>➕ Dodaj swój filmik</button>
      </div>
      <div class="vgrid">{list.map((v) => <Card key={v.id} v={v} hearts={hearts} onOpen={setCur} />)}</div>
      {list.length === 0 && <p class="center muted">Tu jeszcze pusto. Dodaj swój pierwszy filmik!</p>}
      {upload && <Upload onClose={() => setUpload(false)} onAdd={addVideo} />}
    </section>
  );
}
