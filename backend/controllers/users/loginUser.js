
const bcrypt = require("bcryptjs");
const {User} = require("../../model/");
const jwt = require("jsonwebtoken");

const loginController = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({
      where: {
        username,
      },
    });

    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });

    const matchPassword = await bcrypt.compare(password, user.password_hash);

    if (!matchPassword)
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });

    const tokenPayload = {
      id: user.id,
      username: user.username,
      role: user.role,
    };

    const accessToken = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: process.env.ACCESS_EXPIRY,
    });

    const refreshToken = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: process.env.REFRESH_EXPIRY,
    });

    res.cookie("AccessToken", accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: Number(process.env.ACCESS_COOKIE_EXPIRY),
    });
    res.cookie("RefreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: Number(process.env.REFRESH_COOKIE_EXPIRY),
    });

    res.status(200).json({ success: true, message: "Login Successfull" });
  } catch (error) {
    console.error("Failled to login:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error " });
  }
};

module.exports = loginController;
