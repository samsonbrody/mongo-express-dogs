const mongoose = require("mongoose");
const Dog = require("./dog");
const { Schema } = mongoose;

const commentSchema = new Schema({
  body: String,
  username: String,
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
