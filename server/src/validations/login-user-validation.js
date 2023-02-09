const Joi = require("joi");

const body = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
});

module.exports = {
    loginUserValidation: {
        body,
    },
};
