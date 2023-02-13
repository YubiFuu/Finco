const { User } = require("../../models");

async function getTransactions({ userId }) {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error("User not Found");
    }
    return {
        transaction: user.transaction,
        monthlyTransaction: user.monthlyTransaction,
    };
}

module.exports = { getTransactions };
