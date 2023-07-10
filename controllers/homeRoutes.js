const express = require("express");
const router = express.Router();

router.get("/homepage", (req, res) => {
  res.render("homepage");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/nonauth", (req, res) => {
  res.render("nonauth");
});

router.get("/goals", (req, res) => {
  res.render("goals");
});

module.exports = router;
