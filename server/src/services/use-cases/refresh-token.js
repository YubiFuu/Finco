const User = require("../../models/User");
const { createToken } = require("../utilities/createToken");

async function refreshToken({ userId }) {
  const user = await User.findById(userId).exec();
  if (!user) {
    throw new Error("User does not exist anymore");
  }

  const accessToken = createToken(user, "access");
  return { accessToken };
}

module.exports = {
  refreshToken,
};
