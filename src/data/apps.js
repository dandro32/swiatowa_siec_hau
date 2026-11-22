// Rejestr aplikacji — dodanie nowej to jeden wpis.
export const apps = [
  { id: 'psie-semes', nazwa: 'Psie Semes', kolor: '#ffb3d1', trasa: '/app/psie-semes', opis: 'Czaty i rozmowy z psimi kumplami', gotowa: true },
  { id: 'poogle', nazwa: 'Poogle', kolor: '#b8e4ff', trasa: '/app/poogle', opis: 'Wyszukiwarka ras psów', gotowa: true },
  { id: 'piestajm', nazwa: 'PiesTajm', kolor: '#d9c2ff', trasa: '/app/piestajm', opis: 'Gry dla psich graczy', gotowa: true },
  { id: 'mitch-halcz', nazwa: 'Mitch Hałcz', kolor: '#ffc4b8', trasa: '/app/mitch-halcz', opis: 'Psie filmiki', gotowa: true },
  { id: 'ear-in-the-dog', nazwa: 'Ear in the Dog', kolor: '#a8ece4', trasa: '/app/ear-in-the-dog', opis: 'Psia muzyka i radia', gotowa: true },
  ...['Psie Foto', 'Kość Mapa', 'Miska Pay', 'Szczeniak Szkoła', 'Budka Home', 'Łapa Sport', 'Hau Radar', 'Pies Pogoda']
    .map((nazwa, i) => ({ id: `wkrotce-${i}`, nazwa, kolor: '#ece6d8', trasa: '/', opis: 'Wkrótce', gotowa: false })),
];
