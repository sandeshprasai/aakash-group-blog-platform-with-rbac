const express = require("express");
const postRouter = express.Router();



const sanitizeBlogInput = require("../middlewares/blogValidation/sanitizeBlogInput");
const decodeToken = require("../middlewares/RoleBaseAccessTokenCheck/validateRoleFromToken");


const cretePost = require("../controllers/posts/createPost");
const getAllPosts = require("../controllers/posts/getAllposts");

postRouter.post("/create", decodeToken, sanitizeBlogInput, cretePost);

 
postRouter.get("/all", decodeToken, getAllPosts);

module.exports = postRouter;
