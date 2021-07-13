const mongoose = require("mongoose");

var approvedJobs = new mongoose.Schema({
  approved: [
    {
      userid: { type: mongoose.Schema.Types.ObjectId, ref: "candidate" },
      jobid: { type: mongoose.Schema.Types.ObjectId, ref: "singlejob" },
    },
  ],
});
const approvedModel = new mongoose.model(
  "jobandcandidateApprove",
  approvedJobs
);

module.exports = { approvedModel };
