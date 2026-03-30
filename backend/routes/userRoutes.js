const express = require("express");
const userRouter = express.Router();

const sanitizeRegisterInput = require("../middlewares/userInputValidation/validateRegisterInput");
const registerUser = require("../controllers/users/registerUser");

const sanitizeLoginInput = require("../middlewares/userInputValidation/validateLoginInput");
const loginUser = require("../controllers/users/loginUser");

userRouter.get("/", (req, res) => {
  return res.status(200).json({ message: "You are in user route" });
});

userRouter.post("/register", sanitizeRegisterInput, registerUser);
userRouter.post("/login", sanitizeLoginInput, loginUser);

module.exports = userRouter;
