/** Stronicowanie w kształcie kostek. */
export function Pagination({ page, pages, hrefFor }) {
  if (pages <= 1) return null;
  return (
    <nav class="pagination" aria-label="Strony">
      {page > 1 ? <a class="dice" href={hrefFor(page - 1)}>← Poprzednia</a> : <span class="dice disabled">← Poprzednia</span>}
      {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
        <a key={n} class={`dice ${n === page ? 'current' : ''}`} href={hrefFor(n)} aria-current={n === page ? 'page' : undefined}>{n}</a>
      ))}
      {page < pages ? <a class="dice" href={hrefFor(page + 1)}>Następna →</a> : <span class="dice disabled">Następna →</span>}
    </nav>
  );
}
