const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: String,
  author: String,
  description: String,
  image: String
});
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
