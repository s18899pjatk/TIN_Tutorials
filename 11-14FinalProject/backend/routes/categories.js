const validateId = require("../middlewares/validateId");
const auth = require("../middlewares/auth");
const { Category } = require("../models/category");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const categories = await Category.find().select("-__v").sort("name");
  res.send(categories);
});

router.get("/:id", validateId, async (req, res) => {
  const category = await Category.findById(req.params.id).select("-__v");

  if (!category)
    return res
      .status(404)
      .send("The category with the given ID was not found.");

  res.send(category);
});

module.exports = router;
