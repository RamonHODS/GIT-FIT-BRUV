const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Daily extends Model {}

Daily.init(
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
  },

  {
    //to help visualize data later on I am including "G". this will require Const instance = await Model.create;
    //use consolue.log(instance.cutomID) to check that output is correct.
    hooks: {
      beforeCreate: async (daily) => {
        daily.customId = "D" + daily.id;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "daily",
  }
);

module.exports = Daily;
