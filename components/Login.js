const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema({
    email:{
      type: String,
    },
    password:{
        type: String,
    }
  });

const uploadLogin = new mongoose.model('uploadLogin', loginSchema);
module.exports = uploadLogin;