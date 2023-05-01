module.exports = function(input) {

	let solution = input;

	for(let i = 0; i < 50; i++) {
		solution = lookAndSay(solution)
	}

	return solution.length

}

function lookAndSay(str) {
	let result = "";

	let i = 0
	while (i < str.length) {
		let num = str[i]
		let count = 1
		while (str[i + count] === num) count++
		result += count + num
		i += count
	}

	return result
}