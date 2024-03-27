const express = require("express");
const router = express.Router();

const emailController = require("../controller/emailsController")

router.post("/sendEmail", emailController.sendEmail );

module.exports = router;
