module.exports = function(input) {

	let floor = 0
	let i = 0

	for (; i < input.length; i++) {
		if (input[i] === "(")
			floor++
		else if (input[i] === ")")
			floor--

		if (floor === -1)
			return i + 1
	}
}
