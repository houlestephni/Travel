const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const Post = require("./models/posts.js");
const newPosts = require("./models/seed.js");

// DB SETUP
mongoose.connect("mongodb://localhost:27017/travel", {
  useNewUrlParser: true
});
mongoose.connection.once("open", () => {
  console.log("connected to mongo");
});

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static("public"));
///Added seed data
// Post.create(newPosts, (error, data) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("added seed data");
//   }
// });
// Post.collection.drop();

app.get("/", (req, res) => {
  res.send("welcome");
});

//New
app.get("/travel/new", (req, res) => {
  res.render("new.ejs");
});

//Post
app.post("/travel/", (req, res) => {
  Post.create(req.body, (error, createdPost) => {
    if (error) {
      res.send(error);
    } else {
      res.redirect("/travel");
    }
  });
});

//Index
app.get("/travel", (req, res) => {
  Post.find({}, (error, allPosts) => {
    if (error) {
      res.send(error);
    } else {
      res.render("index.ejs", { post: allPosts });
    }
  });
});

//Show
app.get("/travel/:id", (req, res) => {
  Post.findById(req.params.id, (error, foundPost) => {
    res.render("show.ejs", { post: foundPost });
  });
});

//Delete
app.delete("/travel/:id/edit", (req, res) => {
  Post.findByIdAndDelete(req.params.id, (error, deletePost) => {
    if (error) {
      console.log(error);
    } else {
      res.redirect("/travel");
    }
  });
});

//Edit
app.get("/travel/:id/edit", (req, res) => {
  Post.findById(req.params.id, (error, foundPost) => {
    res.render("edit.ejs", { post: foundPost });
  });
});

//Update
app.put("/travel/:id", (req, res) => {
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

app.listen(3000, (req, res) => console.log("listening on PORT 3000!"));
