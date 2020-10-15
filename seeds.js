var mongoose = require("mongoose");
var Campground = require("./models/campgrounds");
var Comment = require ("./models/comment")
var data =[
	{
		name : "Cloud Peak",
		image :"https://images.unsplash.com/photo-1571863533956-01c88e79957e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
		description :"dignissim convallis aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis varius quam quisque id diam vel quam elementum pulvinar etiam non quam lacus suspendisse faucibus interdum posuere lorem",
		price:"$ 10 /night",
		author:{
			username:"Hodor"
	}
	},
	
	
	{
		name : "Silver Lake",
		image :"https://images.unsplash.com/photo-1519793945311-767397088877?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		description :"dignissim convallis aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis varius quam quisque id diam vel quam elementum pulvinar etiam non quam lacus suspendisse faucibus interdum posuere lorem",
		price:"$ 12 /night",
		author:{
		username:"Hodor"
	}
	},
	
	
	{
		name : "Fiery Woods",
		image :"https://images.unsplash.com/photo-1487730116645-74489c95b41b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		description :"dignissim convallis aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis varius quam quisque id diam vel quam elementum pulvinar etiam non quam lacus suspendisse faucibus interdum posuere lorem",
		price:"$ 6 /night",
		author:{
		username:"Hodor"
	}
	},
	
	{
		name : "McLodganj",
		image :"https://images.unsplash.com/photo-1571863533956-01c88e79957e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		description :"dignissim convallis aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis varius quam quisque id diam vel quam elementum pulvinar etiam non quam lacus suspendisse faucibus interdum posuere lorem",
		price:"$ 15 /night",
		author:{
		username:"Hodor"
	}
	},
	
	
	{
		name : "Camper's Paradise",
		image :"https://images.unsplash.com/photo-1525811902-f2342640856e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		description :"dignissim convallis aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis varius quam quisque id diam vel quam elementum pulvinar etiam non quam lacus suspendisse faucibus interdum posuere lorem",
		price:"$ 11 /night",
		author:{
		username:"Hodor"
	}
	}
	
];
function seedDB(){
	Campground.remove({},function(err){
		if (err){
			console.log(err);
		}else{
			console.log("removed data");
			data.forEach(function(seed){
				Campground.create(seed,function(err,campground){
					if(err){
						console.log(err);
					}else{
						console.log("added data");
						
						Comment.create({
							text:"Must visit place, however could be better with internet connectivity",
							author:{
								username:"Hodor"
							}
						},function(err,comment){
							if(err){
								console.log(err);
							}else{
								campground.comments.push(comment);
								campground.save();
							}
						})
					}
				});
			});
		}
	});
}

module.exports = seedDB;