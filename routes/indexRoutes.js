var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");

router.get("/", function(req, res){
    res.render("home");
});

//LOGIN FORM
//show login form
router.get("/login", function(req, res){
    res.render("login"); 
 });
 
 //handling login logic
 router.post("/login", passport.authenticate("local", 
     {
         successRedirect: "/",
         failureRedirect: "/login"
     }), function(req, res){
 });




module.exports = router;