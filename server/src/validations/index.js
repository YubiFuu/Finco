const { loginUserValidation } = require("./login-user-validation");
const { registerUserValidation } = require("./register-user-validation");

const UserValidations = {
    loginUserValidation,
    registerUserValidation,
};

module.exports = {
    UserValidations,
};
