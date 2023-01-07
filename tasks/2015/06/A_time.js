module.exports = function(input) {

	let grid = new Array(1000 * 1000).fill(false)

	let type = -1
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
			if (type === -1) {
				if (input[i-2] === 'f') type = 0
				else if (input[i-2] === 'n') type = 1
				else if (input[i-2] === 'e') type = 2
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

			if(type === 0) {
				for (let x = x1; x <= x2; x++) {
					for (let y = y1; y <= y2; y++) {
						grid[x + y * 1000] = false
					}
				}
			} else if (type === 1) {
				for (let x = x1; x <= x2; x++) {
					for (let y = y1; y <= y2; y++) {
						grid[x + y * 1000] = true
					}
				}
			} else {
				for (let x = x1; x <= x2; x++) {
					for (let y = y1; y <= y2; y++) {
						let xy = x + y * 1000
						grid[xy] = !grid[xy]
					}
				}
			}

			type = -1
			x1 = -1
			y1 = -1
			x2 = -1
			y2 = -1
			numStart = -1
		}
	}

	let lightsOn = 0
	for (let i = 0; i < grid.length; i++) {
		if (grid[i]) lightsOn++
	}

	return lightsOn;

}
