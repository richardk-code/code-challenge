var express = require("express");
var router  = express.Router();
var Climateaction = require("../models/climateaction");
var middleware = require("../middleware");

// INDEX ROUTE - Show all climateactions

router.get("/", function(req, res){
	Climateaction.find({}, function(err, allClimateactions){
		if(err){
			console.log(err);
		} else {
			res.render("climateactions/index", {climateactions:allClimateactions});
		}
	});
	
});

// NEW Route - Show form to create new climateaction

router.get("/new", middleware.isLoggedIn, function(req, res){
	res.render("climateactions/new.ejs");
});

// CREATE ROUTE - Add new Climateaction to DB

router.post("/", middleware.isLoggedIn, function(req, res){
	var NewClimateAction = req.body.climateaction;
	NewClimateAction.author = {
        id: req.user._id,
        username: req.user.username
    };
	Climateaction.create(
	NewClimateAction, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
			req.flash("success", "Climate Action added");
			res.redirect("/climateactions");
		}	
	});
	
});

// SHOW ROUTE - Show more information about one climateaction

router.get("/:id", function(req, res){
	Climateaction.findById(req.params.id).populate("comments").exec(function(err, foundClimateaction){
		if(err){
			console.log(err);
		} else {
			res.render("climateactions/show", {climateaction: foundClimateaction});
		}
	});
});

// EDIT ROUTE

router.get("/:id/edit", middleware.checkClimateactionOwnership, function(req, res){
    Climateaction.findById(req.params.id, function(err, foundClimateaction){
        if(err){
            console.log(err);
        } else {
            res.render("climateactions/edit", {climateaction: foundClimateaction});
        }
    });
});

// UPDATE ROUTE

router.put("/:id", middleware.checkClimateactionOwnership, function(req, res){
   Climateaction.findByIdAndUpdate(req.params.id, req.body.climateaction, function(err, updatedClimateaction){
      if(err){
          console.log(err);
      }  else {
		  req.flash("success", "Climate Action edited");
          res.redirect("/climateactions/" + req.params.id);
      }
   });
});

// DELETE ROUTE

router.delete("/:id", middleware.checkClimateactionOwnership, function(req, res){
   Climateaction.findByIdAndRemove(req.params.id, function(err){
       if(err){
           console.log(err);
       } else {
		   req.flash("success", "Climate Action deleted");
           res.redirect("/climateactions");
       }
   });
});

module.exports = router;