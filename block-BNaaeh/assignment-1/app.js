var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost/api-assignments-1",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    console.log(err ? err : "Connected to database");
  }
);

var indexRouter = require("./routes/index");
var booksV1Router = require("./routes/v1/books");
var booksV2Router = require("./routes/v2/books");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/v1/books", booksV1Router);
app.use("/api/v2/books", booksV2Router);

module.exports = app;
