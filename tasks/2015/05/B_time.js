let doublesPattern = /(?=.*(..).*\1)(?=.*(.).\2)/

module.exports = function(input) {

	let nice = 0
	let start = 0

	for (let i = 0; i < input.length; i++) {
		if (input[i] === '\n') {
			if (doublesPattern.test(input.substring(start, i))) nice++
			start = i + 1
		}
	}

	return nice
}
