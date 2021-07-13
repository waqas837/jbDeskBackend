const mongoose = require("mongoose");

var singlejob = new mongoose.Schema({
  role: {
    type: String,
  },
  jobtitle: {
    type: String,
    trim: true,
    // required: true,
  },
  companyname: {
    type: String,
    // required: true,
  },
  date: {
    type: String,
    // required: true,
  },
  location: {
    type: String,
    trim: true,
    // required: true,
  },

  workinghours: {
    type: String,
    // required: true,
  },
  salary: {
    type: String,
    // required: true,
  },
  category: {
    type: String,
    // required: true,
  },
  experience: {
    type: String,
    // required: true,
  },
  jobdescription: {
    type: String,
    // required: true,
  },
  minimumqulification: {
    type: String,
    // required: true,
  },
  howtoapply: {
    type: String,
    // required: true,
  },

  jobresp: {
    type: String,
    // required: true,
  },
  totalhrs: {
    type: String,
    // required: true,
  },
  time: {
    type: String,
    // required: true,
  },
  logo: {
    type: String,
    // required: true,
  },
  candidates: [
    {
      candidate: { type: mongoose.Schema.Types.ObjectId, ref: "candidate" },
      approved: false,
    },
  ],
});

const singleJobModel = new mongoose.model("singlejob", singlejob);

module.exports = { singleJobModel };
