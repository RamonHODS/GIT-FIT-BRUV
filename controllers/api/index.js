const router = require("express").Router();

const userRoutes = require("./userRoutes");
const goalRoutes = require("./goalRoutes");
const sessionRoutes = require("./sessionRoutes");

router.use("/users", userRoutes);
router.use("/goals", goalRoutes);
router.use("/sessions", sessionRoutes);
module.exports = router;
