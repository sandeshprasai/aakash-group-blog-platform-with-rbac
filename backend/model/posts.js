const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Post = sequelize.define(
    "Post",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },

      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      body: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: "posts",
      timestamps: true,
    }
  );

  return Post;
};