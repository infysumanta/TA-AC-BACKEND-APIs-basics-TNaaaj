var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost/api-assignment-2",
  {
    useNewUrlParams: true,
    useUnifiedTopology: true,
  },
  (err) => {
    console.log("Connected to database: ", err ? false : true);
  }
);

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var countriesRouter = require("./routes/v1/countries");
var statesRouter = require("./routes/v1/states");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/countries", countriesRouter);
app.use("/states", statesRouter);

module.exports = app;
