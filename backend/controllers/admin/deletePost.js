
const { Post } = require("../../model/");

const deletePostByAdmin = async (req, res) => {
  const postId = req.params.id;

  try {
    if (!postId)
      return res
        .status(400)
        .json({ success: false, message: "Post Id is required" });

    const deletedCount = await Post.destroy({
      where: {
        id: postId,
      },
    });

    if (deletedCount === 0)
      return res.status(404).json({
        success: false,
        message: "No post deleted. Post not found. Try again later",
      });

    return res
      .status(200)
      .json({ success: true, message: "Post deleted successfully" });
  } catch (error) {
    console.error("Failed to delete post", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete post. Internal server error",
    });
  }
};

module.exports=deletePostByAdmin