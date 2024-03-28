const Comment = require("../models/comments");
const Blog = require("../models/blogs");

exports.getAllComments = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id);
    const comment = await Comment.find(blog.comments);

    if (!comment) {
      return res.status(404).send({
        statusCode: 404,
        message: "Comments not found",
      });
    }

    res.status(200).send(comment);
  } catch (e) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};



exports.getCommentById = async (req, res) => {
    const {id, commentId} = req.params;
try{
    const blog = await Blog.findById(id);

    if (!blog){
        res.status(404).send({
            statusCode: 404,
            message: "Blog not found"
        })
    }

    const comment = await Comment.findById(commentId);

    if(!comment){
      re.status(404).send({
        statusCode: 404,
        message: "Comment not found"
      })
    }


    res.status(200).send(comment);

}catch(e){
    res.status(500).send({
        statusCode: 500,
        message: "Internal Server Error"
    })
}
    



};
