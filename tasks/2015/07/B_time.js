let wires = {}
function sim (lines) {
	while (wires.a === undefined) {

		for (let i = 0; i < lines.length; i++) {
			let line = lines[i]
			if (line.length === 2) {
				let source = line[0];
				let srcVal = parseInt(source);
				let target = line[1]

				if (!isNaN(srcVal) && wires[target] === undefined) {
					wires[target] = srcVal
					lines.splice(i, 1)
					i--
				} else if (wires[source] !== undefined && wires[target] === undefined) {
					wires[target] = wires[source]
					lines.splice(i, 1)
					i--
				}
			}
			else if (line.length === 3) {
				let source = line[1];
				let target = line[2]

				if (wires[source] !== undefined && wires[target] === undefined) {
					wires[target] = ~wires[source] & 0xFFFF
					lines.splice(i, 1)
					i--
					continue
				}

				let srcVal = parseInt(source);
				if (!isNaN(srcVal) && wires[target] === undefined) {
					wires[target] = ~srcVal & 0xFFFF
					lines.splice(i, 1)
					i--
				}
			}
			else if (line.length === 4) {
				let op = line[1]
				let sourceA = line[0];
				let sourceB = line[2];
				let target = line[3]

				if (op === "LSHIFT") {
					let opVal = parseInt(sourceB);

					if (wires[sourceA] !== undefined && wires[target] === undefined) {
						wires[target] = (wires[sourceA] << opVal) & 0xFFFF
						lines.splice(i, 1)
						i--
					}
				}
				else if (op === "RSHIFT") {
					let opVal = parseInt(sourceB);

					if (wires[sourceA] !== undefined && wires[target] === undefined) {
						wires[target] = (wires[sourceA] >> opVal) & 0xFFFF
						lines.splice(i, 1)
						i--
					}
				}
				else if (op === "AND") {
					if (wires[sourceA] !== undefined && wires[sourceB] !== undefined && wires[target] === undefined) {
						wires[target] = (wires[sourceA] & wires[sourceB]) & 0xFFFF
						lines.splice(i, 1)
						i--
						continue
					}

					let valB = parseInt(sourceB)
					if (wires[sourceA] !== undefined && !isNaN(valB) && wires[target] === undefined) {
						wires[target] = (wires[sourceA] & valB) & 0xFFFF
						lines.splice(i, 1)
						i--
						continue
					}

					let valA = parseInt(sourceA)
					if (!isNaN(valA) && wires[sourceB] !== undefined && wires[target] === undefined) {
						wires[target] = (valA & wires[sourceB]) & 0xFFFF
						lines.splice(i, 1)
						i--
					}
				}
				else if (op === "OR") {
					if (wires[sourceA] !== undefined && wires[sourceB] !== undefined && wires[target] === undefined) {
						wires[target] = (wires[sourceA] | wires[sourceB]) & 0xFFFF
						lines.splice(i, 1)
						i--
						continue
					}

					let valB = parseInt(sourceB)
					if (wires[sourceA] !== undefined && !isNaN(valB) && wires[target] === undefined) {
						wires[target] = (wires[sourceA] | valB) & 0xFFFF
						lines.splice(i, 1)
						i--
						continue
					}

					let valA = parseInt(sourceA)
					if (!isNaN(valA) && wires[sourceB] !== undefined && wires[target] === undefined) {
						wires[target] = (valA | wires[sourceB]) | 0xFFFF
						lines.splice(i, 1)
						i--
					}
				}
			}
		}
	}
}

module.exports = function(input) {
	let lines1 = []
	let lines2 = []
	input.trim().split("\n").forEach(l => {
		let lineData = l.split(/ -> | /)
		lines1.push(lineData)
		lines2.push(lineData)
	})

	sim(lines1)
	wires = {b:wires.a}
	sim(lines2)

	return wires.a;

}
