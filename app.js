var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var indexRouter = require("./routes/index");
// eslint-disable-next-line no-unused-vars
var router = express.Router();
// eslint-disable-next-line no-unused-vars
const moment = require("moment");
const bodyParser = require("body-parser");

var app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "front/build")));
app.use(bodyParser.json());

app.use("/", indexRouter);
module.exports = app;
