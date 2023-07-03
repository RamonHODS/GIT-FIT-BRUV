const seedUsers = require("./user-seeds");
const seedGoals = require("./goal-seeds");
const seedSessions = require("./session-seeds.json");
const seedDaily = require("./daily-seeds.json");
const { User, Goal, Session, Daily } = require("../models");
const sequelize = require("../config/connection");

const seedAll = async () => {
  try {
    await sequelize.sync({ force: true });
    // Seed Users
    const users = await User.bulkCreate(seedUsers, {
      individualHooks: true,
      returning: true,
    });
    console.log("\n----- USERS SEEDED -----\n");
    //seed Goals
    const goals = await Goal.bulkCreate(seedGoals, {
      individualHooks: true,
      returning: true,
    });
    console.log("\n----- GOALS SEEDED -----\n");
    //seed Sessions
    const daily = await Daily.bulkCreate(seedDaily, {
      individualHooks: true,
      returning: true,
    });
    console.log("\n----- DAILY SEEDED -----\n");
    const sessions = await Session.bulkCreate(seedSessions, {
      individualHooks: true,
      returning: true,
    });
    console.log("\n----- SESSIONS SEEDED -----\n");
  } catch (err) {
    console.error(err);
  } finally {
    console.log("exciting things happening");
    process.exit(0);
  }
};
seedAll();
