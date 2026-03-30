const { sequelize } = require("./model/index");
const connectDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected!");
  } catch (err) {
    console.error("Unable to connect:", err);
  }
};

module.exports = connectDb;
