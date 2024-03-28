const express = require("express");
const router = express.Router();
const commentController = require("../controller/commentsController");

router.post("/comment/:blogId", commentController.postComment);

router.get("/comments", commentController.getAllComments);

router.get("/comment/:blogIid", commentController.getCommentById);

module.exports = router;
