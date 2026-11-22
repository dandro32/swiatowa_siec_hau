# Światowa Sieć Hau (PsiuWuWu) — plan implementacji

> Etap 1: **design + klikalne mockupy**. Bez backendu, bez prawdziwych połączeń i uploadu na serwer.
> Wynik: `index.html` + `bundle.js` (+ `styles.css`, `assets/`), serwowane lokalnie na `http://localhost`.

---

## 1. Założenia

- **Grupa docelowa:** dzieci. Interfejs w języku polskim, duże przyciski, proste słowa, kolorowo i zabawnie.
- **Mobile-first**, RWD wspiera też tablet i desktop.
- **Bezpieczeństwo dzieci:** brak prawdziwych danych osobowych, brak trackingu i reklam. Wszystko zostaje w przeglądarce (`localStorage`). Logowanie bez hasła, tylko na niby. Nie zbieramy e-maila ani innych danych kontaktowych.
- **Portal-agregator:** strona główna to lista kafelków z „psimi aplikacjami”. Każda aplikacja to osobny widok w ramach jednej strony (SPA).
- Na razie wszystkie aplikacje to mockupy. Jedynym wyjątkiem jest **Poogle**, które pobiera prawdziwe dane o rasach z publicznego API.

## 2. Technologia

| Obszar | Wybór | Uzasadnienie |
|---|---|---|
| Środowisko | Node.js (LTS) + npm | zgodnie z założeniem |
| Bundler | **esbuild** | jeden plik `bundle.js`, bardzo szybki, prawie bez konfiguracji |
| UI | **Preact + JSX** | komponenty i lekki bundle (~10 KB) |
| Routing | hash router (`#/app/poogle`) | działa na każdym statycznym serwerze, bez konfiguracji |
| Style | czysty CSS + zmienne CSS, mobile-first | bez dodatkowych zależności |
| Stan | prosty store + `localStorage` | profil psa, ulubione, serduszka, komentarze |
| Serwer dev | `esbuild --serve` lub mały `server.js` (node:http) | `npm start` → `http://localhost:8080` |

### Skrypty npm
- `npm run dev`: esbuild w trybie watch + serwer na localhost
- `npm run build`: buduje `dist/index.html` + `dist/bundle.js` (zminifikowany)
- `npm start`: serwuje katalog `dist/`

## 3. Struktura katalogów

```
swiatowa_siec_hau/
├── wzory/                    # szkice córki (wzory designu)
├── public/
│   ├── index.html
│   ├── styles.css
│   └── assets/
│       ├── logo.svg
│       ├── breeds/           # lokalne zdjęcia domyślne (m.in. cavalier.jpg)
│       ├── avatars/          # ilustrowane awatary kontaktów / kanałów
│       ├── thumbs/           # miniatury filmików (mock)
│       └── covers/           # okładki albumów (mock)
├── src/
│   ├── main.jsx              # start aplikacji, router
│   ├── router.js
│   ├── store.js              # stan + localStorage
│   ├── data/
│   │   ├── apps.js           # rejestr aplikacji (kafelki)
│   │   ├── breeds.pl.json    # lista ras: nazwa PL, slug Dog API, tytuł Wikipedii
│   │   ├── contacts.js       # Psie Semes
│   │   ├── games.js          # PiesTajm
│   │   ├── videos.js         # Mitch Hałcz
│   │   └── music.js          # Ear in the Dog
│   ├── components/           # Header, Footer, AppTile, Pagination, BreedSearch,
│   │                         # Avatar, Modal, Button, HeartButton, ...
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Onboarding.jsx    # tworzenie awatara
│   │   └── Profile.jsx
│   └── apps/
│       ├── psie-semes/
│       ├── poogle/
│       ├── piestajm/
│       ├── mitch-halcz/
│       └── ear-in-the-dog/
├── package.json
└── swiatowa_siec_hau.md
```

## 4. Design system

- **Paleta:** ciepła i przyjazna, np. karmelowy brąz (sierść), kremowy (tło), błękit nieba, róż nosa, zielony trawy. Każda aplikacja ma swój kolor akcentu.
- **Typografia:** zaokrąglony, czytelny font z polskimi znakami, np. *Baloo 2* lub *Nunito*. Nagłówki duże, tekst min. 16 px.
- **Kształty:** mocno zaokrąglone rogi, okrągłe awatary (jak w szkicach), „ręcznie rysowane” obramowania jako nawiązanie do wzorów.
- **Ikony:** łapka, kość, miska, budka. Proste SVG inline.
- **Dotyk:** cele dotyku min. 44×44 px, przyciski z wyraźnym stanem „wciśnięty”.
- **Breakpointy:** `< 600 px` telefon (bazowy), `600–1024 px` tablet, `> 1024 px` desktop.
- **Dostępność:** kontrast WCAG AA, `alt` przy obrazkach, obsługa klawiatury, `prefers-reduced-motion`.

### 4.1 Styl grafik: komiks na wzór rysunków córki

Wszystkie ilustracje rysujemy sami jako **SVG** (wektor: ostry na każdym ekranie, mały rozmiar, łatwy do kolorowania przez CSS). Wzorem są postacie ze szkiców w `wzory/`.

**Cechy stylu:**
- **Postacie psów jak u córki:** psy stojące na dwóch łapach, w ubrankach, z długimi opadającymi uszami (jak u Cavaliera/Shih Tzu), dużymi błyszczącymi oczami, małym noskiem i uśmiechem w kształcie „ω”. Grzywki i fryzury jak na rysunkach (np. Maja Shih Tzu, piesek z Psiocaboca).
- **Komiksowa kreska:** grube, lekko nierówne czarne kontury (3–4 px, `stroke-linecap: round`), żeby wyglądały jak rysowane ołówkiem/flamastrem.
- **Płaskie kolory + proste cienie:** 2–3 odcienie na element, bez gradientów. Akcent: rumieńce na policzkach, błysk w oku.
- **Efekty komiksowe:** dymki z tekstem („Hau!”, „Wrrr…”), wykrzykniki, gwiazdki, linie ruchu przy merdającym ogonie, tło z kropkami (halftone) w nagłówkach aplikacji.
- **Ramki jak w zeszycie:** kafelki i panele z ręcznie rysowanym obramowaniem i lekko krzywymi rogami, jak kadry na szkicach.

**Biblioteka postaci i grafik (`public/assets/` + komponenty SVG w `src/components/art/`):**
- **Generator psa-postaci** (`DogCharacter`): jedna baza SVG z parametrami: kolor sierści, kształt uszu (długie / stojące / kręcone), fryzura, ubranko, akcesorium (kokardka, okulary, czapka). Z niego powstają awatary kontaktów w Psie Semes, kanały w Mitch Hałcz, artyści w Ear in the Dog i postać gracza w PiesTajm. Spójny styl przy małej liczbie plików.
- **Ikony aplikacji** (kafelki): Psie Semes (telefon z uszami), Poogle (lupa z psim noskiem), PiesTajm (pad z łapką), Mitch Hałcz (ekran ▶ z ogonem), Ear in the Dog (słuchawki na psich uszach), „Wkrótce” (kość z kłódką).
- **Logo** Światowa Sieć Hau / PsiuWuWu: kula ziemska z psimi uszami i nosem.
- **Sceny:** miniatury filmów (np. Alfie z kością, Lusia tańcząca, Dziwne Origami), okładki albumów, ekrany gier (Mega Robio, Owocki, Psiocaboca), pies w stopce, ekran „Nie znaleziono” w Poogle.
- **Awatary w kreatorze:** jeśli użytkownik nie wgra zdjęcia, oprócz zdjęcia rasy może wybrać komiksową postać psa z generatora (opcjonalne rozszerzenie).

**Proces:** najpierw 2–3 próbne postacie do akceptacji (najlepiej przez córkę 🙂), potem reszta biblioteki w tym samym stylu.

## 5. Szkielet portalu

### 5.1 Nagłówek
- Logo: psia głowa / łapka + napis **Światowa Sieć Hau**, pod spodem mniejszy dopisek **PsiuWuWu** (gra słów z WWW).
- Po prawej **ikonka logowania** (łapka w kółku). Po zalogowaniu zamienia się w miniaturę awatara psa z imieniem i prowadzi do profilu.
- Na telefonie nagłówek przyklejony (`sticky`) i kompaktowy. Logo „merda ogonem” po kliknięciu (krótka animacja).
- W aplikacji: przycisk „← Do budy” (powrót do listy aplikacji) oraz nazwa aplikacji.

### 5.2 Stopka (śmieszna)
- Rysunek psa, który wystaje zza krawędzi stopki i merda ogonem (animacja CSS).
- Teksty, np.:
  - „© 2026 Światowa Sieć Hau. Żaden kot nie ucierpiał przy tworzeniu tej strony.”
  - Linki-żarty: „Regulamin Merdania”, „Polityka Kości”, „Kontakt: zaszczekaj głośno”
  - „Działa na karmie i dobrym humorze 🦴”
- Losowy „psi fakt dnia” przy każdym odświeżeniu.

### 5.3 Strona główna: lista aplikacji
- Siatka kafelków: ikona aplikacji (duży zaokrąglony kwadrat) i **nazwa pod spodem**.
  - Telefon: 2 kolumny, tablet: 3–4, desktop: 4–6.
- **Stronicowanie:** przyciski „← Poprzednia / 1 2 3 / Następna →” w kształcie kostek. Rozmiar strony jest konfigurowalny (np. 6 na telefonie, 12 na desktopie). Numer strony trzymamy w URL (`#/?strona=2`).
- Rejestr aplikacji w `src/data/apps.js`: `{ id, nazwa, ikona, kolor, trasa, opis, gotowa }`. Dodanie nowej aplikacji to jeden wpis.
- Kafelki „Wkrótce…” (wyszarzone, z kłódką-kością) pokazują, że będzie więcej i od razu demonstrują stronicowanie.
- Opcjonalnie nad siatką: powitanie „Hau, {imię}!” z awatarem.

## 6. Logowanie i tworzenie awatara

### 6.1 Logowanie (mock)
- Ekran z ikonki w nawigacji: pole „Psie imię / login”, przycisk **„Wejdź do budy”**. **Bez hasła:** wystarczy wpisać imię.
- Bez prawdziwej autoryzacji: „zalogowanie” = utworzenie/wczytanie profilu z `localStorage`.
- Nowy użytkownik trafia do kreatora awatara.

### 6.2 Kreator awatara (3 kroki z paskiem postępu z łapek)
1. **Imię:** pole tekstowe (walidacja: 2–20 znaków, bez znaków specjalnych).
2. **Rasa:** komponent `BreedSearch`, czyli wyszukiwarka z autouzupełnianiem:
   - lista ras w `breeds.pl.json` (polskie nazwy, np. „Cavalier King Charles spaniel”, „Border collie”, „Jamnik”, „Owczarek niemiecki”, „Shih tzu”, „Pudel”, „Mieszaniec”…)
   - wyszukiwanie bez polskich znaków i wielkości liter („jamn” → Jamnik)
   - podpowiedzi z miniaturą zdjęcia rasy
   - opcja „Kundelek / mieszaniec”
3. **Zdjęcie:**
   - **„Wgraj swoje zdjęcie jako pies”:** `<input type="file" accept="image/*" capture>` (na telefonie także aparat). Zdjęcie jest przycinane do kwadratu i zmniejszane w `<canvas>` do ~256 px, potem zapisywane jako dataURL w `localStorage`. Nic nie wychodzi z urządzenia.
   - **„Użyj zdjęcia rasy”:** zdjęcie wybranej rasy (lokalne z `assets/breeds/` lub z Dog CEO API).
   - Domyślnie, jeśli nic nie wybrano: **Cavalier King Charles spaniel** (lokalny plik, działa offline).
- Podsumowanie: karta „Psiej legitymacji” z imieniem, rasą i zdjęciem, przycisk **„Gotowe, hau!”**.

### 6.3 Profil
- Podgląd i edycja imienia, rasy i zdjęcia. Przycisk „Wyloguj (idę spać do budy)”.

### Model danych (localStorage)
```js
psiuwuwu.profil = {
  imie: "Reksio",
  rasa: { id: "cavalier", nazwa: "Cavalier King Charles spaniel" },
  zdjecie: "data:image/jpeg;base64,..." | "assets/breeds/cavalier.jpg",
  utworzono: "2026-11-22"
}
psiuwuwu.piestajm = { imie: "Super Reks", rasaId: "border-collie" }  // nadpisanie w grach
psiuwuwu.serduszka = { filmy: [...], utwory: [...] }
psiuwuwu.ulubione  = { utwory: [...], radia: [...] }
psiuwuwu.komentarze = { [filmId]: [{ autor, tekst, data }] }
```

## 7. Aplikacje

### 7.1 Psie Semes 📞 (wzór: `wzory/psiesms.jpeg`)
**Szkic:** nagłówek „Psie Semes”, po lewej siatka kontaktów w 2 kolumnach z okrągłymi awatarami (Corali, Ellie, Spike, Ari, Green, Roxi, Muszeli, K.K., Remsiusiek). Po prawej panel z 3 zakładkami-ikonami: **telefon, wiadomości, kamera** i lista ostatnich rozmów (Nook, Lilka, Minka, Luke).

**Mockup:**
- Telefon: lista kontaktów (2 kolumny), pod nią pasek zakładek 📞 💬 🎥. Desktop: układ dwukolumnowy jak na szkicu.
- **Zakładka Wiadomości:** widok czatu z „dymkami”, gotowe naklejki (🦴 Hau! / Spacer? / Daj łapę). Wpisana wiadomość pojawia się lokalnie, a kontakt „odszczekuje” automatyczną odpowiedzią po chwili.
- **Zakładka Telefon:** ekran „Dzwonię do Ellie… 🐾” z animacją pulsującego awatara i czerwonym przyciskiem „Rozłącz”.
- **Zakładka Kamera:** ekran wideo-rozmowy na niby (ilustracja psa + własny awatar w rogu).
- Brak prawdziwej komunikacji, tylko dane z `contacts.js`.

### 7.2 Poogle 🔍 (wzór: `wzory/poodle.jpeg`)
**Szkic:** logo, ikona lupy + duże pole wyszukiwania, pod spodem **alfabet w kółkach** (A B C D … T).

**Funkcjonalność (prawdziwa):**
- Wpisujesz nazwę rasy, np. „border collie”, i dostajesz kartę wyników: **zdjęcie, nazwę, opis po polsku**, kilka cech (wielkość, charakter).
- Klik w literę alfabetu pokazuje listę ras na tę literę (polski alfabet: A, B, C, Ć… pomijamy litery bez ras).
- **Źródła danych (bez klucza API):**
  - **Dog CEO API** (`https://dog.ceo/api/breed/{slug}/images/random`): zdjęcia ras
  - **Wikipedia PL REST API** (`https://pl.wikipedia.org/api/rest_v1/page/summary/{tytuł}`): krótki opis po polsku + miniatura
  - lokalny `breeds.pl.json` łączy polską nazwę z `slug` Dog CEO i tytułem artykułu Wikipedii
  - opcjonalnie później: **TheDogAPI** (temperament, wzrost, waga; wymaga darmowego klucza)
- Fallback offline: krótki lokalny opis i zdjęcie z `assets/breeds/`, gdy API nie odpowiada.
- Ekran „Nie znaleziono” z zabawną grafiką („Hmm, węszę… nic nie wyczułem”).
- Ten sam `breeds.pl.json` zasila wyszukiwarkę ras w kreatorze awatara.

### 7.3 PiesTajm 🎮 (wzór: `wzory/piestajm.jpeg`)
**Szkic:** ekran „PiesTajm” z panelem **„Dane psiużytkownika”** (boczne menu z kółkami, pola Imię i E-mail; **pole E-mail pomijamy**, bo to serwis dla dzieci) i trzy gry: **Mega Robio** (serduszka-życia, liczniki surowców 85/99/400, domek, piesek z kilofem), **Owocki** (piesek łapie spadające owoce, liczniki owoców), **Psiocaboca** (piesek, domek z pokojami: urządzanie i przebieranie).

**Mockup:**
- **Panel gracza (bez e-maila):** domyślnie imię i rasa z profilu. Można je **nadpisać tylko na potrzeby gier** (imię gracza + rasa przez `BreedSearch`), z przyciskiem „Przywróć z profilu”.
- **Wybór gier:** kafelki z ilustracją, tytułem i przyciskiem „Graj”.
- Po kliknięciu: **statyczny ekran gry (mock)** według szkicu, np.:
  - Mega Robio: pasek serduszek, kolumna surowców z licznikami, postać psa (awatar gracza)
  - Owocki: pasek wyników z owocami, piesek z koszykiem na górze, owoce na planszy
  - Psiocaboca: piesek obok przekroju domku z pokojami
  - plakietka „Gra wkrótce! 🚧”
- Gry na razie niegrywalne, tylko makiety ekranów.

### 7.4 Mitch Hałcz ▶️ (wzór: `wzory/mitchhałcz.jpeg`)
**Szkic:** siatka kart filmów z miniaturą, tytułem i okrągłą ikoną kanału, np. „Alfie 2H”, „Hortensja”, „Lusia Stardance”, „Mega Robio”, „Ptaszyny”, „Moda”, „Krótkie Gatki”, „Dziwne Origami”, „Mole Książkowe”, „Draw…”.

**Mockup:**
- **Strona główna:** siatka kart (telefon 1 kolumna, tablet 2, desktop 3–4): miniatura, tytuł, kanał z awatarem, liczba wyświetleń i serduszek.
- **Odtwarzacz:** miejsce na wideo (placeholder z przyciskiem ▶ i animowaną miniaturą), tytuł, kanał, **serduszko z licznikiem** (zapamiętywane), opis.
- **Komentarze:** lista + formularz „Napisz komentarz”. Komentarz dodaje się lokalnie z awatarem użytkownika. Prosty filtr brzydkich słów i limit długości.
- **„Dodaj swój filmik”:** formularz (tytuł, opis, wybór pliku, miniatura). Po „wysłaniu” filmik pojawia się na liście jako mock (plik nie jest nigdzie wysyłany).
- Kategorie/zakładki: Polecane, Śmieszne, Sztuczki, Moje filmiki.

### 7.5 Ear in the Dog 🎧 (wzór: `wzory/earinthedog.jpeg`)
**Szkic:** lewa kolumna: playlisty („W obłokach”, „Psi świat”, „Ciekawość”), artystka **„Maja Shih Tzu”** z dużą okładką. Środek: siatka utworów z ikoną ▶ (Wydmy, Kolec, Po piasku, Burger, Jadę, Miska, W kwiecie, Cleo, Osa, Życie, Łapy, Różowa…) i okładki albumów. Dół: **odtwarzacz** z ikoną radia, ✓, ✕ i suwakiem.

**Mockup:**
- **Biblioteka:** playlisty, artyści, albumy, utwory (dane z `music.js`).
- **Serduszka** przy utworach, sekcja **Ulubione**.
- **Radia:** lista stacji (np. „Radio Szczek FM”, „Hau Hau Hity”, „Spokojne Drzemki”). Można je oznaczać jako ulubione.
- **Mini-odtwarzacz** przyklejony na dole ekranu: okładka, tytuł, ▶/⏸, ⏭, ✓ (dodaj do ulubionych), ✕ (zamknij), suwak postępu (symulowany timerem) i głośności.
- Opcjonalnie: krótkie, darmowe dźwięki (np. szczeknięcie przy play) przez `<audio>`. Prawdziwej muzyki nie ma.

## 8. Kolejność prac (etapy)

1. **Setup projektu:** `package.json`, esbuild, Preact, skrypty `dev/build/start`, `index.html`, pusty `bundle.js`, serwer na localhost.
2. **Design system + grafiki komiksowe:** zmienne CSS, typografia, przyciski, karty; biblioteka SVG (psy-postacie, awatary kontaktów, ikony aplikacji, miniatury filmów, okładki, logo) według sekcji 4.1.
3. **Szkielet portalu:** router, Header, Footer, strona główna z kafelkami + stronicowanie.
4. **Logowanie + kreator awatara:** store/localStorage, `breeds.pl.json`, `BreedSearch`, upload i zmniejszanie zdjęcia, domyślny Cavalier, profil.
5. **Poogle:** integracja Dog CEO + Wikipedia PL, alfabet, karty wyników, fallback.
6. **Psie Semes:** kontakty, zakładki, czat/dzwonienie/kamera (mock).
7. **PiesTajm:** panel gracza z nadpisaniem imienia i rasy, kafelki gier, ekrany-makiety.
8. **Mitch Hałcz:** siatka filmów, odtwarzacz, serduszka, komentarze, formularz dodawania.
9. **Ear in the Dog:** biblioteka, radia, ulubione, mini-odtwarzacz.
10. **Szlif:** RWD na telefonie, tablecie i desktopie, dostępność, animacje, zabawne teksty, test z córką 🙂.

## 9. Kryteria akceptacji etapu mockupów

- `npm run build && npm start` serwuje `index.html` + `bundle.js` na `http://localhost:8080`.
- Wszystkie widoki są poprawne na szerokości 360 px i na desktopie 1440 px.
- Da się przejść pełną ścieżkę: logowanie → awatar (imię, rasa z wyszukiwarki, zdjęcie lub domyślny Cavalier) → lista aplikacji → każda z 5 aplikacji → powrót.
- Poogle zwraca prawdziwe zdjęcie i polski opis dla np. „Border collie”.
- Profil, serduszka, ulubione i komentarze przetrwają odświeżenie strony.

## 10. Na później (poza zakresem etapu 1)

- Backend (Node.js + baza), prawdziwe konta z kontrolą rodzicielską.
- Prawdziwe czaty/połączenia (WebRTC) z moderacją.
- Grywalne gry (canvas).
- Upload i moderacja filmików, prawdziwy streaming muzyki z licencją.
- PWA (ikona na ekranie telefonu, tryb offline).

## 11. Decyzje (2026-11-22)

1. **Logowanie:** na razie bez hasła, wystarczy imię.
2. **Nazwa wyszukiwarki:** **Poogle**, tak jak na szkicu córki.
3. **E-mail:** pomijamy wszędzie, także w panelu gracza PiesTajm.
4. **Kafelki „Wkrótce”:** tak, kilka zaślepek, żeby stronicowanie było widoczne od początku.
5. **Framework:** Preact.
6. **Grafiki:** własne ilustracje SVG w stylu komiksowym, na wzór rysunków córki (sekcja 4.1).
