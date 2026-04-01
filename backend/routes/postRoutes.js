const express = require("express");
const postRouter = express.Router();

const sanitizeBlogInput = require("../middlewares/blogValidation/sanitizeBlogInput");
const decodeToken = require("../middlewares/RoleBaseAccessTokenCheck/validateRoleFromToken");
const sanitizeUpdateBlog = require("../middlewares/blogValidation/sanitizeUpdateBlog");

const cretePost = require("../controllers/posts/createPost");
const getAllPosts = require("../controllers/posts/getAllposts");
const getMyPosts = require("../controllers/posts/getMyPost");
const deletePost = require("../controllers/posts/deletePost");
const updatePost = require("../controllers/posts/updateMyPost");

const postDetail = require("../controllers/posts/postDetails");

postRouter.post("/create", decodeToken, sanitizeBlogInput, cretePost);

postRouter.get("/all", decodeToken, getAllPosts);
postRouter.get("/my-posts", decodeToken, getMyPosts);
postRouter.get("/all/:id", decodeToken, postDetail);

postRouter.delete("/my-post/:id", decodeToken, deletePost);

postRouter.put("/update-my-post", decodeToken, sanitizeUpdateBlog, updatePost);

module.exports = postRouter;
