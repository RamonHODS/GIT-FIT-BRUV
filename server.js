const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const routes = require("./controllers");
const hbs = exphbs.create({});
const app = express();
const PORT = process.env.PORT || 3001;
const dateFormatter = require("./utils/dateFormatter");

const sequelize = require("./config/connection");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");
app.engine("handlebars", hbs.engine);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
// const SequelizeStore = require("connect-session-sequelize")(session.Store);

//* Set up Handlebars.js engine with custom helpers

// const sess = {
//   secret: process.env.SESSION_SECRET,
//   cookie: {
//     maxAge: 24 * 60 * 60 * 1000, //* 24 hours
//     httpOnly: true,
//     secure: false,
//     sameSite: "strict",
//   },
//   resave: false,
//   saveUninitialized: true,
//   store: new SequelizeStore({
//     db: sequelize,
//   }),
// };

// app.use(session(sess));

//* Inform Express.js on which template engine to use
//* app.set('views', path.join(__dirname, 'Develop', 'views'));

app.use(
  session({
    secret: "make a secret key here",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(routes);
app.get("/", (req, res) => {
  res.render("layouts/main");
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
module.exports = app;
