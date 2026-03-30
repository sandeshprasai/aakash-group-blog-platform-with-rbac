const { Post } = require("../../model/");
const { User } = require("../../model/");

const createBlog = async (req, res) => {
  console.log("Request Received at controller")
  console.log(req.body)
  const { title, body } = req.body;

  const userId = req.user.id;
  try {
    const isValidUser = await User.findOne({
      where: {
        id: userId,
      },
    });

    if (!isValidUser)
      return res.status(400).json({ success: false, message: "Invalid User " });

    const newPost = await Post.create({
      user_id: isValidUser.id,
      title: title,
      body: body,
    });

    return res
      .status(201)
      .json({ success: true, message: "Post created Successfully" });
  } catch (error) {
    console.error("Failed to create post:", error);
    return res.status(500).json({
      success: false,
      message: "Failled to create post. Internal Server Error",
    });
  }
};

module.exports = createBlog;
