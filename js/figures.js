// figures.js

// Definicja klocków (figur) dostępnych w grze, podzielona na poziomy trudności
const FIGURES = {
	beginner: [
		// Poziom: Początkujący - tylko podstawowe figury
		{ type: 'I', shape: [[1, 1, 1, 1]] }, // Prosta linia pozioma
		{
			type: 'O',
			shape: [
				[1, 1],
				[1, 1],
			], // Kwadrat 2x2
		},
		{
			type: 'T',
			shape: [
				[0, 1, 0],
				[1, 1, 1],
			], // Litera T
		},
		{
			type: 'L',
			shape: [
				[1, 0, 0],
				[1, 1, 1],
			], // Odwrócona litera L
		},
		{
			type: 'J',
			shape: [
				[0, 0, 1],
				[1, 1, 1],
			], // Litera J
		},
	],

	intermediate: [
		// Poziom: Średniozaawansowany - więcej typów figur
		{ type: 'I', shape: [[1, 1, 1, 1]] },
		{
			type: 'O',
			shape: [
				[1, 1],
				[1, 1],
			],
		},
		{
			type: 'T',
			shape: [
				[0, 1, 0],
				[1, 1, 1],
			],
		},
		{
			type: 'L',
			shape: [
				[1, 0, 0],
				[1, 1, 1],
			],
		},
		{
			type: 'J',
			shape: [
				[0, 0, 1],
				[1, 1, 1],
			],
		},
		{
			type: 'S',
			shape: [
				[1, 1, 0],
				[0, 1, 1],
			], // Figura S (skręt w prawo)
		},
	],

	advanced: [
		// Poziom: Zaawansowany - wszystkie możliwe figury
		{ type: 'I', shape: [[1, 1, 1, 1]] },
		{
			type: 'O',
			shape: [
				[1, 1],
				[1, 1],
			],
		},
		{
			type: 'T',
			shape: [
				[0, 1, 0],
				[1, 1, 1],
			],
		},
		{
			type: 'L',
			shape: [
				[1, 0, 0],
				[1, 1, 1],
			],
		},
		{
			type: 'J',
			shape: [
				[0, 0, 1],
				[1, 1, 1],
			],
		},
		{
			type: 'S',
			shape: [
				[1, 1, 0],
				[0, 1, 1],
			],
		},
		{
			type: 'Z',
			shape: [
				[0, 1, 1],
				[1, 1, 0],
			], // Figura Z (skręt w lewo)
		},
	],
}
