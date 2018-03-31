
var express = require('express');
var	app     = express();



app.locals.moment = require('moment');

app.set("view engine", "ejs");

var blogRoutes = require("./routes/blogRoutes");
var indexRoutes = require("./routes/indexRoutes.js");

app.use("/blog", blogRoutes);
app.use("/", indexRoutes);

app.use(express.static(__dirname + "/public"));

app.get("*", function(req, res){
	res.render("home");
});

app.listen(process.env.PORT || 3000, function(){
   console.log("Server started");
   console.log("Listening");
});