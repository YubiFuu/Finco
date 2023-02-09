const Joi = require("joi");

const body = Joi.object({
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
});

module.exports = {
    registerUserValidation: {
        body,
    },
};
