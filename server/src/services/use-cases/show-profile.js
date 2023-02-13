const { User } = require("../../models");

async function showProfile({ userId }) {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error("User not Found");
    }
    return {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        profilePicture: user.profilePicture,
        cardNumber: user.cardNumber,
        monthlyLimit: user.monthlyLimit,
        totalAmount: user.totalAmount,
        monthlyTransaction: user.monthlyTransaction,
    };
}

module.exports = { showProfile };
