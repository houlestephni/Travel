const express = require("express");
const router = express.Router();

const User = require("../models/users.js");
const bcrypt = require("bcrypt");

router.get("/new", (req, res) => {
  if (req.session) {
    res.render("users/new.ejs", { currentUser: req.session.currentUser });
  } else {
    res.send("Forbidden Page");
  }
});

router.post("/", (req, res) => {
  console.log(currentUser);
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10),
    (err, hash) => {
      if (err) throw err;
    }
  );
  User.create(req.body, (err, createdUser) => {
    res.redirect("/");
  });
});

module.exports = router;
