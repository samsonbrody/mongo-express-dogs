const express = require("express");
const router = express.Router({ mergeParams: true });
const Dog = require("../models/dog");
const Comment = require("../models/comment");

const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");

router.post("/", async (req, res, next) => {
  const { id } = req.params;
  const { body, username } = req.body.comment;
  const dog = await Dog.findById(id);
  console.log(dog);
  const comment = new Comment({ body, username });
  console.log(comment);
  dog.comments.push(comment);
  await dog.save();
  await comment.save();
  res.redirect(`/dogs/${dog._id}`);
});

module.exports = router;
