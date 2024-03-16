const express = require("express");
const router = express.Router();
const blogModel = require("../models/blogs");

router.get("/getblogs", async (req, res) => {
  try {
    const blogs = await blogModel.find();
    res.status(200).send(blogs);
  } catch (e) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
});

router.post("/createBlog", async (req, res) => {
  const newBlog = new blogModel({
    category: req.body.category,
    title: req.body.title,
    cover: req.body.cover,
    readTime: req.body.readTime,
    author: req.body.author,
    content: req.body.content
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
});


router.get("/getBlog/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await blogModel.findById(id);

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
});

router.patch("/updateBlog/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await blogModel.findById(id);

    if (!blog) {
      return res.status(404).send({
        statusCode: 404,
        message: "The request blog does not exist!",
      });
    }

    const updatedData = req.body;
    const options = { new: true };

    const results = await blogModel.findByIdAndUpdate(
      id,
      updatedData,
      options
    );

    res.status(200).send(results);
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
});


router.delete("/deleteBlog/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await blogModel.findByIdAndDelete(id);

    if (!blog) {
      return res.status(404).send({
        statusCode: 404,
        message: 'The request blog does not exist',
      });
    }

    res.status(200).send('The blog has been removed');
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
});




module.exports = router;