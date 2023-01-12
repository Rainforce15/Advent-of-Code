module.exports = function(input) {

	let stringChars = input.length - 1
	let memChars = 0

	for (let i = 0; i < stringChars; i++) {
		if (input[i] === '"') {
			if(i === 0 || i === input.length - 2 || input[i + 1] === '\n' || input[i - 1] === '\n') {
				continue
			}
		}
		if (input[i] === '\\') {
			if (input[i + 1] === '\\' || input[i + 1] === '"') {
				i++
			}
			else if (input[i + 1] === 'x') {
				i += 3
			}
		}

		memChars++
	}
	return stringChars - memChars

}
