const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },

    surname: {
      type: String,
    },

    email: {
      type: String,
    },

    birthday: {
      type: String,
    },

    avatar: {
      type: String,
    },
  },
  { timestamps: true, strict: true }
);

module.exports = mongoose.model("authorModel", AuthorSchema, "authors");
