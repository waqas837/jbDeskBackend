const mongoose = require("mongoose");

var cvSchema = new mongoose.Schema({
  email: String,
  cv: [
    {
      fullname: String,
      phone: String,
      email: String,
      address: String,
      position: String,
      company: String,
      location: String,
      startdate: String,
      enddate: String,
      institute: String,
      degree: String,
      locationForStudy: String,
      object: String,
      degreedated: String,
      locationForStudy: String,
      skills: String,
      level: String,
    },
  ],
});

const CvModel = new mongoose.model("cv", cvSchema);

module.exports = { CvModel };
