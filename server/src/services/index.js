const { loginUser } = require("./use-cases/login-user.js");
const { refreshToken } = require("./use-cases/refresh-token.js");
const { registerUser } = require("./use-cases/register-user.js");
const { showProfile } = require("./use-cases/show-profile.js");
const { editProfile } = require("./use-cases/edit-profile.js");
const { forgotPassword } = require("./use-cases/forgot-password.js");
const { resetPassword } = require("./use-cases/reset-password.js");
const { addTransaction } = require("./use-cases/add-transaction.js");
const { getTransactions } = require("./use-cases/get-transactions.js");

const UserService = {
    loginUser,
    registerUser,
    refreshToken,
    showProfile,
    editProfile,
    forgotPassword,
    resetPassword,
    addTransaction,
    getTransactions,
};
module.exports = {
    UserService,
};
