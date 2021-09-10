const mongoose = require("mongoose");
const Dog = require("./models/dog");
mongoose.connect("mongodb://localhost:27017/dogsDirectory", {
  useNewUrlParser: true,
});

const seedDB = async () => {
  const seed = new Dog({
    breedName: "Beagle",
    lifespan: "12-15 years",
    scientificName: "Canis lupus familiaris",
    hypoallergenic: false,
    temperament: [
      "Intelligent",
      "Amiable",
      "Determined",
      "Excitable",
      "Gentle",
    ],
    photo:
      "https://images.unsplash.com/photo-1512546321483-c0468b7b8a95?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80",
  });
  await seed.save();
};

seedDB().then(() => {
  mongoose.connection.close();
});
