module.exports = function(input) {

	let l,w,h;
	let total = 0
	let start = 0
	let lParsed = false



	for (let i = 0; i < input.length; i++) {
		let char = input[i]
		if (char === 'x') {
			if (lParsed) {
				w = parseInt(input.substring(start, i))
			} else {
				l = parseInt(input.substring(start, i))
				lParsed = true
			}
			start = i + 1
		}

		if (char === "\n") {
			h = parseInt(input.substring(start, i))
			start = i + 1
			lParsed = false

			total += l * w * h

			if (l >= w && l >= h) total += w + w + h + h
			else if (w >= l && w >= h) total += l + l + h + h
			else total += l + l + w + w

		}
	}

	return total

}
