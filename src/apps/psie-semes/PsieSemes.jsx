import { useEffect, useRef, useState } from 'preact/hooks';
import { contacts, recent, stickers } from '../../data/contacts.js';
import { Avatar } from '../../components/Avatar.jsx';
import { DogCharacter, LOOKS } from '../../components/art/DogCharacter.jsx';
import { useProfile } from '../../store.js';
import { pick } from '../../util.js';

const TABS = [['phone', '📞', 'Telefon'], ['msg', '💬', 'Wiadomości'], ['cam', '🎥', 'Kamera']];

function Chat({ c }) {
  const [profil] = useProfile();
  const [msgs, setMsgs] = useState([{ od: 'on', t: pick(c.odp) }]);
  const [text, setText] = useState('');
  const end = useRef();
  useEffect(() => { setMsgs([{ od: 'on', t: pick(c.odp) }]); }, [c.id]);
  useEffect(() => { end.current?.scrollIntoView({ block: 'nearest' }); }, [msgs]);

  const send = (t) => {
    t = t.trim().slice(0, 200);
    if (!t) return;
    setMsgs((m) => [...m, { od: 'ja', t }]);
    setText('');
    setTimeout(() => setMsgs((m) => [...m, { od: 'on', t: pick(c.odp) }]), 900);
  };
  return (
    <div class="chat">
      <div class="chat-log" aria-live="polite">
        {msgs.map((m, i) => (
          <div key={i} class={`msg ${m.od}`}>
            {m.od === 'on' && <Avatar look={c.look} size={32} label={c.imie} />}
            <span class="bubble-msg">{m.t}</span>
            {m.od === 'ja' && <Avatar src={profil?.zdjecie} look="reksio" size={32} label="Ja" />}
          </div>
        ))}
        <div ref={end} />
      </div>
      <div class="stickers">{stickers.map((s) => <button key={s} type="button" class="chip" onClick={() => send(s)}>{s}</button>)}</div>
      <form class="chat-form" onSubmit={(e) => { e.preventDefault(); send(text); }}>
        <input class="input" value={text} maxLength={200} placeholder="Napisz „Hau!”…" aria-label="Wiadomość" onInput={(e) => setText(e.target.value)} />
        <button class="btn" type="submit">Wyślij</button>
      </form>
    </div>
  );
}

function Call({ c, video, onEnd }) {
  const [profil] = useProfile();
  const [sec, setSec] = useState(0);
  useEffect(() => { const t = setInterval(() => setSec((s) => s + 1), 1000); return () => clearInterval(t); }, []);
  const connecting = sec < 2;
  return (
    <div class={`call ${video ? 'video' : ''}`}>
      {video ? (
        <div class="video-stage">
          <DogCharacter {...LOOKS[c.look]} size={170} />
          <div class="pip"><Avatar src={profil?.zdjecie} look="reksio" size={64} label="Ja" /></div>
        </div>
      ) : <div class="pulse"><Avatar look={c.look} size={120} label={c.imie} /></div>}
      <h3>{connecting ? `${video ? 'Łączę wideo z' : 'Dzwonię do'} ${c.imie}… 🐾` : `${c.imie} odebrał(a)! ${String(Math.floor(sec / 60)).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')}`}</h3>
      {!connecting && <div class="bubble">Hau hau!</div>}
      <button class="btn danger big" onClick={onEnd}>Rozłącz</button>
    </div>
  );
}

export function PsieSemes() {
  const [tab, setTab] = useState('msg');
  const [sel, setSel] = useState(null);
  const [calling, setCalling] = useState(false);
  const all = [...contacts, ...recent];
  const c = all.find((x) => x.id === sel);

  const choose = (id) => { setSel(id); setCalling(false); };
  const changeTab = (t) => { setTab(t); setCalling(false); };

  return (
    <section class="semes">
      <div class="panel contacts-panel">
        <h2 class="sketch-title">Psie Semes</h2>
        <ul class="contacts">
          {contacts.map((x) => (
            <li key={x.id}><button type="button" class={`contact ${sel === x.id ? 'on' : ''}`} onClick={() => choose(x.id)}>
              <Avatar look={x.look} size={48} label={x.imie} /><span>{x.imie}</span></button></li>
          ))}
        </ul>
      </div>
      <div class="panel talk-panel">
        <div class="tabs" role="tablist">
          {TABS.map(([id, ico, name]) => (
            <button key={id} role="tab" aria-selected={tab === id} aria-label={name} class={`tab ${tab === id ? 'on' : ''}`} onClick={() => changeTab(id)}>
              <span aria-hidden="true">{ico}</span><span class="tab-name">{name}</span>
            </button>
          ))}
        </div>
        {!c ? (
          <>
            <h3 class="sub">Ostatnie rozmowy</h3>
            <ul class="contacts one">
              {recent.map((x) => (
                <li key={x.id}><button type="button" class="contact" onClick={() => choose(x.id)}>
                  <Avatar look={x.look} size={48} label={x.imie} /><span>{x.imie}<small>{x.ostatnia}</small></span></button></li>
              ))}
            </ul>
          </>
        ) : (
          <div class="talk">
            <div class="talk-head">
              <button class="btn small ghost" onClick={() => setSel(null)}>← Lista</button>
              <Avatar look={c.look} size={36} label={c.imie} /><strong>{c.imie}</strong>
            </div>
            {tab === 'msg' && <Chat c={c} />}
            {tab !== 'msg' && !calling && (
              <div class="center call-start">
                <Avatar look={c.look} size={110} label={c.imie} />
                <button class="btn big" onClick={() => setCalling(true)}>{tab === 'phone' ? `📞 Zadzwoń do ${c.imie}` : `🎥 Wideo z ${c.imie}`}</button>
              </div>
            )}
            {tab !== 'msg' && calling && <Call key={c.id + tab} c={c} video={tab === 'cam'} onEnd={() => setCalling(false)} />}
          </div>
        )}
      </div>
    </section>
  );
}
