const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Goal extends Model {}

Goal.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    //I would like to consider adding an additional model to provide sub options
    goal_type: {
      type: DataTypes.ENUM(
        "Physical",
        "Mental",
        "Spiritual",
        "Emotional",
        "Social"
      ),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("active", "resting", "met"),
      allowNull: false,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
        onDelete: "CASCADE",
      },
    },
  },
  {
    //to help visualize data later on I am including "G". this will require Const instance = await Model.create;
    //use consolue.log(instance.cutomID) to check that output is correct.
    hooks: {
      beforeCreate: async (goal) => {
        goal.customId = "G" + goal.id;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "goal",
  }
);

module.exports = Goal;
