const express = require("express");
const User = require("../models/users.js");
const router = express.Router();
const bcrypt = require("bcrypt");

router.get("/new", (req, res) => {
  res.render("sessions/new.ejs", { currentUser: req.session.currentUser });
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

router.post("/", (req, res) => {
  User.findOne({ username: req.body.username }, (error, foundUser) => {
    if (bcrypt.compareSync(req.body.password, foundUser.password)) {
      req.session.currentUser = foundUser;
      res.send("logged in");
      // res.redirect("/travel");
    } else {
      res.send("Wrong password. Try Again!");
    }
  });
});
router.delete("/", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/travel");
  });
});

module.exports = router;
