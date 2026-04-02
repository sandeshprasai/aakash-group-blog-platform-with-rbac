const express = require("express");
const commentRouter = express.Router();

const getAllComments = require("../controllers/comments/getAllComments");
const createComments = require("../controllers/comments/createComment");

const decodeToken = require("../middlewares/RoleBaseAccessTokenCheck/validateRoleFromToken");
const sanitizeComment = require("../middlewares/comments/sanitizeComment");

commentRouter.get("/get/:id", decodeToken, getAllComments);
commentRouter.post("/create", decodeToken, sanitizeComment, createComments);

module.exports = commentRouter;
