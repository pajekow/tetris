// menu.js

function startGame() {
	if (!currentUser) {
		alert('Musisz się najpierw zalogować!')
		return
	}

	document.getElementById('menu').style.display = 'none'
	document.getElementById('game').style.display = 'block'
	initGame()
}
