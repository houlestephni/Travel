const express = require("express");
const User = require("../models/users.js");
const router = express.Router();
const bcrypt = require("bcrypt");

router.get("/new", (req, res) => {
  res.render("sessions/new.ejs", { currentUser: req.session.currentUser });
});

router.post("/", (req, res) => {
  User.findOne({ username: req.body.username }, (error, foundUser) => {
    if (bcrypt.compareSync(req.body.password, foundUser.password)) {
      req.session.currentUser = foundUser;

      res.redirect("/travel");
    } else {
      res.send("Wrong password. Try Again!");
    }
  });
});
router.delete("/", (req, res) => {
  req.session.destroy(() => {
    // res.redirect("/travel");
    res.redirect("/sessions/new");
  });
});

module.exports = router;
