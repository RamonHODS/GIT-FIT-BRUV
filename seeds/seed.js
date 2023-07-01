const seedUsers = require("./user-seeds");
const seedGoals = require("./goal-seeds");
const { User, Goal } = require("../models");
const sequelize = require("../config/connection");

const seedAll = async () => {
  try {
    await sequelize.sync({ force: true });
    const users = await User.bulkCreate(seedUsers, {
      individualHooks: true,
      returning: true,
    });
    console.log("\n----- USERS SEEDED -----\n");
    for (let i = 0; i < seedGoals.length; i++) {
      const goal = seedGoals[i];
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const userGoal = await Goal.create({
        ...goal,
        user_id: randomUser.id,
        // individualHooks: true,
        // returning: true,
      });
      console.log(userGoal);
    }
  } catch (err) {
    console.error(err);
  } finally {
    console.log("exciting things happening");
    process.exit(0);
  }
};
seedAll();
