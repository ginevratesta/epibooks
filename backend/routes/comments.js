const express = require("express");
const router = express.Router();
const commentController = require("../controller/commentsController");

router.get("/getComments/:id/comments", commentController.getAllComments);

router.get("/getComments/:id/comments/:commentId", commentController.getCommentById);

router.post("/postComment/:id", commentController.postNewComment);

router.patch("/updateComment/:id/comments/:commentId", commentController.patchComment);





module.exports = router;
