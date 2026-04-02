const { Post, Comment, User } = require("../../model/");

const getAllComment = async (req, res) => {
  const postID = req.params.id;

  if (!postID)
    return res
      .status(400)
      .json({ success: false, message: "Post id is required" });

  try {
    const fetchedComments = await Comment.findAll({
      where: { post_id: postID },
      include: [
        {
          model: User,
          as: "commenter",
          attributes: ["id", "username"],
        },
      ],
      raw: true,
      nest: true, 
    });

    return res.status(200).json({
      success: true,
      message: "Comment fetched successfully",
      data: fetchedComments,
    });
  } catch (error) {
    console.error("Failed to fetch comments ", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch comment.Internal server error",
    });
  }
};
module.exports = getAllComment;
