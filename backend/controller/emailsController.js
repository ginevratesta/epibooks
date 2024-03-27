const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: process.env.USER_,
      pass: process.env.PASS,
    },
  });

exports.sendEmail = async (req, res) => {
  const { recipient, subject, text } = req.body;

  const mailOptions = {
    from: "email@email.com",
    to: recipient,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      res.status(404).send({
        statusCode: 404,
        message: "Email not found",
      });
    } else {
      console.log("Email inviata");
      res.send("Email sent successfully");
    }
  });
};
