var express = require("express");
var router = express.Router({mergeParams:true});
var Campground           = require("../models/campgrounds"),
    Comment              = require("../models/comment");
var middleware = require("../middleware/");

router.get("/new",middleware.isLoggedin,function(req,res){
	
	Campground.findById(req.params.id,function(err,campground){
		if(err){
			console.log(err);
		}else{
			// console.log(campground);
			res.render("comments/new", {campground : campground});
		}
	});
});

router.post("/",middleware.isLoggedin,function(req,res){
	Campground.findById(req.params.id,function(err,campground){
		if(err){
			console.log(err);
		}else{
			Comment.create(req.body.comment,function(err,comment){
				if(err){
					req.flash("error","Something went Wrong");
					res.redirect("back");
				}else{
					comment.author.id= req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					campground.comments.push(comment);
					campground.save();
					req.flash("success","Thanks for your review");
					res.redirect('/campgrounds/'+campground._id);
				}
			});
		}
	});
});


router.get("/:comment_id/edit",middleware.commentOwnership,function(req,res){
	Comment.findById(req.params.comment_id,function(err,foundcomment){
		if(err){
			console.log(err);
			res.redirect("back");
		}else{
			res.render("comments/edit",{campground_id:req.params.id,comment:foundcomment});
		}
	});
	
});

router.put("/:comment_id",middleware.commentOwnership,function(req,res){
	Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,foundComment){
		if(err){
			console.log(err);
			res.send("error");
			// res.redirect("back");
		}else{
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});

router.delete("/:comment_id",middleware.commentOwnership,function(req,res){
	Comment.findByIdAndRemove(req.params.comment_id,function(err,foundcomment){
		if(err){
			console.log(err);
			res.redirect("back");
		}else{
			req.flash("success","Deleted Your Review Successfully");
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});

 

module.exports = router;