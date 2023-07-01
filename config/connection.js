const Sequelize = require("sequelize");
require("dotenv").config();

let sequelize;

if (process.env.JAWSDB_URL) {
  //* JAWSDB MySQL connection
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  //* Local MySQL connection
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      port: 3306,
      dialect: "mysql",
    }
  );
}

module.exports = sequelize;
