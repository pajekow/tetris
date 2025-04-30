// config.js

// Parametry gry - pełna kontrola nad zachowaniem Tetrisa!
const CONFIG = {
	canvasWidth: 300, // Szerokość planszy gry (w pikselach)
	canvasHeight: 600, // Wysokość planszy gry (w pikselach)
	blockSize: 30, // Rozmiar pojedynczego klocka (w pikselach)

	// Prędkość opadania klocków w zależności od poziomu trudności
	speed: {
		beginner: 1000, // Początkujący - klocek spada co 1000 ms
		intermediate: 700, // Średniozaawansowany - spada co 700 ms
		advanced: 400, // Zaawansowany - spada co 400 ms
	},

	// Ilość dostępnych typów figur dla danego poziomu trudności
	figuresCount: {
		beginner: 5, // Początkujący: 5 typów figur
		intermediate: 6, // Średniozaawansowany: 6 typów
		advanced: 7, // Zaawansowany: 7 typów (pełny zestaw)
	},

	// Współrzędne elementów interfejsu (HUD) na ekranie
	uiPositions: {
		score: { x: 10, y: 10 }, // Pozycja wyświetlania punktów
		level: { x: 10, y: 40 }, // Pozycja wyświetlania poziomu
		pause: { x: 120, y: 300 }, // Pozycja napisu "PAUZA"
		gameOver: { x: 100, y: 300 }, // Pozycja napisu "KONIEC GRY"
		menu: { x: 100, y: 200 }, // Pozycja menu startowego
	},

	pointsPerLevel: 10, // Liczba punktów za oczyszczenie jednej linii

	speedIncreaseThreshold: 100, // Co ile punktów gra przyspiesza (np. co 100 punktów)

	// Ścieżki do plików dźwiękowych
	moveSound: 'assets/sounds/move.wav', // Dźwięk przesunięcia klocka
	rotateSound: 'assets/sounds/rotate.wav', // Dźwięk obrotu klocka
	dropSound: 'assets/sounds/drop.wav', // Dźwięk osadzenia klocka
}
