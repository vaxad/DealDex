const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  prices: 
  [{
    price: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
      required: true,
    }
  }],
  keywords: {
    type: [String],
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
    required: false,
  },
  brand: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: false,
  },
  images: {
    type: [String],
    required: true,
  }
});

const Product = mongoose.model('ProductTest', productSchema);

module.exports = Product;
