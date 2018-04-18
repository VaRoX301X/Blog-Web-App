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
//CREATE - ADD A NEW blog
router.post("/", function(req,res){
	req.body.blog.content = req.sanitize(req.body.blog.content);
	Blog.create(req.body.blog, function(err, newBlog){
		if (err) {
			console.log(err);
			res.render("blogs/new");
		} else {
			res.redirect("/blog");
		}
	});
});
//SHOW BLOG ENTRY
router.get("/:id", function(req, res){
    //find the blog with provided ID
    Blog.findById(req.params.id).populate("comments").exec(function(err, foundblog){
        if(err){
            console.log(err);
        } else {
            console.log(foundblog)
            //render show template with that blog
            res.render("blogs/show", {blog: foundblog});
        }
    });
});
//EDIT BLOG ENTRY
router.get("/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, foundblog){
        res.render("blogs/edit", {blog: foundblog});
    });
});
//UPDATE ROUTE
router.put("/:id", function(req, res){
    // find and update the correct blog
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedblog){
       if(err){
           res.redirect("/blog");
       } else {
           //redirect somewhere(show page)
           res.redirect("/blog/" + req.params.id);
       }
    });
});



module.exports = router;