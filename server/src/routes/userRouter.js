const multer = require("multer");
const express = require("express");
const { userController } = require("../controllers");
const { makeAuthMiddleware } = require("../middleware/doAuth");
const { UserValidations } = require("../validations");
const { validate } = require("../middleware/validate");

const userRouter = express.Router();

userRouter.post(
    "/login",
    validate(UserValidations.loginUserValidation.body),
    userController.postLogin
);
userRouter.post(
    "/register",
    validate(UserValidations.registerUserValidation.body),
    userController.postRegister
);
userRouter.post(
    "/refresh-token",
    makeAuthMiddleware({ tokenType: "refresh" }),
    userController.postRefreshToken
);

userRouter.post("/logout", (req, res) => {
    req.session.refreshToken = null; // delete refresh token
    res.json({ status: "ok", result: {} });
});

userRouter.post(
    "/new-transaction",
    makeAuthMiddleware({ tokenType: "access" }),
    userController.postNewTransaction
);

userRouter.get(
    "/all-transactions",
    makeAuthMiddleware({ tokenType: "access" }),
    userController.getAllTransactions
);

userRouter.get(
    "/profile",
    makeAuthMiddleware({ tokenType: "access" }),
    userController.getShowProfile
);

userRouter.put(
    "/profile",
    makeAuthMiddleware({ tokenType: "access" }),
    multer({ dest: "imageUploads" }).single("profilePicture"), // multipart/form-data!
    userController.putEditProfile
);

userRouter.post("/forgot-password", userController.postForgotPassword);
userRouter.post(
    "/reset-password",
    makeAuthMiddleware({ tokenType: "password-reset" }),
    userController.postResetPassword
);

module.exports = userRouter;
