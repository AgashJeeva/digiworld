const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
  color: String,
  images: [String],
  stock: { type: Number, default: 0 }
}, { _id: false });

const optionSchema = new mongoose.Schema({
  ram: String,
  storage: String,
  variants: [variantSchema]
}, { _id: false });

const accessorySchema = new mongoose.Schema({
  name: String,
  category: String,
  colors: [String],
  stock: { type: Number, default: 0 },
  price: Number
}, { _id: false });

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: String,
  brand: String,
  category: { type: String, required: true }, // phone/laptop/tablet/accessory/macbook/ipad...
  description: String,
  basePrice: Number,
  options: [optionSchema],
  accessories: [accessorySchema],
  globalStock: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
