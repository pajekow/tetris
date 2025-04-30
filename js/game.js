// game.js

// == STAŁE DEFINICJE ==
// Przypisanie kolorów do typów klocków
const FIGURE_COLORS = {
	I: 'cyan',
	O: 'yellow',
	T: 'purple',
	S: 'green',
	Z: 'red',
	J: 'blue',
	L: 'orange',
}

// == ZMIENNE GLOBALNE ==
let canvas, ctx
let currentFigure, nextFigure
let grid
let score = 0
let level = 1
let dropInterval
let isPaused = false
let moveAudio, rotateAudio, dropAudio

// == FUNKCJE INICJALIZUJĄCE ==

// Inicjalizuje grę: przygotowuje canvas, siatkę, dźwięki i startuje pierwszy klocek
function initGame() {
	canvas = document.getElementById('tetris')
	ctx = canvas.getContext('2d')
	grid = createEmptyGrid()
	loadSounds()
	spawnFigure()
	updateUI()
	document.addEventListener('keydown', handleKeyPress)
	dropInterval = setInterval(update, CONFIG.speed[currentDifficulty])
}

// Ładuje dźwięki do gry
function loadSounds() {
	moveAudio = new Audio(CONFIG.moveSound)
	rotateAudio = new Audio(CONFIG.rotateSound)
	dropAudio = new Audio(CONFIG.dropSound)
}

// Tworzy pustą planszę (siatkę)
function createEmptyGrid() {
	const rows = CONFIG.canvasHeight / CONFIG.blockSize
	const cols = CONFIG.canvasWidth / CONFIG.blockSize
	return Array.from({ length: rows }, () => Array(cols).fill(0))
}

// == OBSŁUGA FIGUR ==

// Tworzy nową figurę na planszy
function spawnFigure() {
	const figuresList = FIGURES[currentDifficulty]
	const randomFigure = figuresList[Math.floor(Math.random() * figuresList.length)]
	currentFigure = {
		shape: JSON.parse(JSON.stringify(randomFigure.shape)),
		x: Math.floor(canvas.width / CONFIG.blockSize / 2) - 1,
		y: 0,
		color: FIGURE_COLORS[randomFigure.type],
	}
	// Jeśli od razu kolizja - koniec gry
	if (checkGameOver()) {
		showGameOverScreen()
		clearInterval(dropInterval)
	}
}

// Sprawdza, czy nowo utworzona figura koliduje z planszą
function checkGameOver() {
	const shape = currentFigure.shape
	for (let y = 0; y < shape.length; ++y) {
		for (let x = 0; x < shape[y].length; ++x) {
			if (shape[y][x]) {
				const newX = currentFigure.x + x
				const newY = currentFigure.y + y
				if (newY >= 0 && grid[newY] && grid[newY][newX]) {
					return true
				}
			}
		}
	}
	return false
}

// == AKTUALIZACJA GRY ==

// Funkcja opadania figur w czasie
function update() {
	if (isPaused) return
	moveFigure(0, 1)
}

// Przesuwa figurę o podane dx, dy
function moveFigure(dx, dy) {
	if (!collision(dx, dy)) {
		currentFigure.x += dx
		currentFigure.y += dy
	} else if (dy === 1) {
		mergeFigure()
		clearLines()
		spawnFigure()
	}
	draw()
	moveAudio.play()
}

// Obsługuje klawisze sterowania
function handleKeyPress(e) {
	switch (e.key) {
		case 'ArrowLeft':
			moveFigure(-1, 0)
			break
		case 'ArrowRight':
			moveFigure(1, 0)
			break
		case 'ArrowDown':
			moveFigure(0, 1)
			break
		case 'ArrowUp':
			rotateFigure()
			break
		case 'p':
		case 'P':
			togglePause()
			break
		case 'r':
		case 'R':
			restartGame()
			break
	}
}

// Obraca figurę o 90 stopni
function rotateFigure() {
	const rotated = currentFigure.shape[0].map((_, i) => currentFigure.shape.map((row) => row[i]).reverse())
	const oldShape = currentFigure.shape
	currentFigure.shape = rotated
	if (collision(0, 0)) {
		currentFigure.shape = oldShape
	}
	rotateAudio.play()
}

// Sprawdza, czy przesunięcie figury powoduje kolizję
function collision(dx, dy) {
	const shape = currentFigure.shape
	for (let y = 0; y < shape.length; ++y) {
		for (let x = 0; x < shape[y].length; ++x) {
			if (shape[y][x]) {
				const newX = currentFigure.x + x + dx
				const newY = currentFigure.y + y + dy
				if (
					newX < 0 ||
					newX >= canvas.width / CONFIG.blockSize ||
					newY >= canvas.height / CONFIG.blockSize ||
					(newY >= 0 && grid[newY][newX])
				) {
					return true
				}
			}
		}
	}
	return false
}

// Łączy figurę z planszą (trwałe osadzenie)
function mergeFigure() {
	const shape = currentFigure.shape
	for (let y = 0; y < shape.length; ++y) {
		for (let x = 0; x < shape[y].length; ++x) {
			if (shape[y][x]) {
				grid[currentFigure.y + y][currentFigure.x + x] = currentFigure.color
			}
		}
	}
	dropAudio.play()
}

// Sprawdza i usuwa pełne linie
function clearLines() {
	let linesCleared = 0
	outer: for (let y = grid.length - 1; y >= 0; --y) {
		for (let x = 0; x < grid[y].length; ++x) {
			if (!grid[y][x]) continue outer
		}
		grid.splice(y, 1)
		grid.unshift(new Array(grid[0].length).fill(0))
		linesCleared++
	}
	if (linesCleared > 0) {
		flashScreen()
		score += linesCleared * CONFIG.pointsPerLevel
		if (score >= level * CONFIG.speedIncreaseThreshold) {
			level++
			clearInterval(dropInterval)
			dropInterval = setInterval(update, CONFIG.speed[currentDifficulty] * Math.pow(0.9, level - 1))
		}
		saveUserData()
		updateUI()
	}
}

// == RYSOWANIE NA CANVAS ==

// Czyści canvas i rysuje aktualny stan gry
function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	drawGrid()
	drawFigure(currentFigure, 'current')
	drawShadow()
}

// Rysuje zatwierdzone klocki
function drawGrid() {
	for (let y = 0; y < grid.length; ++y) {
		for (let x = 0; x < grid[y].length; ++x) {
			if (grid[y][x]) {
				ctx.fillStyle = grid[y][x]
				ctx.fillRect(x * CONFIG.blockSize, y * CONFIG.blockSize, CONFIG.blockSize, CONFIG.blockSize)
			}
		}
	}
}

// Rysuje figurę (lub cień)
function drawFigure(figure, type) {
	ctx.fillStyle = type === 'shadow' ? 'rgba(255, 255, 255, 0.3)' : figure.color
	figure.shape.forEach((row, y) => {
		row.forEach((value, x) => {
			if (value) {
				ctx.fillRect(
					(figure.x + x) * CONFIG.blockSize,
					(figure.y + y) * CONFIG.blockSize,
					CONFIG.blockSize,
					CONFIG.blockSize
				)
			}
		})
	})
}

// Rysuje cień pokazujący miejsce lądowania figury
function drawShadow() {
	let shadow = { ...currentFigure }
	while (!collisionAt(shadow, 0, 1)) {
		shadow.y++
	}
	drawFigure(shadow, 'shadow')
}

// Sprawdza kolizję dla podanej figury
function collisionAt(figure, dx, dy) {
	const shape = figure.shape
	for (let y = 0; y < shape.length; ++y) {
		for (let x = 0; x < shape[y].length; ++x) {
			if (shape[y][x]) {
				const newX = figure.x + x + dx
				const newY = figure.y + y + dy
				if (
					newX < 0 ||
					newX >= canvas.width / CONFIG.blockSize ||
					newY >= canvas.height / CONFIG.blockSize ||
					(newY >= 0 && grid[newY][newX])
				) {
					return true
				}
			}
		}
	}
	return false
}

// == EFEKTY WIZUALNE ==

// Krótki błysk ekranu
function flashScreen() {
	const flash = document.getElementById('flash')
	flash.style.display = 'block'
	flash.style.position = 'fixed'
	flash.style.top = 0
	flash.style.left = 0
	flash.style.width = '100%'
	flash.style.height = '100%'
	flash.style.backgroundColor = 'white'
	flash.style.opacity = '0.7'
	flash.style.zIndex = '999'
	setTimeout(() => {
		flash.style.display = 'none'
	}, 100)
}

// Wyświetla ekran "Koniec gry"
function showGameOverScreen() {
	const flash = document.getElementById('flash')
	flash.style.display = 'block'
	flash.style.position = 'fixed'
	flash.style.top = 0
	flash.style.left = 0
	flash.style.width = '100%'
	flash.style.height = '100%'
	flash.style.backgroundColor = 'black'
	flash.style.color = 'white'
	flash.style.fontSize = '32px'
	flash.style.textAlign = 'center'
	flash.style.lineHeight = '100vh'
	flash.style.zIndex = '999'
	flash.innerText = 'Koniec gry! Naciśnij R, aby zrestartować.'
}

// Pauzuje/wznawia grę
function togglePause() {
	isPaused = !isPaused
	document.getElementById('pause').style.display = isPaused ? 'block' : 'none'
}

// == FUNKCJE POMOCNICZE ==

// Rozjaśnia podany kolor o procent
function lightenColor(color, percent) {
	const num = parseInt(color.slice(1), 16),
		amt = Math.round(2.55 * percent)
	const R = (num >> 16) + amt,
		G = ((num >> 8) & 0x00ff) + amt,
		B = (num & 0x0000ff) + amt
	return `#${(
		0x1000000 +
		(R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
		(G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
		(B < 255 ? (B < 1 ? 0 : B) : 255)
	)
		.toString(16)
		.slice(1)}`
}

// Aktualizuje punkty i poziom na ekranie
function updateUI() {
	document.getElementById('score').innerText = `Punkty: ${score}`
	document.getElementById('level').innerText = `Poziom: ${level}`
}

function restartGame() {
	// Zatrzymujemy poprzedni interwał (jeśli działa)
	clearInterval(dropInterval)

	// Resetujemy dane gry
	score = 0
	level = 1
	grid = createEmptyGrid()

	// Tworzymy nową figurę
	spawnFigure()

	// Resetujemy stan pauzy
	isPaused = false
	document.getElementById('pause').style.display = 'none'

	// Restartujemy interwał spadania
	dropInterval = setInterval(update, CONFIG.speed[currentDifficulty])

	// Aktualizujemy interfejs
	updateUI()
}
