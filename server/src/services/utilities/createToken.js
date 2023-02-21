const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
    process.exit(1);
}

function createToken(user, type = "access") {
    const initTs = Math.floor(Date.now() / 1000);
    const one_hour = 60 * 60;
    const one_week = 7 * 24 * one_hour;
    const duration = type === "refresh" ? one_week : one_hour;
    const expireTs = initTs + duration;

    const tokenPayload = {
        type,
        sub: user._id.toString(),
        iat: initTs,
        exp: expireTs,
    };

    const jwtToken = jwt.sign(tokenPayload, jwtSecret);
    return jwtToken;
}
module.exports = {
    createToken,
};
