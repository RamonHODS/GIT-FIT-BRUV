const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const path = require("path");
const routes = require("./controllers/");
const homeRoutes = require("./controllers/homeRoutes");
// const dateFormatter = require("./utils/dateFormatter");

const sequelize = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({});

const sess = {
  secret: "abc123",
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  },
  resave: false,
  saveUninitialized: true,
};

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


app.use(routes);
app.use(homeRoutes);

app.use(session(sess));

app.get("/", (req, res) => {
  res.render("login");
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log("Now listening on: http://localhost:" + PORT)
  );
});
