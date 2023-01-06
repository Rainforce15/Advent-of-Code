module.exports = function(input) {

	let houseCache = new Set(["0,0"])
	let x = 0
	let y = 0

	for (let i = 0; i < input.length; i++) {
		let dir = input[i]
		if (dir === "^") y -= 1
		else if (dir === ">") x += 1
		else if (dir === "v") y += 1
		else if (dir === "<") x -= 1
		houseCache.add(x + "," + y)
	}

	return houseCache.size;

}
