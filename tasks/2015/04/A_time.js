let crypto = require("crypto")

module.exports = function(input) {
	for (let i = 0;; i++) {
		let hash = crypto.createHash("md5").update(input + i).digest("hex").substring(0,6)

		if (
			hash[0] === '0' &&
			hash[1] === '0' &&
			hash[2] === '0' &&
			hash[3] === '0' &&
			hash[4] === '0'
		) return i
	}
}
