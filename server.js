const path = require("path");
const express = require("express");
// const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers/");
const dateFormatter = require("./utils/dateFormatter");
const mime = require("mime");

const sequelize = require("./config/connection");
// const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

//* Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({});

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
app.engine("handlebars", hbs.engine);
//* app.set('views', path.join(__dirname, 'Develop', 'views'));
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  express.static(path.join(__dirname, "public", "css"), {
    setHeaders: (res, filePath) => {
      const contentType = mime.getType(path.extname(filePath));
      if (contentType) {
        res.setHeader("Content-Type", "text/css");
      }
    },
  })
);

app.use(routes);
app.get("/", (req, res) => {
  res.render("goals", { baseUrl: "goals" });
});

// app.get(`/`, (req, res) => {
//   try {
//     res.sendFile(path.join(__dirname, "./templates/goals.html"));
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
