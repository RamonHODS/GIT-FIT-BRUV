const express = require("express");
const router = express.Router();

const checkAuthenticated = (req, res, next) => {
  if (req.session.logged_in) {
    next();
  } else {
    res.redirect("/nonauth");
  }
};

router.get("/login", checkAuthenticated, (req, res) => {
  res.render("login");
});

router.get("/nonauth", (req, res) => {
  res.render("nonauth");
});

router.get("/homepage", checkAuthenticated, (req, res) => {
  res.render("homepage");
});

router.get("/goals", (req, res) => {
  res.render("goals");
});

module.exports = router;
