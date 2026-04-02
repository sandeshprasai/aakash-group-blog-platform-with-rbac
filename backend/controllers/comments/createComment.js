const { Comment } = require("../../model/");

const createComment = async (req, res) => {
  const postId = req.body.post_id;
  const comment = req.body.comment;
  const userId = req.user.id;

  if (!postId || !comment) {
    return res.status(400).json({
      success: false,
      message: "Post ID and comment are required",
    });
  }

  try {
    const newComment = await Comment.create({
      post_id: postId,
      user_id: userId,
      body: comment,
    });

    return res.status(201).json({
      success: true,
      message: "Comment created successfully",
      data: newComment,
    });
  } catch (error) {
    console.error("Error creating comment:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create comment. Internal server error",
    });
  }
};

module.exports = createComment;
