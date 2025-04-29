Tetris Game 🎮
Profesjonalna implementacja klasycznej gry Tetris stworzona w czystym JavaScript, HTML5 i CSS3.
Projekt stworzony z myślą o rozszerzalności, wydajności i nowoczesnej strukturze kodu.
Funkcjonalności 🚀
• Logowanie użytkownika — każdy gracz może korzystać ze swoich własnych ustawień.
• Poziomy trudności:

- Początkujący: 5 figur
- Średniozaawansowany: 6 figur
- Zaawansowany: 7 figur
  • Pauza i Restart — za pomocą klawiszy P i R.
  • Cień spadającej figury — lepsza widoczność ruchu.
  • Dźwięki akcji — osobne efekty dźwiękowe dla ruchu, obrotu i opadania.
  • Liczenie punktów i poziomów — +10 punktów za każdy ukończony poziom, przyspieszanie gry co 100 punktów.
  • Konfigurowalność — łatwa zmiana szybkości gry, rozmiaru planszy, liczby figur i lokalizacji elementów UI.
  Struktura katalogów 📁

/tetris-game/
├── index.html
├── /assets/
│ ├── /sounds/
│ └── /images/
├── /css/
│ └── style.css
├── /js/
│ ├── config.js
│ ├── figures.js
│ ├── game.js
│ ├── menu.js
│ ├── user.js
│ └── main.js
├── /data/
│ └── users.json (opcjonalnie)
└── README.md

Wymagania techniczne ⚙️
Przeglądarka wspierająca HTML5 i ES6+
Brak dodatkowych bibliotek — czysty JavaScript!
Jak uruchomić? 🏁

1. Klonuj repozytorium:
   git clone https://github.com/twoj-nick/tetris-game.git
2. Przejdź do katalogu projektu:
   cd tetris-game
3. Uruchom index.html w przeglądarce.
   (Możesz kliknąć dwukrotnie lub użyć serwera lokalnego jak Live Server w VS Code.)
   Planowane rozszerzenia 🛠️
   • Zapisywanie wyników i ustawień użytkownika w LocalStorage
   • Tryb multiplayer online
   • System osiągnięć i odznak
   • Skórki graficzne dla figur i planszy
   Licencja 📄
   Projekt dostępny na licencji MIT — używaj, kopiuj, modyfikuj do woli, ale podziel się dobrem! 🚀
   Autor ✍️
   Stworzono z pasją i kawą ☕ — przez [‘.I.’].
