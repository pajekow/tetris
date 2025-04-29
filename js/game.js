// game.js

// Stałe przypisanie kolorów do figur
const FIGURE_COLORS = {
	I: 'cyan',
	O: 'yellow',
	T: 'purple',
	S: 'green',
	Z: 'red',
	J: 'blue',
	L: 'orange',
}

let canvas, ctx
let currentFigure, nextFigure
let grid
let score = 0
let level = 1
let dropInterval
let isPaused = false
let moveAudio, rotateAudio, dropAudio

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

function loadSounds() {
	moveAudio = new Audio(CONFIG.moveSound)
	rotateAudio = new Audio(CONFIG.rotateSound)
	dropAudio = new Audio(CONFIG.dropSound)
}

function createEmptyGrid() {
	const rows = CONFIG.canvasHeight / CONFIG.blockSize
	const cols = CONFIG.canvasWidth / CONFIG.blockSize
	return Array.from({ length: rows }, () => Array(cols).fill(0))
}

function spawnFigure() {
	const figuresList = FIGURES[currentDifficulty]
	const randomFigure = figuresList[Math.floor(Math.random() * figuresList.length)]
	currentFigure = {
		shape: JSON.parse(JSON.stringify(randomFigure.shape)),
		x: Math.floor(canvas.width / CONFIG.blockSize / 2) - 1,
		y: 0,
		color: FIGURE_COLORS[randomFigure.type],
	}
	checkGameOver()
}

function update() {
	if (isPaused) return
	moveFigure(0, 1)
}

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

function rotateFigure() {
	const rotated = currentFigure.shape[0].map((_, i) => currentFigure.shape.map((row) => row[i]).reverse())
	const oldShape = currentFigure.shape
	currentFigure.shape = rotated
	if (collision(0, 0)) {
		currentFigure.shape = oldShape // undo
	}
	rotateAudio.play()
}

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

function mergeFigure() {
	const shape = currentFigure.shape
	for (let y = 0; y < shape.length; ++y) {
		for (let x = 0; x < shape[y].length; ++x) {
			if (shape[y][x]) {
				grid[currentFigure.y + y][currentFigure.x + x] = currentFigure.color // teraz zapisujemy kolor!
			}
		}
	}
	dropAudio.play()
}

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
		flashScreen() // <-- NOWOŚĆ: błysk
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

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	drawGrid()
	drawFigure(currentFigure, 'current')
	drawShadow()
}

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

function drawFigure(figure, type) {
	ctx.fillStyle = type === 'current' ? figure.color : 'rgba(0, 0, 0, 0.3)'
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

function drawShadow() {
	let shadow = { ...currentFigure }
	while (!collisionAt(shadow, 0, 1)) {
		shadow.y++
	}
	drawFigure(shadow, 'shadow')
}

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
	}, 100) // szybki błysk 100ms
}

function togglePause() {
	isPaused = !isPaused
	document.getElementById('pause').style.display = isPaused ? 'block' : 'none'
}

function restartGame() {
	clearInterval(dropInterval)
	score = 0
	level = 1
	grid = createEmptyGrid()
	spawnFigure()
	updateUI()
	saveUserData()
	dropInterval = setInterval(update, CONFIG.speed[currentDifficulty])
}

function updateUI() {
	document.getElementById('score').innerText = `Punkty: ${score}`
	document.getElementById('level').innerText = `Poziom: ${level}`
}
