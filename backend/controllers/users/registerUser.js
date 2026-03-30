const bcrypt = require("bcryptjs");

const { Op } = require("sequelize");
const { User } = require("../../model/");

const registerUser = async (req, res) => {
  console.log(req.body);
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ username: username }, { email: email }],
      },
    });

    if (existingUser) {
      if (existingUser.username === username) {
        return res
          .status(400)
          .json({ success: false, message: "Username already Taken  " });
      }

      if (existingUser.email === email) {
        return res.status(400).json({
          success: false,
          message: "User with provided email alredy registered",
        });
      }
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password_hash: hashedPassword,
    });

    return res
      .status(200)
      .json({ success: true, message: "User registered sucessfully" });
  } catch (error) {
    console.error("Error Occured while registering User ", error);
    return res.status(500).json({ message: "Internal Server Error " });
  }
};

module.exports = registerUser;
