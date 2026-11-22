import { useEffect } from 'preact/hooks';

export function Modal({ title, onClose, children }) {
  useEffect(() => {
    const fn = (e) => e.key === 'Escape' && onClose();
    addEventListener('keydown', fn);
    return () => removeEventListener('keydown', fn);
  }, []);
  return (
    <div class="modal-back" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div class="modal" role="dialog" aria-modal="true" aria-label={title}>
        <div class="modal-head"><h2>{title}</h2><button type="button" class="btn small" onClick={onClose} aria-label="Zamknij">✕</button></div>
        {children}
      </div>
    </div>
  );
}
