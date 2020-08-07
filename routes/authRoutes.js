var express = require("express");
var router= express.Router();
var passport = require("passport");
const bodyparser=require("body-parser");
var user = require("../models/user");

router.get("/register",function(req,res){
    res.render("register",{current_User:req.user});
})

router.post("/register",function(req,res){
    var newuser = new user({username : req.body.username});
    user.register(newuser,req.body.password,function(err,user){
        if(err){
            res.redirect("/register");
            
        }
        else{
                passport.authenticate("local")(req,res,function(){
                res.redirect("/campgrounds");
            })
        }
    })
})

router.get("/login",function(req,res){
    res.render("login");
})

router.post("/login",passport.authenticate("local",{
    successRedirect:"/campgrounds",
    failureRedirect:"/login"
}),function(req,res){})

router.get("/logout",function(req,res){
    req.logout();
    res.redirect("/login");
})


module.exports = router;