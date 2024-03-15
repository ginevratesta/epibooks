const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = 3030;

const app = express();

const authorsRoute = require("./routes/authors");

app.use(express.json());

app.use("", authorsRoute);

mongoose.connect(process.env.MONGODB_URL);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Database connection error"));

db.once("open", () => {
  console.log("Database successfully connected");
});

app.listen(PORT, () => console.log(`Server connected to PORT: ${PORT}`));
