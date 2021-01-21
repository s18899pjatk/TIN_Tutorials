const { Purchase } = require("../models/purchase");
const { User } = require("../models/user");
const { Product } = require("../models/product");
const Joi = require("joi");
const auth = require("../middlewares/auth");
const express = require("express");
const validateId = require("../middlewares/validateId");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  const purchase = await Purchase.find().select("-__v").sort("name");
  res.send(purchase);
});

router.post("/", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.body.userId);
  if (!user) return res.status(400).send(error.details[0].message);

  const product = await Product.findById(req.body.productId);
  if (!product) return res.status(400).send(error.details[0].message);

  const purchase = new Purchase({
    user: user,
    product: product,
    date: Date.now(),
  });

  await purchase.save();
  res.send(purchase);
});

router.get("/:id", validateId, async (req, res) => {
  const purchase = await Purchase.findById(req.params.id).select("-__v");

  if (!purchase)
    return res
      .status(404)
      .send("The purchase with the given ID was not found.");

  res.send({
    UserId: purchase.user._id,
    ProductId: purchase.product._id,
    date: purchase.date,
  });
});

function validate(purchase) {
  const schema = {
    userId: Joi.string().required(),
    productId: Joi.string().required(),
  };

  return Joi.validate(purchase, schema);
}

module.exports = router;
