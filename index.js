const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const Dog = require("./models/dog");
const Comment = require("./models/comment");
const ejsMate = require("ejs-mate");
const dogRoutes = require("./routes/dogs");
const commentRoutes = require("./routes/comments");
const ExpressError = require("./utils/ExpressError");
const wrapAsync = require("./utils/wrapAsync");

mongoose.connect("mongodb://localhost:27017/dogsDirectory", {
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind("connection error"));
db.once("open", () => {
  console.log("database connected");
});

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/dogs", dogRoutes);
app.use("/dogs/:id/comments", commentRoutes);

app.all("*", (req, res, next) => {
  next(new ExpressError("page not found", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;

  res.status(statusCode).render("error", { err });
});

app.listen(5000, () => {
  console.log("listening on 5000!");
});
