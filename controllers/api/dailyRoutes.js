const router = require("express").Router();
const Daily = require("../../models/Daily");
const User = require("../../models/User");

//get route for all daily logs
router.get("/", async (req, res) => {
  try {
    const dailyData = await Daily.findAll();
    res.status(200).json(dailyData);
    console.log("Daily Log request");
    res.render("daily");
  } catch (err) {
    res.status(500).json(err);
    console.log("tag request failed");
  }
});

//get route for daily logs by id
router.get("/:id", async (req, res) => {
  try {
    const dailyData = await Daily.findByPk(req.params.id, {});

    if (!dailyData) {
      res.status(404).json({ message: "No daily log found with that id!" });
      return;
    }

    res.status(200).json(dailyData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get route for daily logs by user
router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const daily = await Daily.findAll({
      where: { userId },
    });

    res.json(daily);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//post route to make a new daily log
router.post("/", async (req, res) => {
  Daily.create(req.body)
    .then((daily) => {
      res.status(200).json(daily);
      console.log("daily creation success");
    })
    .then((dailyIds) => {
      res.status(200).json(dailyIds);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

//put route to updated daily logs
router.put("/:id", async (req, res) => {
  // update product data
  try {
    // Update daily logs data
    await Daily.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    return res.sendStatus(200);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: "Failed to update the daily log." });
  }
});

module.exports = router;
