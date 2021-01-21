const bcrypt = require("bcrypt");
const Joi = require("joi");
const _ = require("lodash");
const { User } = require("../models/user");
const { Role } = require("../models/role");
const express = require("express");
const router = express.Router();
const validateId = require("../middlewares/validateId");

router.get("/:id", validateId, async (req, res) => {
  const user = await User.findById(req.params.id).select("-__v");

  if (!user)
    return res.status(404).send("The user with the given ID was not found.");

  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validateRegistering(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ phoneNumber: req.body.phoneNumber });
  if (user) return res.status(400).send("User already registered.");

  user = new User(_.pick(req.body, ["name", "phoneNumber", "password"]));
  const salt = await bcrypt.genSalt(10);

  user.password = await bcrypt.hash(user.password, salt);
  user.balance = 0;
  user.role = await Role.findOne({ name: "Customer" });

  await user.save();

  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(_.pick(user, ["_id", "name", "email"]));
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const role = await Role.findById(req.body.roleId);
  if (!role) return res.status(400).send("Invalid role.");

  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      password: req.body.password,
      balance: req.body.balance,
      role: role,
    },
    { new: true }
  );

  if (!user)
    return res.status(404).send("The user with the given ID was not found.");

  res.send(user);
});

function validateRegistering(user) {
  const schema = {
    phoneNumber: Joi.string().min(5).max(255).required(),
    password: Joi.string().min(5).max(255).required(),
    name: Joi.string().min(2).max(50).required(),
  };

  return Joi.validate(user, schema);
}

function validate(user) {
  const schema = {
    phoneNumber: Joi.string().min(5).max(255).required(),
    password: Joi.string().min(5).max(255).required(),
    name: Joi.string().min(2).max(50).required(),
    balance: Joi.number().min(0).required(),
    roleId: Joi.string().required(),
  };

  return Joi.validate(user, schema);
}

module.exports = router;
