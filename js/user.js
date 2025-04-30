// user.js

// == ZMIENNE GLOBALNE DOTYCZĄCE UŻYTKOWNIKA ==

let currentUser = null // Nazwa aktualnie zalogowanego użytkownika
let currentDifficulty = 'beginner' // Domyślny poziom trudności
let userData = {} // Obiekt przechowujący dane użytkownika

// == LOGOWANIE UŻYTKOWNIKA ==

function loginUser() {
	const usernameInput = document.getElementById('username').value.trim()

	// Jeśli pole nazwy użytkownika jest puste — ostrzeżenie
	if (usernameInput.length === 0) {
		alert('Wprowadź nazwę użytkownika!')
		return
	}

	// Zapisanie nazwy użytkownika i wybranego poziomu trudności
	currentUser = usernameInput
	const difficultySelect = document.getElementById('difficulty')
	currentDifficulty = difficultySelect.value

	// Wczytanie danych użytkownika z pamięci przeglądarki
	loadUserData()

	// UWAGA: nie przełączamy tutaj widoku — to robi funkcja startGame()
}

// == WCZYTANIE DANYCH UŻYTKOWNIKA Z LOCAL STORAGE ==

function loadUserData() {
	const savedData = localStorage.getItem(`tetris_user_${currentUser}`)

	if (savedData) {
		// Jeśli istnieją dane — ładujemy je i nadpisujemy poziom trudności
		userData = JSON.parse(savedData)

		if (userData.difficulty) {
			currentDifficulty = userData.difficulty
		}

		if (userData.highScore) {
			alert(`Witaj ponownie ${currentUser}! Twój rekord: ${userData.highScore} punktów`)
		}
	} else {
		// Jeśli to nowy użytkownik — tworzymy nowy obiekt z danymi startowymi
		userData = {
			username: currentUser,
			difficulty: currentDifficulty,
			highScore: 0,
		}
	}
}

// == ZAPISYWANIE DANYCH UŻYTKOWNIKA DO LOCAL STORAGE ==

function saveUserData() {
	// Ustawiamy aktualne dane użytkownika
	userData.username = currentUser
	userData.difficulty = currentDifficulty

	// Jeśli nowy wynik jest lepszy — nadpisujemy rekord
	if (score > userData.highScore) {
		userData.highScore = score
	}

	// Zapis do localStorage jako JSON
	localStorage.setItem(`tetris_user_${currentUser}`, JSON.stringify(userData))
}
