const express = require("express");
const adminRouter = express.Router();

const decodeToken = require("../middlewares/RoleBaseAccessTokenCheck/validateRoleFromToken");
const isAdmin = require("../middlewares/RoleBaseAccessTokenCheck/isAAdminCheck");

const getAllposst = require("../controllers/posts/getAllposts");
const deletePost = require("../controllers/admin/deletePost");

adminRouter.get("/posts", decodeToken, isAdmin, getAllposst);
adminRouter.delete("/posts/:id", decodeToken, isAdmin, deletePost);

module.exports = adminRouter;
