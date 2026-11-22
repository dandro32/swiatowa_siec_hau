export const playlists = [
  { id: 'obloki', nazwa: 'W obłokach', kolory: ['#bfe6ff', '#ffffff', '#ffd23f'] },
  { id: 'psi-swiat', nazwa: 'Psi świat', kolory: ['#ffb3d1', '#ffd23f', '#00b4a6'] },
  { id: 'ciekawosc', nazwa: 'Ciekawość', kolory: ['#d9c2ff', '#6bcb77', '#ff7bac'] },
];
export const artists = [{ id: 'maja', nazwa: 'Maja Shih Tzu', look: 'maja', opis: 'Słodkie piosenki z grzywką na bok' }];

const t = (id, tytul, playlist, album, sek) => ({ id, tytul, playlist, album, artysta: 'Maja Shih Tzu', sek });
export const tracks = [
  t('t1', 'Wydmy', 'obloki', 0, 154), t('t2', 'Kolec', 'psi-swiat', 1, 121), t('t3', 'Po piasku', 'obloki', 0, 187),
  t('t4', 'Burger', 'psi-swiat', 2, 133), t('t5', 'Jadę', 'ciekawosc', 3, 170), t('t6', 'Miska', 'psi-swiat', 1, 98),
  t('t7', 'W kwiecie', 'obloki', 2, 205), t('t8', 'Cleo', 'ciekawosc', 3, 142), t('t9', 'Osa', 'ciekawosc', 4, 115),
  t('t10', 'Życie', 'obloki', 4, 190), t('t11', 'Łapy', 'psi-swiat', 5, 126), t('t12', 'Różowa', 'ciekawosc', 5, 160),
];
export const albums = [
  { nazwa: 'Piaskownica', kolory: ['#ffd23f', '#ff7bac', '#00b4a6'] },
  { nazwa: 'Kolce i miski', kolory: ['#ff7bac', '#ffd23f', '#4aa3df'] },
  { nazwa: 'Kwiatowe łapy', kolory: ['#6bcb77', '#ffd23f', '#ff5d8f'] },
  { nazwa: 'Ciekawski szczeniak', kolory: ['#9b5de5', '#ffd23f', '#00b4a6'] },
  { nazwa: 'Osa i Życie', kolory: ['#ffb347', '#4aa3df', '#ffffff'] },
  { nazwa: 'Różowy świat', kolory: ['#ff9fb8', '#fff', '#9b5de5'] },
];
export const radia = [
  { id: 'r1', nazwa: 'Radio Szczek FM', opis: 'Same hity do merdania' },
  { id: 'r2', nazwa: 'Hau Hau Hity', opis: 'Najgłośniejsze przeboje' },
  { id: 'r3', nazwa: 'Spokojne Drzemki', opis: 'Muzyka do spania w budzie' },
  { id: 'r4', nazwa: 'Radio Ogonek', opis: 'Wesoło od rana do wieczora' },
];
