const router = require("express").Router();
const Session = require("../../models/Session");

//get route for all sessions
router.get("/", async (req, res) => {
  try {
    const sessionData = await Session.findAll();
    res.status(200).json(sessionData);
    console.log("session request");
    res.render("session");
  } catch (err) {
    res.status(500).json(err);
    console.log("session request failed");
  }
});

//get route for sessions by id
router.get("/:id", async (req, res) => {
  try {
    const sessionData = await Session.findByPk(req.params.id, {});

    if (!sessionData) {
      res.status(404).json({ message: "No session found with that id!" });
      return;
    }

    res.status(200).json(sessionData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//post route to make a new session
router.post("/", async (req, res) => {
  Session.create(req.body)
    .then((session) => {
      res.status(200).json(session);
      console.log("session creation success");
    })
    .then((sessionIds) => {
      res.status(200).json(sessionIds);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

//put route to update  sessions
router.put("/:id", async (req, res) => {
  // update product data
  try {
    // Update sessions data
    await Session.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    return res.sendStatus(200);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: "Failed to update the Session." });
  }
});

module.exports = router;
