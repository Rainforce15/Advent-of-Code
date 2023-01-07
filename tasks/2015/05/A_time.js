module.exports = function(input) {

	let vowelCount = 0
	let twiceInARow = false
	let noAbCdPqXy = true

	let nice = 0

	let len = input.length
	let len2 = input.length - 1

	for (let i = 0; i < len; i++) {

		if (input[i] === '\n') {
			if (vowelCount >= 3 && twiceInARow && noAbCdPqXy) nice++

			vowelCount = 0
			twiceInARow = false
			noAbCdPqXy = true
			continue
		}

		switch(input[i]) {
			case 'a':
			case 'e':
			case 'i':
			case 'o':
			case 'u':
				vowelCount++
				break
		}

		if (i < len2) {
			let nextChar = input[i + 1];
			if(input[i] === nextChar) {
				twiceInARow = true
			}
			if(
				input[i] === 'a' && nextChar === 'b' ||
				input[i] === 'c' && nextChar === 'd' ||
				input[i] === 'p' && nextChar === 'q' ||
				input[i] === 'x' && nextChar === 'y'
			) {
				noAbCdPqXy = false
			}
		}
	}

	return nice
}
