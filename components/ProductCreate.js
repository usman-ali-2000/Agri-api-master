const mongoose = require('mongoose');

const productcreateSchema = new mongoose.Schema({
  email: String,
  category: String,
  product: String,
  date: String,
});

const ProductCreateSchema = mongoose.model('productcreate', productcreateSchema);

module.exports = ProductCreateSchema;
