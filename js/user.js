// user.js

let currentUser = null
let currentDifficulty = 'beginner'
let userData = {}

function loginUser() {
	const usernameInput = document.getElementById('username').value.trim()
	if (usernameInput.length === 0) {
		alert('Wprowadź nazwę użytkownika!')
		return
	}
	currentUser = usernameInput
	const difficultySelect = document.getElementById('difficulty')
	currentDifficulty = difficultySelect.value
	loadUserData()
	// UWAGA: NIE chowamy menu ani nie pokazujemy gry tutaj!
}

function loadUserData() {
	const savedData = localStorage.getItem(`tetris_user_${currentUser}`)
	if (savedData) {
		userData = JSON.parse(savedData)
		if (userData.difficulty) {
			currentDifficulty = userData.difficulty
		}
		if (userData.highScore) {
			alert(`Witaj ponownie ${currentUser}! Twój rekord: ${userData.highScore} punktów`)
		}
	} else {
		userData = {
			username: currentUser,
			difficulty: currentDifficulty,
			highScore: 0,
		}
	}
}

function saveUserData() {
	userData.username = currentUser
	userData.difficulty = currentDifficulty
	if (score > userData.highScore) {
		userData.highScore = score
	}
	localStorage.setItem(`tetris_user_${currentUser}`, JSON.stringify(userData))
}
