
var express = require('express');
var	app     = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var methodOverride = require('method-override');
var passport    = require("passport");
var LocalStrategy = require("passport-local");

//Model imports
var Blog = require('./models/blog.js');
var Comment = require('./models/comment.js');
var User = require('./models/user.js');

app.locals.moment = require('moment');

var url = process.env.DATABASEURL || "mongodb://localhost/xorav_db";
mongoose.connect(url);
console.log(url);

app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));


var blogRoutes = require("./routes/blogRoutes");
var indexRoutes = require("./routes/indexRoutes.js");

app.use("/blog", blogRoutes);
app.use("/", indexRoutes);


//PASSPORT CONFIG
app.use(require("express-session")({
    secret: "NOPENOPE",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
 });

app.get("*", function(req, res){
	res.render("home");
});

app.listen(process.env.PORT || 3000, function(){
   console.log("Server started");
   console.log("Listening");
});