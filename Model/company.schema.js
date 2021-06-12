const mongoose = require("mongoose");
const validator = require("validator");

var compSch = new mongoose.Schema({
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
 
const company = new mongoose.model("companyModel", compSch);
 
module.exports = { company };
