let fs = require("fs")
let args = [...process.argv];

let golfSuffix = "_time";

if (args.includes("--space") || args.includes("-s")) {
	golfSuffix = "_space";
	if (args.includes("--space")) args.splice(args.indexOf("--space"), 1)
	if (args.includes("-s")) args.splice(args.indexOf("-s"), 1)
	console.log("running space-optimised versions...");
}

let A = "A";
let B = "B";

let resultSet = {};
let rootFolder = "tasks"

let yearPattern = /\d{4,}/
let dayPattern = /[1-9]|1\d|2[0-5]/
let abPattern = /[ABab]/

if (["--help", "-h"].includes(args[2])) {
	console.log(fs.readFileSync("aocTester_help.md", "utf-8"));
	process.exit()
}

let argYear = args[2];
let argDay = args[3];
let argAB = args[4];

let tableHeader = "     | 01  02  03  04  05  06  07  08  09  10  11  12  13  14  15  16  17  18  19  20  21  22  23  24  25 \n-----+----------------------------------------------------------------------------------------------------"

async function main() {
	if (yearPattern.test(argYear)) {
		if (dayPattern.test(argDay)) {
			if (abPattern.test(argAB)) {
				console.log(`running ${argYear}/${argDay}/${argAB}...\n`)
				await runDayTask(argYear, argDay, argAB.toUpperCase())
			} else {
				console.log(`running ${argYear}/${argDay}...\n`)
				await runDay(argYear, argDay)
			}
		} else {
			console.log(tableHeader)
			await runYear(argYear)
		}
	} else {
		console.log("running everything (this may take a while)...\n")

		console.log(tableHeader)
		await runEverything()
		printResult()
	}

}
main().then()

async function runDay(year, day) {
	let inputPath = rootFolder + "/" + year + "/" + day.toString().padStart(2, "0") + "/input.txt";
	let input = null;
	try {
		input = fs.readFileSync(inputPath, "utf-8")
	} catch (e) {}

	if (input === null || input === "") {
		writeResult("NO INPUT", year, day)
	} else {
		let wrongResA = await runTask(year, day, A, input)
		let wrongResB = await runTask(year, day, B, input)
		if (wrongResA) console.log(" provided result A:", wrongResA)
		if (wrongResB) console.log(" provided result B:", wrongResB)
	}
}

async function runDayTask(year, day, ab) {
	let inputPath = rootFolder + "/" + year + "/" + day.toString().padStart(2, "0") + "/input.txt";
	let input = null;
	try {
		input = fs.readFileSync(inputPath, "utf-8")
	} catch (e) {}

	if (input === null || input === "") {
		writeResult("NO INPUT", year, day, ab)
	} else {
		let wrongRes = await runTask(year, day, ab, input)
		if (wrongRes) console.log(" provided result:", wrongRes);
	}
}

async function runYear(year) {
	writeNewYear(year)
	for (let day = 1; day <= 25; day++) {
		await runDay(year, day)
	}
	process.stdout.write("\n")
}

async function runEverything() {
	let tasksDir = fs.opendirSync(rootFolder)
	let year = null;
	while ((year = tasksDir.readSync()) !== null) {
		await runYear(year.name)
	}
}

async function runTask(year, day, ab, input) {
	let filePath = rootFolder + "/" + year + "/" + day.toString().padStart(2, "0") + "/" + ab + golfSuffix + ".js";
	let solPath = rootFolder + "/" + year + "/" + day.toString().padStart(2, "0") + "/" + ab + "_solution.txt";

	let sol = null;
	try {
		sol = fs.readFileSync(solPath, "utf-8");
	} catch (e) {}

	let solver = null;
	try {
		solver = require("./" + filePath);
	} catch (e) {}

	if (solver === null) {
		writeResult("!", year, day, ab)
	} else {
		if (sol === null || sol === "") {
			process.stdout.write("\n\n")
			console.log(`no solution for ${ab}, providing: ${solver(input)}`)
		} else {
			let result = solver(input).toString()
			if (result === sol) {
				writeResult("O", year, day, ab)
			} else {
				writeResult("X", year, day, ab)
				return result
			}
		}
	}
}

function writeNewYear(year) {
	process.stdout.write(year + " |")
}

function writeResult(res, year, day, ab) {
	day = parseInt(day) - 1

	resultSet[year] = resultSet[year] ?? []
	resultSet[year][day] = resultSet[year][day] ?? {}
	if (ab === undefined) {
		resultSet[year][day][A] = res
		resultSet[year][day][B] = res
	} else {
		resultSet[year][day][ab] = res
	}

	switch (res) {
		case "NO INPUT":
			process.stdout.write("░░░░");
			break;
		case "O":
			process.stdout.write("██");
			break;
		case "!":
			process.stdout.write("!!");
			break;
		case "X":
			process.stdout.write("XX");
			break;
	}
}

function printResult() {
	let markdown =
		"Current Progress\n" +
		"----------------\n" +
		"```\n" +
		"     ║          1111111111222222\n" +
		"     ║ 1234567890123456789012345\n" +
		"─────╫──────────────────────────\n"

	for (let year in resultSet) {
		markdown += year + " ║ "
		for (let day in resultSet[year]) {
			let abRes = resultSet[year][day]
			if (abRes.A === "O" && abRes.B === "O") {
				markdown += "█"
			} else if(abRes.A === "O") {
				markdown += "▀"
			} else if(abRes.B === "O") {
				markdown += "▄"
			} else {
				markdown += "░"
			}
		}
		markdown += "\n"
	}
	markdown += "```\n\n"

	let readme = fs.readFileSync("README.md", "utf-8")
	readme = readme.replace(/Current Progress\n(.|\n)+\n\n/gm, markdown)
	fs.writeFileSync("README.md", readme)
}
