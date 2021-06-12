const mongoose = require("mongoose");
const validator = require("validator");

var adminSch = new mongoose.Schema({
  username:{
    type: String,
    required:true
  },
  email: {
    unique: true,
    type: String,
    validate(val) {
      if (!validator.isEmail(val)) throw new Error("emailWrongPattern");
    },
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

}); 
 
const adminModel = new mongoose.model("admin", adminSch);
 
module.exports = { adminModel };
