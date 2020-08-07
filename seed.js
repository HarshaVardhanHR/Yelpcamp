var mongoose = require("mongoose");
var Comment = require("./models/comment");
var Campground = require("./models/campground");

var data = [
  {
    name: "Cloud's Rest",
    image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
    desc:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
  },
  {
    name: "Desert Mesa",
    image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
    desc:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
  },
  {
    name: "Canyon Floor",
    image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
    desc:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
  },
  {
    name: "Granite Hills",
    image:
      "https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&h=350",
    desc: "No washrooms,water nothing.Only a beautiful hill",
  },
  {
    name: "Niagra Peak",
    image:
      "https://images.pexels.com/photos/266436/pexels-photo-266436.jpeg?auto=compress&cs=tinysrgb&h=350",
    desc:
      "Slippery river ending into one of the beautiful waterfalls in the world",
  },
  {
    name: "Kalahari Nights",
    image:
      "https://images.pexels.com/photos/803226/pexels-photo-803226.jpeg?auto=compress&cs=tinysrgb&h=350",
    desc: "hot in the day, cold in the night on the extreme end ",
  },
  {
    name: "Himalayan Rides",
    image:
      "https://pixabay.com/get/57e1dd4a4350a514f1dc84609620367d1c3ed9e04e507440732a7fd0904bcd_340.jpg",
    desc: "Roads that are open only in summer only if mother nature permits",
  },
];

function seedDB() {
  //Remove all campgrounds
  Campground.remove({}, function (err) {
    if (err) {
      console.log(err);
    }
    console.log("removed campgrounds!");
    Comment.remove({}, function (err) {
      if (err) {
        console.log(err);
      }
    });
  });
  //add a few comments
}

module.exports = seedDB;
