// config.js

// Parametry gry - pełna kontrola!
const CONFIG = {
	canvasWidth: 300,
	canvasHeight: 600,
	blockSize: 30, // wielkość pojedynczego klocka
	speed: {
		beginner: 1000, // milisekundy
		intermediate: 700,
		advanced: 400,
	},
	figuresCount: {
		beginner: 5,
		intermediate: 6,
		advanced: 7,
	},
	uiPositions: {
		score: { x: 10, y: 10 },
		level: { x: 10, y: 40 },
		pause: { x: 120, y: 300 },
		gameOver: { x: 100, y: 300 },
		menu: { x: 100, y: 200 },
	},
	pointsPerLevel: 10,
	speedIncreaseThreshold: 100, // co ile punktów zwiększamy prędkość
	moveSound: 'assets/sounds/move.wav',
	rotateSound: 'assets/sounds/rotate.wav',
	dropSound: 'assets/sounds/drop.wav',
}
