const { Post } = require("../../model");

const getAllPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const offset = (page - 1) * limit;

    const { count, rows } = await Post.findAndCountAll({
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      success: true,
      message: "All post fetched Successfully",
      data: rows,
      pagination: {
        totalPosts: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        limit,
      },
    });
  } catch (error) {
    console.error("Failled to fetch Post", error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Failed to fetch post.Internal server error",
      });
  }
};

module.exports = getAllPosts;
