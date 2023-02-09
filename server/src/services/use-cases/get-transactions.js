const { User } = require("../../models");

async function getTransactions({ userId }) {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error("User not Found");
    }
    return { transaction: user.transaction };
}

module.exports = { getTransactions };
