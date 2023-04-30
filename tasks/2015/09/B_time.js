module.exports = function(input) {

	let entries = input.trim()
		.split("\n")
		.map(line => line.split(/ to | = /g))

	let longestEdge = entries.reduce((oldMax, current) => {
		current[2] = parseInt(current[2]);
		return Math.max(oldMax, current[2])
	}, 0);

	let map = {}

	entries.forEach(e => {
		if (map[e[0]] == null) map[e[0]] = {}
		if (map[e[1]] == null) map[e[1]] = {}
		let val = longestEdge - e[2]
		map[e[0]][e[1]] = val
		map[e[1]][e[0]] = val
	})
	for (let city in map) {
		map[city]["+"] = Object.values(map[city]).reduce((s,v) => s+v)
		map[city]["_"] = Object.entries(map[city]).filter(e => e[0] !== "+").sort((a, b) => a[1] - b[1]).map(e => e[0])
	}
	map["_"] = Object.entries(map).map(e => [e[0], e[1]["+"]]).sort((a, b) => a[1] - b[1]).map(e => e[0])

	let bound = null;
	for (let rootCity of map._) {
		(function shortestPath(curPath, len) {
			let currentCityEntry = map[curPath[curPath.length - 1]]
			let cityList = currentCityEntry._

			for (let targetCity of cityList) {
				let targetLen = len + currentCityEntry[targetCity]

				if (curPath.indexOf(targetCity) > -1 || bound != null && len != null && targetLen > bound) continue

				if (curPath.length >= map._.length - 1) {
					if (bound == null || targetLen < bound){
						bound = targetLen
					}
				} else {
					shortestPath([...curPath, targetCity], targetLen)
				}
			}
		})([rootCity], null)
	}

	return longestEdge * (map._.length - 1) - bound;

}
