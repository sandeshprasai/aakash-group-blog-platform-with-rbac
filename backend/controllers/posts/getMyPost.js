const { where } = require("sequelize");
const { User, Post } = require("../../model/");

const getMyPosts = async (req, res) => {
  const userId = req.user.id;

  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const offset = (page - 1) * limit;

    const userExists = await User.findOne({
      where: {
        id: userId,
      },
    });

    if (!userExists)
      return res.status(400).json({ success: false, message: "Invalid User" });

    const { count, rows } = await Post.findAndCountAll({
      limit,
      offset,
      where: {
        user_id: userExists.id,
      },
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      success: true,
      message: "My Posts",
      data: rows,
      pagination: {
        totalPosts: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        limit,
      },
    });
  } catch (error) {
    console.error("Failled to load Post", error);
    return res.status(500).json({
      success: false,
      message: "Failled to load Message.Internal Server error",
    });
  }
};

module.exports = getMyPosts;
