import { AppIcon } from './art/AppIcon.jsx';

export function AppTile({ app }) {
  const inner = (
    <>
      <span class="tile-icon" style={{ background: app.kolor }}>
        <AppIcon id={app.gotowa ? app.id : 'wkrotce'} size={84} />
      </span>
      <span class="tile-name">{app.nazwa}</span>
      {!app.gotowa && <span class="tile-soon">Wkrótce…</span>}
    </>
  );
  return app.gotowa
    ? <a class="tile" href={`#${app.trasa}`} title={app.opis}>{inner}</a>
    : <div class="tile locked" aria-disabled="true" title="Ta aplikacja jeszcze się piecze">{inner}</div>;
}
