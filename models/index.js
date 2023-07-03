const User = require("./User");
const Goal = require("./Goal");
const Session = require("./Session");
const Daily = require("./Daily");

User.hasMany(Goal, {
  foreignKey: "user_id",
});

User.hasMany(Daily, {
  foreignKey: "user_id",
});

Daily.belongsTo(User, {
  foreignKey: "user_id",
});

Goal.belongsTo(User, {
  foreignKey: "user_id",
});

Goal.hasMany(Session, {
  foreignKey: "goal_id",
});

Daily.hasMany(Session, {
  foreignKey: "log_id",
});

Session.belongsTo(Goal, {
  foreignKey: "goal_id",
});

Session.belongsTo(Daily, {
  foreignKey: "log_id",
});

module.exports = {
  User,
  Goal,
  Daily,
  Session,
};
