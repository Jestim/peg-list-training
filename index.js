const elements = {
	minEl: document.getElementById('min'),
	maxEl: document.getElementById('max'),
	pegNumberEl: document.getElementById('peg-number'),
	inputEl: document.getElementById('input'),
	resultEl: document.getElementById('result'),
	correctEl: document.getElementById('correct'),
	incorrectEl: document.getElementById('incorrect'),
	submitEl: document.getElementById('submit'),
	answersEl: document.getElementById('answers')
}

function main() {
	let currentPegWord
	let currentPegNumber
	let correctAnswers = 0
	let incorrectAnswers = 0

	const {
		minEl,
		maxEl,
		pegNumberEl,
		inputEl,
		resultEl,
		correctEl,
		incorrectEl,
		submitEl,
		answersEl
	} = elements

	getPegList()
		.then(pegList => {
			const min = parseInt(minEl.value)
			const max = parseInt(maxEl.value)

			const randomIndex = getRandombetween(min, max)
			currentPegNumber = randomIndex < 10 
				? `0${randomIndex}`
				: randomIndex
			pegNumberEl.textContent = currentPegNumber
			console.log(randomIndex)

			currentPegWord = pegList[randomIndex]
			console.log('currentPeg: ', currentPegWord)

			// On Submit Click
			submitEl.addEventListener('click', (event) => {
				event.preventDefault()
				console.log('submit')
				const input = inputEl.value.toLowerCase()
				console.log('input: ', input)

				if (input === currentPegWord) {
					correctAnswers++
					resultEl.textContent = 'Correct'
					correctEl.textContent = `Correct: ${correctAnswers}`

					answersEl.style.backgroundColor = '#9bff9b'

					const min = parseInt(minEl.value)
					const max = parseInt(maxEl.value)
					const randomIndex = getRandombetween(min, max)
						currentPegNumber = randomIndex < 10 
							? `0${randomIndex}`
							: randomIndex
						pegNumberEl.textContent = currentPegNumber
					currentPegWord = pegList[randomIndex]
					console.log('currentPeg: ', currentPegWord)

					inputEl.value = ''
				} else {
					resultEl.textContent = 'Incorrect'
					answersEl.style.backgroundColor = '#ff6565'

					incorrectAnswers++
					incorrectEl.textContent = `Incorrect: ${incorrectAnswers}`
				}
			})

			pegNumberEl.addEventListener('mouseenter', () => {
				pegNumberEl.textContent = currentPegWord
			})

			pegNumberEl.addEventListener('mouseleave', () => {
				pegNumberEl.textContent = currentPegNumber
			})
		})
}

async function getPegList() {
	const result = await fetch('./peg-list.json')
	if (!result.ok) {
		throw new Error('Failed to fetch peg list')
	}

	return await result.json()
}

function getRandombetween(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

main()