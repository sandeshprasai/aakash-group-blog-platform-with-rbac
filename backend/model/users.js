const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
          len: [3, 50],
        },
      },

      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },

      password_hash: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      role: {
        type: DataTypes.ENUM("admin", "user"),
        defaultValue: "user",
      },
    },
    {
      tableName: "users",
      timestamps: true,
    },
  );

  return User;
};
