const logout = (req, res) => {
  res.clearCookie("AccessToken", {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  });
  res.clearCookie("RefreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  });
  res.json({ message: "Logged Out Successfully" });
};
module.exports = logout;
