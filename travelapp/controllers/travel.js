const express = require("express");
const router = express.Router();
const session = require("express-session");

// Models
const Post = require("../models/posts.js");
// const User = require("../models/users.js");

// New
router.get("/new", (req, res) => {
  res.render("new.ejs", {
    currentUser: req.session.currentUser
  });
});

//Post
router.post("/", (req, res) => {
  Post.create(req.body, (error, createdPost) => {
    if (error) {
      res.send(error);
    } else {
      res.redirect("/travel");
    }
  });
});

//Index
router.get("/", (req, res) => {
  Post.find({}, (error, allPosts) => {
    if (error) {
      res.send(error);
    } else {
      res.render("index.ejs", {
        post: allPosts
      });
    }
  });
});

//Show
router.get("/:id", (req, res) => {
  Post.findById(req.params.id, (error, foundPost) => {
    res.render("show.ejs", {
      post: foundPost
    });
  });
});

//Delete
router.delete("/:id/edit", (req, res) => {
  Post.findByIdAndDelete(req.params.id, (error, deletePost) => {
    if (error) {
      console.log(error);
    } else {
      res.redirect("/travel");
    }
  });
});

//Edit
router.get("/:id/edit", (req, res) => {
  Post.findById(req.params.id, (error, foundPost) => {
    res.render("edit.ejs", {
      post: foundPost,
      currentUser: req.session.currentUser
    });
  });
});

//Update
router.put("/:id", (req, res) => {
  Post.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (error, updatedPost) => {
      if (error) {
        console.log(error);
      } else {
        res.redirect("/travel");
      }
    }
  );
});
module.exports = router;
