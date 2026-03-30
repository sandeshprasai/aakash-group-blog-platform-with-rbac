const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  port: process.env.DB_PORT || 5432,
  dialect: process.env.DB_DIALECT, //
  logging: false,
  dialetOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  define: {
    freezeTableName: true,
    underscored: true,
  },
  define: {
    freezeTableName: true,
    underscored: true,
  },
});

module.exports = sequelize;
