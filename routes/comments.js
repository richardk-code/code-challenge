var express = require("express");
var router  = express.Router({mergeParams: true});
var Climateaction = require("../models/climateaction");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//Comments New

router.get("/new", middleware.isLoggedIn, function(req, res){
    Climateaction.findById(req.params.id, function(err, climateaction){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {climateaction: climateaction});
        }
    });
});

//Comments Create

router.post("/", middleware.isLoggedIn, function(req, res){
   Climateaction.findById(req.params.id, function(err, climateaction){
       if(err){
           console.log(err);
           res.redirect("/climateactions");
       } else {
        Comment.create(req.body.comment, function(err, comment){
           if(err){
			   req.flash("error", "Something went wrong");
               console.log(err);
           } else {
			   comment.author.id = req.user._id;
			   comment.author.username = req.user.username;
			   comment.save();
               climateaction.comments.push(comment);
               climateaction.save();
			   req.flash("success", "Successfully added comment");
               res.redirect('/climateactions/' + climateaction._id);
           }
        });
       }
   });
});

// COMMENT EDIT ROUTE

router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
   Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
          res.redirect("back");
      } else {
        res.render("comments/edit", {climateaction_id: req.params.id, comment: foundComment});
      }
   });
});

// COMMENT UPDATE

router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
      if(err){
          res.redirect("back");
      } else {
		  req.flash("success", "Comment edited");
          res.redirect("/climateactions/" + req.params.id );
      }
   });
});

// COMMENT DESTROY ROUTE

router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           res.redirect("back");
       } else {
		   req.flash("success", "Comment deleted");
           res.redirect("/climateactions/" + req.params.id);
       }
    });
});

module.exports = router;
