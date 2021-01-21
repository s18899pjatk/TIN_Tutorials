const mongoose = require("mongoose");
const { productSchema } = require("./product");
const { userSchema } = require("./user");
const Purchase = mongoose.model(
  "Purchase",
  new mongoose.Schema({
    user: {
      type: userSchema,
      required: true,
    },
    product: {
      type: productSchema,
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
  })
);

exports.Purchase = Purchase;
