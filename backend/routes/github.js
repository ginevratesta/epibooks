const express = require("express");
const github = express.Router();
const GithubStrategy = require("passport-github2").Strategy;
const jwt = require("jsonwebtoken");
const passport = require("passport");
const session = require("express-session");
require("dotenv").config();

github.use(
  session({
    secret: process.env.GITHUB_CLIENT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

passport.use(passport.initialize());
passport.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHHUB_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

github.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  (req, res) => {
    const user = req.user;
    const redirectUrl = `http://localhost:3000/success?user=${JSON.stringify(user)}`;
    res.redirect(redirectUrl);
  }
);

github.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    const user = req.user;
    const token = jwt.sign(user, process.env.SECRET_KEY);

    const redirectUrl = `http://localhost:3000/success?token=${token}`;
    res.redirect(redirectUrl);
  }
);

github.get("/success", (req, res) => {
  res.redirect("/home");
});

module.exports = github;
