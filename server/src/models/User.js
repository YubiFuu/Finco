const mongoose = require("mongoose");

const avatarPlaceHolder =
    "https://hszteam.de/wp-content/uploads/2021/01/avatar-placeholder.gif";

const userSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        profilePicture: { type: String, default: avatarPlaceHolder },
        cardNumber: { type: String, default: "000" },
        monthlyLimit: { type: Number, required: false },
        passwordHash: { type: String, required: true },
        passwordSalt: { type: String, required: true },
        transaction: [
            {
                amount: { type: String, required: true },
                typeTransaction: { type: String, required: true },
                category: { type: String, required: true },
                dateAt: { type: String, required: true },
                timeAt: { type: String, required: true },
            },
        ],
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);
module.exports = User;