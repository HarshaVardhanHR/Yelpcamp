var express = require("express");
const bodyparser = require("body-parser");
const app = express();
var PORT = 3001;
var mongoose = require("mongoose");
var flash = require("connect-flash");
app.use(express.static('public'))
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
app.use(flash());
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
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.use(authRoutes);
app.use(campgroundRoutes);

app.listen(PORT, console.log("The yelpcamp server has started"));
