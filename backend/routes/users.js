const express = require("express");
const router = express.Router();
const userController = require("../controller/usersController");

router.post("/signup", userController.postUser);

router.get("/user/:email", userController.checkUser);

module.exports = router;
