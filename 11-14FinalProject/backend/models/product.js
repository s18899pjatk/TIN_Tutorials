const mongoose = require("mongoose");
const { categorySchema } = require("./category");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
    minlength: 1,
    maxlength: 5,
  },
  weight: {
    type: Number,
    required: true,
    min: 0,
    minlength: 1,
    maxlength: 5,
  },
  amountAvailable: {
    type: Number,
    required: true,
    min: 0,
    minlength: 1,
    maxlength: 5,
  },
  category: {
    type: categorySchema,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

exports.Product = Product;
exports.productSchema = productSchema;
