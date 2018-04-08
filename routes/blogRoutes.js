var express = require("express");
var router  = express.Router();
var expressSanitizer = require('express-sanitizer');
var Blog = require("../models/blog");
router.use(expressSanitizer());

//INDEX - SHOW ALL BLOGS ENTRIES
router.get("/", function(req, res){
    Blog.find({}, function(err, allBlogs){
        if(err){
            console.log(err);
        } else {
            res.render("blogs/index", {blogs: allBlogs});
        }
    });
});


router.get("/new", function(req,res){
	res.render("blogs/new");
})
//CREATE - ADD A NEW CAMPGROUND
router.post("/", function(req,res){
	req.body.blog.content = req.sanitize(req.body.blog.content);
	Blog.create(req.body.blog, function(err, newBlog){
		if (err) {
			console.log(err);
			res.render("new");
		} else {
			res.redirect("/blog");
		}
	});
});




module.exports = router;