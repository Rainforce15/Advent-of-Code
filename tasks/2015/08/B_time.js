module.exports = function(input) {

	let stringChars = input.length - 1
	let memChars = 0

	for (let i = 0; i < stringChars; i++) {
		if (input[i] === '"') {
			if (i === 0 || input[i - 1] === "\n" || input[i + 1] === "\n") {
				memChars += 3
				continue
			}
			memChars += 2
			continue
		}
		if (input[i] === "\\") {
			memChars += 2
			continue
		}

		memChars++
	}
	return memChars - stringChars

}
