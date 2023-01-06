let fs = require("fs")
let args = [...process.argv];

let golfSuffix = "_time";
if (args.includes("-space")) {
	golfSuffix = "_space";
	args.splice(args.indexOf("-space"), 1)
}
console.log("running space-optimised versions...");

let rootFolder = "tasks"

let yearPattern = /\d{4,}/
let dayPattern = /[1-9]|1\d|2[0-5]/
let abPattern = /[ab]/

if (["--help", "-h"].includes(args[2])) {
	console.log(fs.readFileSync("aocTester_help.md", "utf-8"));
	process.exit()
}

let argYear = args[2];
let argDay = args[3];
let argAB = args[4];

let tableHeader = "     | 01  02  03  04  05  06  07  08  09  10  11  12  13  14  15  16  17  18  19  20  21  22  23  24  25 \n-----+----------------------------------------------------------------------------------------------------"

if (yearPattern.test(argYear)) {

	console.log(tableHeader)

	if (dayPattern.test(argDay)) {
		if (abPattern.test(argAB)) {
			console.log(`running ${argYear}/${argDay}/${argAB}...\n`)
			runTask(argYear, argDay, argAB).then()
		} else {
			console.log(`running ${argYear}/${argDay}...\n`)
			runDay(argYear, argDay).then()
		}
	} else {
		runYear(argYear).then()
	}
	console.log("done.")
} else {
	console.log("running everything (this may take a while)...\n")

	console.log(tableHeader)
	runEverything().then()
}

async function runDay(year, day) {
	let inputPath = rootFolder + "/" + year + "/" + day.toString().padStart(2, "0") + "/input.txt";
	let input = null;
	try {
		input = fs.readFileSync(inputPath, "utf-8")
	} catch (e) {}

	if (input === null || input === "") {
		process.stdout.write("NOIN")
	} else {
		await runTask(year, day, "A", input)
		await runTask(year, day, "B", input)
	}
}

async function runYear(year) {
	process.stdout.write(year + " |")
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
		process.stdout.write("!!")
	} else {
		if (sol === null || sol === "") {
			process.stdout.write("\n\n")
			console.log(`no solution for ${ab}, providing: ${solver(input)}`)
		} else {
			if (solver(input).toString() === sol) {
				process.stdout.write("██")
			} else {
				process.stdout.write("XX")
			}
		}
	}
}