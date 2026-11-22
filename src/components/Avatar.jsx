import { DogCharacter, LOOKS } from './art/DogCharacter.jsx';

/** Okrągły awatar: zdjęcie lub komiksowa postać. */
export function Avatar({ src, look, size = 56, label = 'Awatar', ring }) {
  const style = { width: size + 'px', height: size + 'px', ...(ring ? { borderColor: ring } : {}) };
  return (
    <span class="avatar" style={style}>
      {src ? <img src={src} alt={label} /> : (
        <span class="avatar-art"><DogCharacter {...(typeof look === 'string' ? LOOKS[look] : look) || LOOKS.reksio} size={size * 0.95} title={label} /></span>
      )}
    </span>
  );
}
