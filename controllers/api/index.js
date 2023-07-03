const router = require("express").Router();

const userRoutes = require("./userRoutes");
const goalRoutes = require("./goalRoutes");
const sessionRoutes = require("./sessionRoutes");
const dailyRoutes = require("./dailyRoutes");

router.use("/users", userRoutes);
router.use("/goals", goalRoutes);
router.use("/session", sessionRoutes);
router.use("/dailyLog", dailyRoutes);

module.exports = router;
