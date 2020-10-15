var express = require("express");
var router = express.Router();
var Campground = require("../models/campgrounds");
var middleware = require("../middleware/");


router.get("/",function(req,res){
	Campground.find({},function(err,camp){
		if(err){
			console.log(err);
		}else{
			res.render("campgrounds/index",{campgrounds:camp,page: 'campgrounds'});
		}
	})
});

router.post("/",middleware.isLoggedin,function(req,res){
	var name = req.body.nameCamp ;
	var image = req.body.imgurl;
	var desc = req.body.description;
	var author = {
		id:req.user._id,
		username:req.user.username
	};
	
	var price = req.body.price;
	var newCamp= {name:name,image:image,description:desc,author:author,price:price};
	Campground.create(newCamp,function(err,newcamp){
		if(err){
			console.log(err);
		}
		else{
			res.redirect("/campgrounds");
		}
	
	});
	// campgrounds.push(newCamp);
});



router.get("/new",middleware.isLoggedin,function(req,res){
	
	res.render("campgrounds/new");
});

router.get("/:id",function(req,res){
	Campground.findById(req.params.id).populate("comments").exec(function(err,foundCamp){
		if(err){
			console.log(err);
		}else{
			
			 res.render("campgrounds/show",{campground:foundCamp});
		}
	});
	
});

router.get("/:id/edit",middleware.campgroundOwnership,function(req,res){
	Campground.findById(req.params.id,function(err,foundCamp){
		res.render("campgrounds/edit",{campground:foundCamp});
	});
});

router.put("/:id",middleware.campgroundOwnership,function(req,res){
	
	Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCamp){
		if(err){
			req.flash("error", err.message);
			res.redirect("/campgrounds");
		}
		else{
			req.flash("success","Successfully Updated!");
			res.redirect("/campgrounds/"+req.params.id);  
		}

	});
});


router.delete("/:id",middleware.campgroundOwnership,function(req,res){
	Campground.findByIdAndRemove(req.params.id,function(err,foundCamp){
		if(err){
			console.log(err);
			res.redirect("/campgrounds/"+req.params.id);
		}else{
			res.redirect("/campgrounds");
		}
	});
});


module.exports = router;
	