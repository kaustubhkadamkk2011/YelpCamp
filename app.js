require('dotenv').config();

var express    			=require("express"),
 app           			= express(),
 bodyParser    			= require("body-parser"),
 mongoose      			= require("mongoose"),
 passport      			= require("passport"),
 localStrategy 			= require("passport-local"),
 methodOverride			= require("method-override"),
 flash                  = require("connect-flash"),
 Campground    			= require("./models/campgrounds"),
 Comment       			= require("./models/comment"),
 User          			= require("./models/user"),
 seedDB        			= require("./seeds");


var campgroundRoutes  = require("./routes/campgrounds"),
	commentRoutes     = require("./routes/comments"),
	indexRoutes       = require("./routes/index");

//mongodb+srv://kaustubh:<password>@cluster0.rsgwk.mongodb.net/<dbname>?retryWrites=true&w=majority
mongoose.connect("mongodb+srv://kaustubh:EHNLPvCSe6OQR698@cluster0.rsgwk.mongodb.net/yelpcamp?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

// seedDB();
app.locals.moment = require('moment');
app.use(methodOverride("_method"));
app.use(flash());
app.use(require("express-session")({
	secret:"GSOC 2020 be ready for me",
	resave:false,
	saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine","ejs");

app.use(express.static(__dirname +"/public"));

app.use(function(req,res,next){
	res.locals.currentUser=req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});


app.use(indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);


app.listen(process.env.PORT,function(){
	console.log("Server Started");
});