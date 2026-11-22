import { render } from 'preact';
import { useRoute } from './router.js';
import { apps } from './data/apps.js';
import { Header } from './components/Header.jsx';
import { Footer } from './components/Footer.jsx';
import { Home } from './pages/Home.jsx';
import { Login } from './pages/Login.jsx';
import { Onboarding } from './pages/Onboarding.jsx';
import { Profile } from './pages/Profile.jsx';
import { PsieSemes } from './apps/psie-semes/PsieSemes.jsx';
import { Poogle } from './apps/poogle/Poogle.jsx';
import { PiesTajm } from './apps/piestajm/PiesTajm.jsx';
import { MitchHalcz } from './apps/mitch-halcz/MitchHalcz.jsx';
import { EarInTheDog } from './apps/ear-in-the-dog/EarInTheDog.jsx';

const APPS = {
  'psie-semes': PsieSemes, poogle: Poogle, piestajm: PiesTajm,
  'mitch-halcz': MitchHalcz, 'ear-in-the-dog': EarInTheDog,
};

function Page({ path, query }) {
  if (path === '/login') return <Login />;
  if (path === '/kreator') return <Onboarding />;
  if (path === '/profil') return <Profile />;
  if (path.startsWith('/app/')) {
    const App = APPS[path.split('/')[2]];
    if (App) return <App />;
  }
  return <Home query={query} />;
}

function Root() {
  const { path, query } = useRoute();
  const app = apps.find((a) => path === a.trasa);
  return (
    <div class="shell" style={app ? { '--app': app.kolor } : undefined}>
      <Header path={path} />
      <main class="main"><Page path={path} query={query} /></main>
      <Footer />
    </div>
  );
}

render(<Root />, document.getElementById('app'));
