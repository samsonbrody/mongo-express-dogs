const express = require("express");
const Dog = require("../models/dog");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");

router.get(
  "/",
  wrapAsync(async (req, res, next) => {
    const allDogs = await Dog.find({});
    console.log(allDogs);
    res.render("dogs/index", { allDogs });
  })
);

router.get("/new", (req, res, next) => {
  res.render("dogs/new");
});

router.post(
  "/",
  wrapAsync(async (req, res, next) => {
    const { breedName, lifespan, hypoallergenic, photo } = req.body.dog;
    const dog = new Dog({ breedName, lifespan, hypoallergenic, photo });
    await dog.save();
    res.redirect(`/dogs/${dog._id}`);
  })
);

router.get(
  "/:id",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const dog = await Dog.findById(id).populate("comments");
    res.render("dogs/show", { dog });
  })
);

router.delete(
  "/:id",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const dog = await Dog.findByIdAndDelete(id);
    console.log(dog);
    console.log("dog deleted successfully");
    res.redirect("/dogs");
  })
);

module.exports = router;
