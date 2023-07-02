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

router.get("/active", (req, res) => {
  // Fetch all goals from the database
  Goal.findAll()
    .then((goals) => {
      // Filter active goals
      const activeGoals = goals.filter((goal) => goal.status === "active");

      // Send the filtered active goals as a response
      res.json(activeGoals);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Failed to fetch goals" });
    });
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

//put route to updated goal
router.put("/:id", async (req, res) => {
  // update product data
  try {
    // Update goal data
    await Goal.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    return res.sendStatus(200);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: "Failed to update the goal." });
  }
});

module.exports = router;
