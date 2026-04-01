const { Model } = require("sequelize");
const { Post } = require("../../model/");

const postDetails = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await Post.findByPk(postId);

    if (!post)
      return res
        .status(400)
        .json({ success: true, message: "Failed to find post " });

    return res
      .status(200)
      .json({ success: true, message: "Post found", data: post });
  } catch (error) {
    console.error("Failed to load post info", error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Failed to load post. Internal server error ",
      });
  }
};

module.exports =postDetails