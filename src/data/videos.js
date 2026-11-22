export const kategorie = ['Polecane', 'Śmieszne', 'Sztuczki', 'Moje filmiki'];

export const channels = {
  alfie: { nazwa: 'Alfie 2H', look: 'spike' },
  hortensja: { nazwa: 'Hortensja', look: 'ellie' },
  lusia: { nazwa: 'Lusia Stardance', look: 'lilka' },
  robio: { nazwa: 'Mega Robio', look: 'green' },
  ptaszyny: { nazwa: 'Ptaszyny', look: 'ari' },
  moda: { nazwa: 'Moda', look: 'roxi' },
  gatki: { nazwa: 'Krótkie Gatki', look: 'kk' },
  origami: { nazwa: 'Dziwne Origami', look: 'remsiusiek' },
  mole: { nazwa: 'Mole Książkowe', look: 'muszeli' },
  draw: { nazwa: 'Draw…', look: 'corali' },
};

export const videos = [
  { id: 'v1', tytul: 'Alfie i największa kość świata', kanal: 'alfie', scena: 'bone', look: 'spike', kat: ['Polecane', 'Śmieszne'], wyswietlenia: 1240, serca: 98, opis: 'Alfie znajduje gigantyczną kość w ogródku. Czy uda mu się ją wykopać?' },
  { id: 'v2', tytul: 'Hortensja pielęgnuje ogródek', kanal: 'hortensja', scena: 'garden', look: 'ellie', kat: ['Polecane'], wyswietlenia: 640, serca: 51, opis: 'Hortensja pokazuje, jak podlewać kwiatki (i nie wykopać ich przy okazji).' },
  { id: 'v3', tytul: 'Lusia tańczy pod gwiazdami', kanal: 'lusia', scena: 'dance', look: 'lilka', kat: ['Polecane', 'Sztuczki'], wyswietlenia: 2310, serca: 187, opis: 'Taneczny pokaz Lusi: piruet, obrót i wielkie merdanie!' },
  { id: 'v4', tytul: 'Mega Robio: jak zbudować domek', kanal: 'robio', scena: 'mine', look: 'green', kat: ['Polecane', 'Sztuczki'], wyswietlenia: 3020, serca: 240, opis: 'Szybki poradnik budowania w grze Mega Robio.' },
  { id: 'v5', tytul: 'Ptaszyny kontra pies', kanal: 'ptaszyny', scena: 'birds', look: 'ari', sky: '#ffe9b0', kat: ['Śmieszne'], wyswietlenia: 880, serca: 73, opis: 'Kto pierwszy dopadnie ziarenka? Zobacz sam!' },
  { id: 'v6', tytul: 'Moda na jesień: kokardki i szaliki', kanal: 'moda', scena: 'fashion', look: 'roxi', kat: ['Polecane'], wyswietlenia: 1510, serca: 120, opis: 'Co nosi modny pies tej jesieni?' },
  { id: 'v7', tytul: 'Krótkie Gatki: pies w kapciach', kanal: 'gatki', scena: 'tricks', look: 'kk', kat: ['Śmieszne'], wyswietlenia: 970, serca: 80, opis: 'Krótka scenka o psie, który zgubił kapcie.' },
  { id: 'v8', tytul: 'Dziwne Origami: papierowa kość', kanal: 'origami', scena: 'origami', look: 'remsiusiek', kat: ['Sztuczki'], wyswietlenia: 760, serca: 64, opis: 'Złóż kość z papieru w pięć minut. Łapy się przydadzą!' },
  { id: 'v9', tytul: 'Mole Książkowe: bajka na dobranoc', kanal: 'mole', scena: 'book', look: 'muszeli', sky: '#e0d3ff', kat: ['Polecane'], wyswietlenia: 530, serca: 59, opis: 'Czytamy bajkę o szczeniaku, który bał się ciemności.' },
  { id: 'v10', tytul: 'Draw…: jak narysować pieska', kanal: 'draw', scena: 'draw', look: 'corali', kat: ['Sztuczki'], wyswietlenia: 1180, serca: 142, opis: 'Krok po kroku rysujemy pieska z długimi uszami.' },
];
export const defaultComments = {
  v1: [{ autor: 'Corali', tekst: 'Ale wielka kość! Hau!', data: '2026-11-20' }],
  v3: [{ autor: 'Ellie', tekst: 'Piękny taniec, Lusiu!', data: '2026-11-21' }],
};
