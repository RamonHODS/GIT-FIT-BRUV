const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const Goal = require("./Goal");
const Daily = require("./Daily");

class Session extends Model {}

Session.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    createdAt: {
      type: DataTypes.TIME,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    goal_num: {
      type: DataTypes.INTEGER,
      references: {
        model: Goal,
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
      beforeCreate: async (session) => {
        session.customId = "S" + session.id;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "session",
  }
);

module.exports = Session;
