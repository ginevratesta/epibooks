const mongoose = require("mongoose");

const BlogsSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    cover: {
      type: String,
      required: true,
    },

    readTime: {
      type: Number,
      required: true,
    },

    author: {
      cover: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      }
    },

    content: {
      type: String,
      required: true
    },

    comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    }]
  },
  { timestamps: true, strict: true }
);


module.exports = mongoose.model("Blog", BlogsSchema, "blogs");

