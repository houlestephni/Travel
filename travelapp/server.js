const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");

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

app.get("/", (req, res) => {
  res.send("welcome");
});

app.get("/travel/destinations", (req, res) => {
  res.send("Vamos!");
});

app.get("/travel/destinations/:id", (req, res) => {
  res.send("hello!");
});

app.listen(3000, (req, res) => console.log("listening on PORT 3000!"));
