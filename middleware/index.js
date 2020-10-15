var Campground           = require("../models/campgrounds"),
    Comment              = require("../models/comment");

var middlewareObj={};


middlewareObj.campgroundOwnership = function(req,res,next){
	if(req.isAuthenticated()){
		Campground.findById(req.params.id,function(err,foundCamp){
			if(err){
				req.flash("error","Campground not found");
				res.redirect("back");
			}else{
				if(foundCamp.author.id.equals(req.user._id)){
					next();
				}else{
					req.flash("error","You don't have permission to do that");
					res.redirect("back");
				}
				
			}
		});
	}else{
		req.flash("error","You need to be Logged in to do that");
		res.redirect("back");
	}
}


middlewareObj.isLoggedin = function (req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error","You need to be Logged in to do that");
	res.redirect("/login");
}

middlewareObj.commentOwnership = function  (req,res,next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id,function(err,foundcomment){
			if(err){
				req.flash("error","Review not found");
				res.redirect("back");
			}else{
				if(foundcomment.author.id.equals(req.user._id)){
					next();
				}else{
					req.flash("error","You don't have permission to do that");
					res.redirect("back");
				}
				
			}
		});
	}else{
		req.flash("error","You need to be Logged in to do that");
		res.redirect("back");
	}
}


module.exports = middlewareObj;
