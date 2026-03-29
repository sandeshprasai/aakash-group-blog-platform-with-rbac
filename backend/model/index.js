const users = require("./users")(sequelize);
const post = require("./posts")(sequelize);
const comments = require("./comments")(sequelize);

users.hasMany(post, { foreignKey: "user_id", onDelete: "CASCADE" });
post.belongsTo(users, { foreignKey: "user_id" });

post.hasMany(comments, { foreignKey: "post_id", onDelete: "CASCADE" });
comments.belongsTo(post, { foreignKey: "post_id" });

users.hasMany(comments, { foreignKey: "user_id", onDelete: "CASCADE" });
comments.belongsTo(users, { foreignKey: "user_id" });
