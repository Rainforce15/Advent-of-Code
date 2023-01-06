module.exports = function(input) {

	let houseCache = new Set(["0,0"])
	let santa = [0, 0]
	let robot = [0, 0]

	for (let i = 0; i < input.length; i++) {
		let curSanta = i % 2 === 0 ? santa : robot
		let dir = input[i]
		if (dir === "^") curSanta[1] -= 1
		else if (dir === ">") curSanta[0] += 1
		else if (dir === "v") curSanta[1] += 1
		else if (dir === "<") curSanta[0] -= 1
		houseCache.add(curSanta[0] + "," + curSanta[1])
	}

	return houseCache.size;

}
