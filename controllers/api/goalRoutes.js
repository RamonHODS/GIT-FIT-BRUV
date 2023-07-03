const router = require("express").Router();
const Goal = require("../../models/Goal");
const User = require("../../models/User");

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

// Get route for goals by user
router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const goals = await Goal.findAll({
      where: { userId },
    });

    res.json(goals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
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
