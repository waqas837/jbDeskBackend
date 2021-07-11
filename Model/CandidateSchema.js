const mongoose = require("mongoose");
const validator = require("validator");

var cadidateSchema = new mongoose.Schema({
  profile: {
    type: String,
  },
  username: {
    type: String,
   
  },
  email: {
    unique: true,
    type: String,
    validate(val) {
      if (!validator.isEmail(val)) throw new Error("emailWrongPattern");
    },
   
  },
  password: {
    type: String,
   
  },
  jobdescription: {
    type: String,
   
  },
  location: {
    type: String,
   
  },
  phone: {
    type: String,
   
  },

  website: {
    type: String,
   
  },
  facebook: String,
  twitter: String,
  linkdin: String,
});

const CandidateModel = new mongoose.model("candidate", cadidateSchema);

module.exports = { CandidateModel };
