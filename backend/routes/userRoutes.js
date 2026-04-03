const express = require("express");
const userRouter = express.Router();

const sanitizeRegisterInput = require("../middlewares/userInputValidation/validateRegisterInput");
const registerUser = require("../controllers/users/registerUser");

const sanitizeLoginInput = require("../middlewares/userInputValidation/validateLoginInput");
const loginUser = require("../controllers/users/loginUser");

const getCurrentUser = require("../controllers/users/getCurrentUser");
const decodeToken = require("../middlewares/RoleBaseAccessTokenCheck/validateRoleFromToken");

const refreshToken   = require("../middlewares/refreshToken/refreshToken")

const logout = require("../controllers/users/logout");
const { ref } = require("joi");

userRouter.get("/", (req, res) => {
  return res.status(200).json({ message: "You are in user route" });
});

userRouter.get("/me", decodeToken, getCurrentUser);

userRouter.post("/register", sanitizeRegisterInput, registerUser);
userRouter.post("/login", sanitizeLoginInput, loginUser);
userRouter.post("/logout", logout);
userRouter.post("/refresh-token",refreshToken)
module.exports = userRouter;
