const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema({
    email:{
      type: String,
    },
    supplier:{
        type: String,
    },
    date:{
      type: String,
    }
  });

const uploadSupplier = new mongoose.model('supplierFarm', supplierSchema);
module.exports = uploadSupplier;