const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  email: String,
  category: String,
  date: String,
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
