var methodOverride = require("method-override"),
	bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
	flash          = require("connect-flash"),
	express        = require("express"),
    app            = express(),
	Climateaction  = require("./models/climateaction"),
	Comment        = require("./models/comment"),
	seedDB         = require("./seeds"),
    passport              = require("passport"),
	LocalStrategy         = require("passport-local"),
	passportLocalMongoose = require("passport-local-mongoose"),
	User                  = require("./models/user");

// APP CONFIG

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.connect("mongodb://localhost/our_only_home");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(flash());

//seedDB(); // seed the database

// Requiring Routes

var climateactionRoutes = require("./routes/climateactions"), 
          commentRoutes = require("./routes/comments"),
	        indexRoutes = require("./routes/index");	

//PASSPORT CONFIG

app.use(require("express-session")({
		secret: "Shoot for the moon. Even if you miss, you'll land among the stars.",
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
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use("/", indexRoutes);
app.use("/climateactions", climateactionRoutes);
app.use("/climateactions/:id/comments", commentRoutes);

app.listen(3000, function(){
	console.log("Server is running");
});