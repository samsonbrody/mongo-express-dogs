const mongoose = require("mongoose");
const { Schema } = mongoose;
const Comment = require("./comment");

const dogSchema = new Schema({
  breedName: {
    type: String,
  },
  lifespan: {
    type: String,
  },
  scientificName: {
    type: String,
  },
  hypoallergenic: {
    type: Boolean,
  },
  temperament: {
    type: [String],
  },
  photo: {
    type: String,
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

const Dog = mongoose.model("Dog", dogSchema);

module.exports = Dog;
