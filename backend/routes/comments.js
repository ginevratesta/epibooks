const express = require("express");
const router = express.Router();
const commentController = require("../controller/commentsController");

router.get("/getBlogs/:id/comments", commentController.getAllComments);

router.get("/getBlogs/:id/comments/:commentId", commentController.getCommentById);

router.post("/postBlog/:id", commentController.postNewComment);

router.patch("/updateBlog/:id/comments/:commentId", commentController.patchComment);





module.exports = router;
