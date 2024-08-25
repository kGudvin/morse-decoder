const MORSE_TABLE = {
	'.-': 'a',
	'-...': 'b',
	'-.-.': 'c',
	'-..': 'd',
	'.': 'e',
	'..-.': 'f',
	'--.': 'g',
	'....': 'h',
	'..': 'i',
	'.---': 'j',
	'-.-': 'k',
	'.-..': 'l',
	'--': 'm',
	'-.': 'n',
	'---': 'o',
	'.--.': 'p',
	'--.-': 'q',
	'.-.': 'r',
	'...': 's',
	'-': 't',
	'..-': 'u',
	'...-': 'v',
	'.--': 'w',
	'-..-': 'x',
	'-.--': 'y',
	'--..': 'z',
	'.----': '1',
	'..---': '2',
	'...--': '3',
	'....-': '4',
	'.....': '5',
	'-....': '6',
	'--...': '7',
	'---..': '8',
	'----.': '9',
	'-----': '0',
	' ': ' ',
}

function decode(expr) {
	let dotAndDash = {
		10: '.',
		11: '-',
		backspace: ' ',
	}
	function chunker(expr, length) {
		let letterArray = []
		for (let index = 0; index < expr.length; index += length) {
			letterArray.push(expr.slice(index, index + length))
		}
		return letterArray
	}
	let letterArr = chunker(expr, 10)
	const slicedArrayOfNumbers = letterArr.map(e => {
		if (e[0] == '*') {
			return e
		}
		return e.slice(e.indexOf('1'))
	})
	let arrayOfSymbolsInNumbers = []
	for (let i = 0; i < slicedArrayOfNumbers.length; i++) {
		if (slicedArrayOfNumbers[i][0] == '*') {
			arrayOfSymbolsInNumbers.push(['backspace'])
			continue
		}
		arrayOfSymbolsInNumbers.push(chunker(slicedArrayOfNumbers[i], 2))
	}
	function changer(arr) {
		let symbols = []
		let result = ''
		let arrOfSymbols = arr.map(e => {
			let semiresult = []
			for (let j = 0; j < e.length; j++) {
				semiresult.push(dotAndDash[e[j]])
			}
			symbols.push(semiresult.join(''))
		})

		symbols.forEach(letter => {
			result += MORSE_TABLE[letter]
		})
		return result
	}
	let x = changer(arrayOfSymbolsInNumbers)

	return x
}

module.exports = {
	decode,
}
