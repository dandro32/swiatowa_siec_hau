import { useMemo, useState } from 'preact/hooks';
import breeds from '../../data/breeds.pl.json';
import { fetchBreedImage, norm } from '../../util.js';
import { DogCharacter, LOOKS } from '../../components/art/DogCharacter.jsx';
import { BreedThumb } from '../../components/BreedSearch.jsx';

const LETTERS = [...new Set(breeds.map((b) => b.nazwa[0].toUpperCase()))].sort((a, b) => a.localeCompare(b, 'pl'));

async function fetchWiki(title) {
  const r = await fetch(`https://pl.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`);
  if (!r.ok) throw new Error('wiki');
  const j = await r.json();
  return { extract: j.extract, thumb: j.thumbnail?.source };
}

function Result({ data }) {
  const { breed, img, wiki, offline } = data;
  const photo = img || wiki?.thumb || (breed.id === 'cavalier' ? 'assets/breeds/cavalier.jpg' : null);
  return (
    <article class="result card">
      <div class="result-photo">
        {photo ? <img src={photo} alt={breed.nazwa} /> : <DogCharacter {...LOOKS.reksio} size={140} />}
      </div>
      <div class="result-body">
        <h2>{breed.nazwa}</h2>
        <p>{wiki?.extract || breed.opis}</p>
        <ul class="traits">
          <li>📏 Wielkość: <strong>{breed.wielkosc}</strong></li>
          <li>💛 Charakter: <strong>{breed.charakter}</strong></li>
        </ul>
        {offline && <p class="hint">Jesteś offline albo Wikipedia śpi, więc pokazuję krótki opis z budy.</p>}
        {wiki?.extract && <p class="hint">Źródło: Wikipedia · zdjęcia: Dog CEO</p>}
      </div>
    </article>
  );
}

export function Poogle() {
  const [q, setQ] = useState('');
  const [state, setState] = useState({ kind: 'idle' }); // idle | loading | result | none | letter
  const letterList = useMemo(() => (state.kind === 'letter' ? breeds.filter((b) => b.nazwa[0].toUpperCase() === state.letter) : []), [state]);

  const open = async (breed) => {
    setQ(breed.nazwa);
    setState({ kind: 'loading' });
    const [img, wiki] = await Promise.allSettled([
      breed.id === 'cavalier' ? Promise.resolve('assets/breeds/cavalier.jpg') : fetchBreedImage(breed.dog),
      fetchWiki(breed.wiki),
    ]);
    setState({ kind: 'result', data: {
      breed, img: img.value || null, wiki: wiki.status === 'fulfilled' ? wiki.value : null, offline: wiki.status !== 'fulfilled',
    } });
  };

  const search = (e) => {
    e?.preventDefault();
    const n = norm(q.trim());
    if (!n) return;
    const found = breeds.find((b) => norm(b.nazwa) === n) || breeds.find((b) => norm(b.nazwa).includes(n));
    found ? open(found) : setState({ kind: 'none' });
  };

  return (
    <section class="poogle">
      <h2 class="poogle-logo" aria-label="Poogle"><span>P</span><span>o</span><span>o</span><span>g</span><span>l</span><span>e</span></h2>
      <form class="searchbar" onSubmit={search} role="search">
        <button class="search-btn" type="submit" aria-label="Szukaj">🔍</button>
        <input class="input" type="search" value={q} placeholder="Wpisz rasę, np. border collie" aria-label="Szukaj rasy"
          onInput={(e) => setQ(e.target.value)} />
      </form>

      <div class="alphabet" role="group" aria-label="Alfabet ras">
        {LETTERS.map((l) => (
          <button key={l} type="button" class={`letter ${state.letter === l ? 'on' : ''}`} onClick={() => { setQ(''); setState({ kind: 'letter', letter: l }); }}>{l}</button>
        ))}
      </div>

      {state.kind === 'loading' && <p class="center sniff">Węszę… 🐽</p>}
      {state.kind === 'result' && <Result data={state.data} />}
      {state.kind === 'letter' && (
        <div class="card">
          <h3>Rasy na literę {state.letter}</h3>
          <ul class="breed-list">
            {letterList.map((b) => (
              <li key={b.id}><button type="button" class="breed-row" onClick={() => open(b)}><BreedThumb breed={b} size={44} /> {b.nazwa}</button></li>
            ))}
          </ul>
        </div>
      )}
      {state.kind === 'none' && (
        <div class="card center notfound">
          <DogCharacter {...LOOKS.ari} mood="sad" size={120} />
          <div class="bubble">Hmm, węszę… nic nie wyczułem.</div>
          <p>Nie znam rasy „{q}”. Spróbuj inaczej albo kliknij literę!</p>
        </div>
      )}
    </section>
  );
}
