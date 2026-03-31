const { where } = require("sequelize");
const { Post, User } = require("../../model/");

const deletePost = async (req, res) => {
  const post_id  = req.params.id;
  const user = req.user;

  try {
        const deleteCount = await Post.destroy({
      where: {
        id: post_id,
        user_id: user.id,
      },
    });

    if (deleteCount === 0) {
      return res.status(400).json({
        success: false,
        message: "Post not found or not allowed to delete",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.error("Failed to delete post:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete post. Internal server error",
    });
  }
};

module.exports = deletePost;
