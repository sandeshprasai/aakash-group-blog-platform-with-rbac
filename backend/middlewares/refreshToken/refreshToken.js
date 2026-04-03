const jwt = require("jsonwebtoken");
const { User } = require("../../model/");

const refreshToken = async (req, res) => {
  const token = req.cookies.RefreshToken;
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "No refresh token found" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findbyPk(decoded.id);

    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "User not found " });

    const newAccessToken = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.ACCESS_EXPIRY },
    );

    res.cookie("AccessToken", newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: Number(process.env.REFRESH_COOKIE_EXPIRY),
    });
    return res.status(200).json({ success: true });
  } catch (error) {
    res.clearCookie("RefreshToken");
    return res.status(403).json({
      success: false,
      message: "Refresh Token expired please login again",
    });
  }
};

module.exports = refreshToken;
