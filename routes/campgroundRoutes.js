var express = require("express");
var router = express.Router();
const bodyparser = require("body-parser");

var campground = require("../models/campground");
var Comment = require("../models/comment");

router.get("/", function (req, res) {
  res.render("landing", { current_User: req.user });
});

router.get("/campgrounds", isloggedin, function (req, res) {
  campground.find({}, function (err, campgrounds) {
    if (err) console.log(err);
    else {
      res.render("campgrounds", {
        campgrounds: campgrounds,
        current_User: req.user,
      });
    }
  });
});

router.post("/campgrounds", isloggedin, function (req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.desc;
  var newcamp = {
    name: name,
    image: image,
    desc: desc,
    author: {
      id: 1,
      username: "s",
    },
  };
  console.log(req.user);
  newcamp.author.id = req.user._id;
  newcamp.author.username = req.user.username;
  campground.create(newcamp, function (err, newcamps) {
    if (err) console.log(err);
    else {
      res.redirect("/campgrounds");
    }
  });
});

router.get("/campgrounds/new", isloggedin, function (req, res) {
  res.render("new", { current_User: req.user });
});

router.get("/show/:id", isloggedin, function (req, res) {
  campground
    .findById(req.params.id)
    .populate("comments")
    .exec(function (err, foundCampground) {
      if (err) {
        console.log(err);
      } else {
        console.log(req.user);
        console.log(foundCampground);
        //render show template with that campground

        res.render("show", {
          campground: foundCampground,
          current_User: req.user,
        });
      }
    });
});

router.post("/add_comment/:id", isloggedin, function (req, res) {
  var id = req.params.id;
  var comment = req.body.comment;
  campground.findById(req.params.id, function (err, campground) {
    if (err) {
      console.log(err);
    } else {
      Comment.create(comment, function (err, comment) {
        if (err) console.log(err);
        else {
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save();
          campground.comments.push(comment);
          campground.save();
          console.log("Created new comment");
          res.redirect("/show/" + id);
        }
      });
    }
  });
});

router.post("/delete/:id", function (req, res) {
  campground.findById(req.params.id, function (err, cp) {
    if (cp.author.id.equals(req.user._id)) {
      campground.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
          console.log(err);
          res.redirect("/campgrounds");
        } else {
          res.redirect("/campgrounds");
        }
      });
    } else {
      res.redirect("/campgrounds");
    }
  });
});

function isloggedin(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/login");
  }
}

module.exports = router;
