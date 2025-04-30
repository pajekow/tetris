// menu.js

// Funkcja startująca grę po kliknięciu przycisku "Start"
function startGame() {
	// Sprawdzenie, czy użytkownik jest zalogowany
	if (!currentUser) {
		alert('Musisz się najpierw zalogować!')
		return
	}

	// Ukrycie menu głównego
	document.getElementById('menu').style.display = 'none'

	// Pokazanie głównego widoku gry
	document.getElementById('game').style.display = 'block'

	// Inicjalizacja gry: plansza, figura, punkty itd.
	initGame()
}
