let fs = require("fs")
let args = process.argv;

let rootFolder = "tasks"

let solverTemplate = fs.readFileSync("solverTemplate.js", "utf-8")

let yearPattern = /\d{4,}/
let dayPattern = /[1-9]|1\d|2[0-5]/

if (args.length === 2 || ["--help", "-h"].includes(args[2])) {
	console.log(fs.readFileSync("setupAoc_help.md", "utf-8"));
	process.exit()
}

let argYear = args[2];
let argDay = args[3];

if (yearPattern.test(argYear)) {

	if (dayPattern.test(argDay)) {
		console.log(`setting up ${argYear}/${argDay}...`)
		setupDay(argYear, argDay)
	} else {
		console.log(`setting up ${argYear}...`)
		setupYear(argYear)
	}
	console.log("done.")
}

function setupYear(year) {
	try {
		fs.mkdirSync(rootFolder + "/" + year)
	} catch (e) {
		if (e.code === "ENOENT") {
			fs.mkdirSync(rootFolder)
			fs.mkdirSync(rootFolder + "/" + year)
		}
		else if (e.code !== "EEXIST") throw e
	}

	for (let day = 1; day <= 25; day++) {
		setupDay(year, day)
	}
}

function setupDay(year, day) {
	try {
		fs.mkdirSync(rootFolder + "/" + year + "/" + day)
	} catch (e) {
		if (e.code === "ENOENT") {
			fs.mkdirSync(rootFolder + "/" + year)
			fs.mkdirSync(rootFolder + "/" + year + "/" + day)
		}
		else if (e.code !== "EEXIST") throw e
	}

	setupDayFiles(year, day)
}

function setupDayFiles(year, day) {
	for (let solverFile of ["A_time.js", "A_space.js", "B_time.js", "B_space.js"]) {
		try {
			fs.writeFileSync(rootFolder + "/" + year + "/" + day + "/" + solverFile, solverTemplate)
		} catch (e) {
			if (e.code !== "EEXIST") throw e
		}
	}

	for (let emptyFile of ["input.txt", "A_solution.txt", "B_solution.txt"]) {
		try {
			fs.writeFileSync(rootFolder + "/" + year + "/" + day + "/" + emptyFile, "")
		} catch (e) {
			if (e.code !== "EEXIST") throw e
		}
	}
}
