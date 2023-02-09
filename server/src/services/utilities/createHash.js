const crypto = require("crypto");
function createHash(input) {
    return crypto.createHash("sha512").update(input, "utf-8").digest("hex");
}

function createRandomSalt() {
    const saltLengthInBytes = 32;
    const randomSalt = crypto.randomBytes(saltLengthInBytes).toString("hex");
    return randomSalt;
}

module.exports = {
    createHash,
    createRandomSalt,
};
