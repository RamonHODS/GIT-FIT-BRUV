const router = require("express").Router();
const Goal = require("../../models/Goal");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const goalData = await Goal.findAll();
    res.status(200).json(goalData);
    console.log("goal request");
    res.render("goals");
  } catch (err) {
    res.status(500).json(err);
    console.log("tag request failed");
  }
});

module.exports = router;
