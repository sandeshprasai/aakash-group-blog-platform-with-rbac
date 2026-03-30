const jwt = require("jsonwebtoken");

const validateToken = async (req, res) => {
  const accessToken = req.cookies.AccessToken;

  if (!accessToken) {
    return res
      .status(400)
      .json({ success: false, message: "Unauthorized access" });
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error " });
  }
};

module.exports = validateToken;
