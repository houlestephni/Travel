const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const session = require("express-session");
const bcrypt = require("bcrypt");
const PORT = process.env.PORT || 3000;
// const Post = require("./models/posts.js");
// const newPosts = require("./models/seed.js");

// Controllers
const travelController = require("./controllers/travel.js");
const usersController = require("./controllers/users.js");
const sessionsController = require("./controllers/sessions.js");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(express.json());
app.use(
  session({
    secret: "membersonly",
    resave: false,
    saveUninitialized: false
  })
);
app.use("/travel", travelController);
app.use("/users", usersController);
app.use("/sessions", sessionsController);

///Added seed data
// Post.create(newPosts, (error, data) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("added seed data");
//   }
// });
// Post.collection.drop();

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/travel";
// DB SETUP
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.once("open", () => {
  console.log("connected to mongo");
});

app.get("/", (req, res) => {
  res.render("home.ejs", { currentUser: req.session.currentUser });
});

// //New
// app.get("/travel/new", (req, res) => {
//   res.render("new.ejs");
// });

// //Post
// app.post("/travel/", (req, res) => {
//   Post.create(req.body, (error, createdPost) => {
//     if (error) {
//       res.send(error);
//     } else {
//       res.redirect("/travel");
//     }
//   });
// });

// //Index
// app.get("/travel", (req, res) => {
//   Post.find({}, (error, allPosts) => {
//     if (error) {
//       res.send(error);
//     } else {
//       res.render("index.ejs", { post: allPosts });
//     }
//   });
// });

// //Show
// app.get("/travel/:id", (req, res) => {
//   Post.findById(req.params.id, (error, foundPost) => {
//     res.render("show.ejs", { post: foundPost });
//   });
// });

// //Delete
// app.delete("/travel/:id/edit", (req, res) => {
//   Post.findByIdAndDelete(req.params.id, (error, deletePost) => {
//     if (error) {
//       console.log(error);
//     } else {
//       res.redirect("/travel");
//     }
//   });
// });

// //Edit
// app.get("/travel/:id/edit", (req, res) => {
//   Post.findById(req.params.id, (error, foundPost) => {
//     res.render("edit.ejs", { post: foundPost });
//   });
// });

// //Update
// app.put("/travel/:id", (req, res) => {
//   Post.findByIdAndUpdate(
//     req.params.id,
//     req.body,
//     { new: true },
//     (error, updatedPost) => {
//       if (error) {
//         console.log(error);
//       } else {
//         res.redirect("/travel");
//       }
//     }
//   );
// });

app.listen(PORT, (req, res) => console.log(`listening on PORT ${PORT}!`));
