export function HeartButton({ active, count, onClick, label = 'Serduszko' }) {
  return (
    <button type="button" class={`btn heart ${active ? 'on' : ''}`} onClick={onClick} aria-pressed={!!active} aria-label={label}>
      <span class="heart-ico" aria-hidden="true">{active ? '❤️' : '🤍'}</span>
      {count !== undefined && <span class="heart-count">{count}</span>}
    </button>
  );
}
