const { Post } = require("../../model/");

const updateMyPost = async (req, res) => {
  const { post_id, title, body } = req.body;
  const user = req.user;

  try {
    const [updatedPostCount] = await Post.update(
      {
        title,
        body,
      },
      {
        where: {
          id: post_id,
          user_id: user.id,
        },
      },
    );

    if (updatedPostCount === 0)
      return res
        .status(400)
        .json({ success: false, message: "No post found or not authorized" });

    return res
      .status(200)
      .json({ success: true, message: "Successfully updated post" });
  } catch (error) {
    console.error("Failed to update post:", error);
    return res.status(500).json({
      success: false,
      message: "Failled to update post. Internal server error ",
    });
  }
};

module.exports = updateMyPost;
