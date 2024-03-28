const express = require("express");
const router = express.Router();
const commentController = require("../controller/commentsController");

router.get("/getBlogs/:id/comments", commentController.getAllComments);

router.get("/getBlogs/:id/comments/:commentId", commentController.getCommentById);





module.exports = router;
