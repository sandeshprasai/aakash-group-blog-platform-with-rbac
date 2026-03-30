const { Post } = require("../../model");

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    return res.status(200).json({
      success: false,
      message: "All post fetched Successfully",
      data: posts,
    });
  } catch (error) {
    console.error("Failled to fetch Post", error);
  }
};

module.exports = getAllPosts;
