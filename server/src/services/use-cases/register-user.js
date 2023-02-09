const { User } = require("../../models");
const { createHash, createRandomSalt } = require("../utilities/createHash");

async function registerUser({ firstName, lastName, email, password }) {
    // connectToDatabase aufrufen
    const foundUser = await User.findOne({ email }).exec();
    if (foundUser) {
        throw new Error("User with this Email already exists");
    }
    const passwordSalt = createRandomSalt();
    const passwordHash = createHash(`${password}${passwordSalt}`);
    const newUser = await User.create({
        firstName,
        lastName,
        email,
        passwordHash,
        passwordSalt,
    });
    return {
        _id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
    };
}

module.exports = {
    registerUser,
};
