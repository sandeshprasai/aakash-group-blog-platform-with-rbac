const { Op } = require("sequelize");
const { User } = require("../../model/");
const bcrypt = require("bcryptjs");

const seedAdmin = async () => {
  const admin_username = process.env.ADMIN_USERNAME;
  const admin_plain_password = process.env.ADMIN_PASSWORD;
  const admin_email = process.env.ADMIN_EMAIL;

  if (!admin_username || !admin_plain_password || !admin_email) {
    console.log("Missing admin credentials in environment variables");
    return;
  }

  try {
    const existingAdminUser = await User.findOne({
      where: {
        [Op.or]: [{ username: admin_username }, { email: admin_email }],
      },
    });

    if (existingAdminUser) {
      if (existingAdminUser.username === admin_username) {
        console.log("Username already Taken");
        return;
      }

      if (existingAdminUser.email === admin_email) {
        console.log("Email already taken ");
        return;
      }
    }

    const hashedPassword = await bcrypt.hash(admin_plain_password, 10);

    const newUser = await User.create({
      username: admin_username,
      email: admin_email,
      password_hash: hashedPassword,
      role: "admin",
    });
    if (!newUser) {
      console.log("Failed to create admin user");
      return;
    }

    console.log("Admin created successfully");
    return;
  } catch (error) {
    console.log("Error while creating admin user");
    return;
  }
};

module.exports = seedAdmin;
