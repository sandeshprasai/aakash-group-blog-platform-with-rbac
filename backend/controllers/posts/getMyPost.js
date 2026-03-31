const { where } = require("sequelize");
const { User, Post } = require("../../model/");

const getMyPosts = async (req, res) => {
  const userId = req.user.id;

  try {
    const userExists = await User.findOne({
      where: {
        id: userId,
      },
    });

    if (!userExists)
      return res.status(400).json({ success: false, message: "Invalid User" });

    const myPosts = await Post.findAll({
      where: {
        user_id: userExists.id,
      },
    });

  

    return res
      .status(200)
      .json({ success: true, message: "My Posts", data: myPosts });
  } catch (error) {
    console.error("Failled to load Post", error);
    return res.status(500).json({
      success: false,
      message: "Failled to load Message.Internal Server error",
    });
  }
};

module.exports = getMyPosts;
