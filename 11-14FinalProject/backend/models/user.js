const mongoose = require("mongoose");
const { roleSchema } = require("./role");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  phoneNumber: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  password: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
    minlength: 1,
    maxlength: 5,
  },
  role: {
    type: roleSchema,
    required: true,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      phoneNumber: this.phoneNumber,
      balance: this.balance,
      role: this.role,
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

const User = mongoose.model("User", userSchema);

exports.User = User;
exports.userSchema = userSchema;
