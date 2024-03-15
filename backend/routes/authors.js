const express = require("express");
const router = express.Router();
const authorModel = require("../models/authors");

router.get("/getAuthors", async (req, res) => {
  try {
    const authors = await authorModel.find();
    res.status(200).send(authors);
  } catch (e) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
});

router.post("/createAuthor", async (req, res) => {
  const newAuthor = new authorModel({
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    birthday: req.body.birthday,
    avatar: req.body.avatar,
  });

  try {
    const authorToSave = await newAuthor.save();
    res.status(201).send({
      statusCode: 201,
      payload: authorToSave,
    });
  } catch (e) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
});


router.get("/getAuthor/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const author = await authorModel.findById(id);

    if (!author) {
      return res.status(404).send({
        statusCode: 404,
        message: "The request author does not exist!",
      });
    }
    res.status(200).send(author);
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
});

router.patch("/updateAuthor/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const author = await authorModel.findById(id);

    if (!author) {
      return res.status(404).send({
        statusCode: 404,
        message: "The request author does not exist!",
      });
    }

    const updatedData = req.body;
    const options = { new: true };

    const results = await authorModel.findByIdAndUpdate(
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


router.delete("/deleteAuthor/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const author = await authorModel.findByIdAndDelete(id);

    if (!author) {
      return res.status(404).send({
        statusCode: 404,
        message: 'The request author does not exist',
      });
    }

    res.status(200).send('The author has been removed');
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
});




module.exports = router;