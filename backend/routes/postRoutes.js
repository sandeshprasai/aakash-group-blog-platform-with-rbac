const express = require("express");
const postRouter = express.Router();

const sanitizeBlogInput = require("../middlewares/blogValidation/sanitizeBlogInput");
const decodeToken = require("../middlewares/RoleBaseAccessTokenCheck/validateRoleFromToken");

const cretePost = require("../controllers/posts/createPost");
const getAllPosts = require("../controllers/posts/getAllposts");
const getMyPosts = require("../controllers/posts/getMyPost");
const deletePost = require("../controllers/posts/deletePost");

postRouter.post("/create", decodeToken, sanitizeBlogInput, cretePost);

postRouter.get("/all", decodeToken, getAllPosts);
postRouter.get("/myPosts", decodeToken, getMyPosts);
postRouter.delete("/myPosts/:id", decodeToken, deletePost);

module.exports = postRouter;
