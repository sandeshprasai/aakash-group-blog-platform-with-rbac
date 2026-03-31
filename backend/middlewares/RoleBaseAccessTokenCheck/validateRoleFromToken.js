const jwt = require("jsonwebtoken");

const validateToken = async (req, res, next) => {
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
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error ", error });
  }
};

module.exports = validateToken;
