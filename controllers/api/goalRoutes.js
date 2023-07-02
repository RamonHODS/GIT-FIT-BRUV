const router = require("express").Router();
const Goal = require("../../models/Goal");

//get route for all goals
router.get("/", async (req, res) => {
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

//get route for goals by id
router.get("/:id", async (req, res) => {
  try {
    const goalData = await Goal.findByPk(req.params.id, {});

    if (!goalData) {
      res.status(404).json({ message: "No goal found with that id!" });
      return;
    }

    res.status(200).json(goalData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//post route to make a new goal
router.post("/", async (req, res) => {
  Goal.create(req.body)
    .then((goal) => {
      res.status(200).json(goal);
      console.log("goal creation success");
    })
    .then((goalIds) => {
      res.status(200).json(goalIds);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

module.exports = router;
