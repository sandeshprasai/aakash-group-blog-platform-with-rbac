const sequelize = require("../config/database");

const User = require("./users")(sequelize);
const Post = require("./posts")(sequelize);
const Comment = require("./comments")(sequelize);

User.hasMany(Post, { foreignKey: "user_id", onDelete: "CASCADE", as: "posts" });
Post.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE", as: "author" });

Post.hasMany(Comment, { foreignKey: "post_id", onDelete: "CASCADE", as: "comments" });
Comment.belongsTo(Post, { foreignKey: "post_id", onDelete: "CASCADE", as: "post" });

User.hasMany(Comment, { foreignKey: "user_id", onDelete: "CASCADE", as: "comments" });
Comment.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE", as: "commenter" });

sequelize.sync({ alter: true });

module.exports = {
  sequelize,
  User,
  Post,
  Comment,
};