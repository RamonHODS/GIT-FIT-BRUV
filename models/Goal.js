const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Goal extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

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
      type: DataTypes.ENUM([
        "Physical",
        "Mental",
        "Spiritual",
        "Emotional",
        "Social",
      ]),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(["active", "resting", "met"]),
      allowNull: false,
    },
    motivation: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },
    outcome: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },
    notes: {
      type: DataTypes.STRING(25),
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: user,
        key: "id",
        onDelete: "CASCADE",
      },
    },
  },
  {
    //to help visualize data later on I am including "G". this will require Const instance = await Model.create;
    //use consolue.log(instance.cutomID) to check that output is correct.
    hooks: {
      beforeCreate: async (model) => {
        model.customId = "G" + model.id;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "model",
  }
);

module.exports = User;
