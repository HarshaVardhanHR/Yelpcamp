var express = require("express");
const bodyparser = require("body-parser");
const app = express();
var PORT = process.env.PORT || 5000;
var mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://tester:test@cluster1.svymu.mongodb.net/training?retryWrites=true&w=majority",
  { useUnifiedTopology: true, useNewUrlParser: true }
);
var Comment = require("./models/comment");
var campground = require("./models/campground");
var passport = require("passport");
var passportlocalmongoose = require("passport-local-mongoose");
var localstrategy = require("passport-local");
var user = require("./models/user");
var express_session = require("express-session");

var campgroundRoutes = require("./routes/campgroundRoutes");
var authRoutes = require("./routes/authRoutes");

app.use(
  express_session({
    secret: "abcd",
    saveUninitialized: false,
    resave: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localstrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use(bodyparser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

var seeddb = require("./seed");

app.use(function (req, res, next) {
  res.locals.current_User = req.user;
  next();
});

app.use(authRoutes);
app.use(campgroundRoutes);

////passing req.user to every routes here

//============================
//auth routes
//===============================

//====================
// functional routes
//====================

app.listen(PORT, console.log("The yelpcamp server has started"));
