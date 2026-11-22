import { Logo, Paw } from './art/Logo.jsx';
import { Avatar } from './Avatar.jsx';
import { useProfile } from '../store.js';
import { apps } from '../data/apps.js';
import { useState } from 'preact/hooks';

export function Header({ path }) {
  const [profil] = useProfile();
  const [wag, setWag] = useState(false);
  const appId = path.startsWith('/app/') ? path.split('/')[2] : null;
  const app = apps.find((a) => a.id === appId);
  const wiggle = () => { setWag(true); setTimeout(() => setWag(false), 700); };

  return (
    <header class="header" style={app ? { '--app': app.kolor } : undefined}>
      <div class="header-row">
        <a class={`brand ${wag ? 'wag' : ''}`} href="#/" onClick={wiggle} aria-label="Światowa Sieć Hau — strona główna">
          <Logo size={44} />
          <span class="brand-text">
            <span class="brand-name">Światowa Sieć Hau</span>
            <span class="brand-sub">PsiuWuWu</span>
          </span>
        </a>
        {profil ? (
          <a class="user-chip" href="#/profil" aria-label={`Profil: ${profil.imie}`}>
            <Avatar src={profil.zdjecie} look="reksio" size={40} label={profil.imie} />
            <span class="user-name">{profil.imie}</span>
          </a>
        ) : (
          <a class="login-btn" href="#/login" aria-label="Zaloguj się">
            <Paw size={26} />
            <span class="login-label">Wejdź</span>
          </a>
        )}
      </div>
      {app && (
        <div class="app-bar halftone">
          <a class="btn small back" href="#/">← Do budy</a>
          <h1 class="app-title">{app.nazwa}</h1>
        </div>
      )}
    </header>
  );
}
