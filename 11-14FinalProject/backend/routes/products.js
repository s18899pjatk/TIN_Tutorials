const { Product } = require("../models/product");
const { Category } = require("../models/category");
const Joi = require("joi");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const express = require("express");
const validateId = require("../middlewares/validateId");
const router = express.Router();

router.get("/", async (req, res) => {
  const products = await Product.find().select("-__v").sort("name");
  res.send(products);
});

router.post("/", [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(400).send(error.details[0].message);

  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    weight: req.body.weight,
    amountAvailable: req.body.amountAvailable,
    category: category,
  });

  await product.save();
  res.send(product);
});

router.put("/:id", [validateId, auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(400).send("Invalid category.");

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      price: req.body.price,
      weight: req.body.weight,
      amountAvailable: req.body.amountAvailable,
      category: category,
    },
    { new: true }
  );

  if (!product)
    return res.status(404).send("The product with the given ID was not found.");

  res.send(product);
});

router.delete("/:id", [validateId, auth, admin], async (req, res) => {
  const product = await Product.findByIdAndRemove(req.params.id);

  if (!product)
    return res.status(404).send("The product with the given ID was not found.");

  res.send(product);
});

router.get("/:id", validateId, async (req, res) => {
  const product = await Product.findById(req.params.id).select("-__v");

  if (!product)
    return res.status(404).send("The product with the given ID was not found.");

  res.send(product);
});

function validate(product) {
  const schema = {
    name: Joi.string().min(2).max(50).required(),
    price: Joi.number().min(0).required(),
    weight: Joi.number().min(0).required(),
    amountAvailable: Joi.number().min(0).required(),
    categoryId: Joi.string().required(),
  };

  return Joi.validate(product, schema);
}

module.exports = router;
