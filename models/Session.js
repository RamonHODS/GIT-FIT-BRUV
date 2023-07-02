const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Session extends Model {}

Session.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    //I would like to consider adding an additional model to provide sub options
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.TIME,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },

    goal_num: {
      type: DataTypes.INTEGER,
      references: {
        model: Goal,
        key: "id",
      },
    },

    log_id: {
      type: DataTypes.DATE,
      allowNull: false,
      references: {
        model: Daily,
        key: "id",
      },
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
