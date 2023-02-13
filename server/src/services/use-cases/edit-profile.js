const { User } = require("../../models");

async function editProfile({
    userId,
    profilePicture,
    cardNumber,
    monthlyLimit,
}) {
    const user = await User.findByIdAndUpdate(
        userId,
        {
            $set: { profilePicture, cardNumber, monthlyLimit },
        },
        { new: true }
    ).exec();

    return {
        profilePicture: user.profilePicture,
        cardNumber: user.cardNumber,
        monthlyLimit: user.monthlyLimit,
    };
}

module.exports = {
    editProfile,
};
