module.exports = function(input) {

	let grid = new Array(1000 * 1000).fill(0)

	let op = -1
	let x1 = -1
	let y1 = -1
	let x2 = -1
	let y2 = -1
	let numStart = -1

	for (let i = 0; i < input.length; i++) {

		if (
			numStart === -1 &&
			(
				input[i] === '0' ||
				input[i] === '1' ||
				input[i] === '2' ||
				input[i] === '3' ||
				input[i] === '4' ||
				input[i] === '5' ||
				input[i] === '6' ||
				input[i] === '7' ||
				input[i] === '8' ||
				input[i] === '9'
			)
		) {
			numStart = i
			if (op === -1) {
				if (input[i-2] === 'f') op = -1
				else if (input[i-2] === 'n') op = 1
				else if (input[i-2] === 'e') op = 2
			}
		}

		if (numStart > -1) {
			if (input[i] === ',') {
				if (x1 === -1) x1 = parseInt(input.substring(numStart, i))
				else x2 = parseInt(input.substring(numStart, i))
				numStart = -1
			}
			else if (input[i] === ' ') {
				y1 = parseInt(input.substring(numStart, i))
				numStart = -1
			}
		}

		if(input[i] === '\n') {
			y2 = parseInt(input.substring(numStart, i))
			numStart = -1

			for (let x = x1; x <= x2; x++) {
				for (let y = y1; y <= y2; y++) {
					let pos = x + y * 1000;
					grid[pos] = Math.max(grid[pos] + op, 0)
				}
			}

			op = -1
			x1 = -1
			y1 = -1
			x2 = -1
			y2 = -1
			numStart = -1
		}
	}

	let lightsOn = 0
	for (let i = 0; i < grid.length; i++) {
		lightsOn += grid[i]
	}

	return lightsOn;

}
