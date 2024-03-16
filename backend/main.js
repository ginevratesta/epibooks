const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const PORT = 3030;

const app = express();

app.use(cors());

const authorsRoute = require("./routes/authors");

const blogsRoute = require("./routes/blogs");

app.use(express.json());

app.use("", authorsRoute);

app.use("", blogsRoute);

mongoose.connect(process.env.MONGODB_URL);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Database connection error"));

db.once("open", () => {
  console.log("Database successfully connected");
});

app.listen(PORT, () => console.log(`Server connected to PORT: ${PORT}`));
