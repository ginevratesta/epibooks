const Comment = require("../models/comments");

exports.getAllComments = async (req, res) => {
  const { id } = req.params;
  try {
    const comments = await Comment.find({ blog: id });
    if (!comments.length) {
      return res.status(404).send({
        statusCode: 404,
        message: "Comments not found",
      });
    }

    res.status(200).send(comments);
  } catch (e) {
    console.error("Error fetching comments:", e);
    res.status(500).send({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};

exports.getCommentById = async (req, res) => {
  const { id, commentId } = req.params;
  try {
    const comment = await Comment.findOne({ _id: commentId, blog: id });
    if (!comment) {
      return res.status(404).send({
        statusCode: 404,
        message: "Comment not found",
      });
    }

    res.status(200).send(comment);
  } catch (e) {
    console.error("Error fetching comment:", e);
    res.status(500).send({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};

exports.postNewComment = async (req, res) => {
  const { id } = req.params; 

  const newComment = new Comment({
    user: req.body.user,
    comment: req.body.comment,
    date: Date.now(),
    blog: id 
  });

  try {
    const commentToSave = await newComment.save();

    res.status(201).json({
      statusCode: 201,
      payload: commentToSave,
      message: "Comment successfully posted"
    });
  } catch (e) {
    console.error("Error saving comment:", e);
    res.status(500).json({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
}

exports.patchComment = async (req, res) => {
  const { id, commentId } = req.params;

  try {
    const updatedComment = await Comment.findByIdAndUpdate(commentId, req.body, { new: true });
    res.status(200).send(updatedComment);
  } catch (error) {
    console.error("Error updating comment:", error);
    res.status(500).send({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};
