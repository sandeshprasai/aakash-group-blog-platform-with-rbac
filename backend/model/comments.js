const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Comment = sequelize.define(
    "Comment",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      post_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "posts",
          key: "id",
        },
      },

      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },

      body: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: "comments",
      timestamps: true,
    },
  );

  return Comment;
};
