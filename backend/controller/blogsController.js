const BlogModel = require("../models/blogs");

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await BlogModel.find();
    res.status(200).send(blogs);
  } catch (e) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};

exports.postBlog = async (req, res) => {
  const newBlog = new BlogModel({
    category: req.body.category,
    title: req.body.title,
    cover: req.body.cover,
    readTime: req.body.readTime,
    author: req.body.author,
    content: req.body.content,
  });

  try {
    const blogToSave = await newBlog.save();
    res.status(201).send({
      statusCode: 201,
      payload: blogToSave,
    });
  } catch (e) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};

exports.getBlogById = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await BlogModel.findById(id);

    if (!blog) {
      return res.status(404).send({
        statusCode: 404,
        message: "The request blog does not exist!",
      });
    }
    res.status(200).send(blog);
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};

exports.patchBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await BlogModel.findById(id);

    if (!blog) {
      return res.status(404).send({
        statusCode: 404,
        message: "The request blog does not exist!",
      });
    }

    const updatedData = req.body;
    const options = { new: true };

    const results = await BlogModel.findByIdAndUpdate(id, updatedData, options);

    res.status(200).send(results);
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};

exports.deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await BlogModel.findByIdAndDelete(id);

    if (!blog) {
      return res.status(404).send({
        statusCode: 404,
        message: "The request blog does not exist",
      });
    }

    res.status(200).send("The blog has been removed");
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};
