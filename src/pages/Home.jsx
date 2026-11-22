import { apps } from '../data/apps.js';
import { AppTile } from '../components/AppTile.jsx';
import { Pagination } from '../components/Pagination.jsx';
import { Avatar } from '../components/Avatar.jsx';
import { useProfile } from '../store.js';
import { useMedia } from '../util.js';

export function Home({ query }) {
  const [profil] = useProfile();
  const wide = useMedia('(min-width: 600px)');
  const size = wide ? 12 : 6;
  const pages = Math.ceil(apps.length / size);
  const page = Math.min(Math.max(parseInt(query.strona) || 1, 1), pages);
  const slice = apps.slice((page - 1) * size, page * size);

  return (
    <section>
      <div class="hello">
        {profil ? (<>
          <Avatar src={profil.zdjecie} size={64} label={profil.imie} />
          <h2>Hau, {profil.imie}!</h2>
        </>) : (<>
          <h2>Hau! Witaj w Sieci Hau!</h2>
          <a class="btn small" href="#/login">Wejdź do budy 🐾</a>
        </>)}
      </div>
      <div class="tiles">{slice.map((a) => <AppTile key={a.id} app={a} />)}</div>
      <Pagination page={page} pages={pages} hrefFor={(n) => `#/?strona=${n}`} />
    </section>
  );
}
