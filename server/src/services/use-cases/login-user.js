const { User } = require("../../models");
const { createHash } = require("../utilities/createHash");
const { createToken } = require("../utilities/createToken");

async function loginUser({ email, password }) {
  // validate if the user exists

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("user with this email does not exist");
  }
  // compare passowrd
  const passwordhash = user.passwordHash;
  const passwordSalt = user.passwordSalt;
  const validPassword =
    createHash(`${password}${passwordSalt}`) === passwordhash;
  if (!validPassword) {
    throw new Error("email or password false");
  }
  const accessToken = createToken(user, "access");
  const refreshToken = createToken(user, "refresh");
  return { accessToken, refreshToken };
}

module.exports = {
  loginUser,
};
