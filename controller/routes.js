const express = require("express");
const uploadImg = require("../middleware/uploadImg");
const router = express.Router();
const {
  login,
  signup,
  logincompany,
  adminlogin,
  getData,
  deleteUser,
  findSingleUser,
  udpateUser,
  addnewjob,
  getsinglejob,
  deleteSingleJob,
  findSingleJob,
  updateSingleJob,
  logoupdate,
  getCompanyData,
  getsinglejobbyId,
  getAllSingleJobData,
  addnewcandidate,
  getcandidatesingle,
  getcvdata,
  candidateLogin,
  cvupload,
} = require("./userLogics");
// routes for user account/tender/poster
router.post("/signup", signup);
router.post("/login", login);
// company login
router.post("/logincompany", logincompany);
// admin login
router.post("/admin", adminlogin);
// get all the users
router.get("/getData", getData);
// delete a single user
router.delete("/deleteUser/:id", deleteUser);
// get a single user for edit
router.get("/findSingleUser/:id", findSingleUser);
// udpateUser
router.put("/udpateUser/:id", udpateUser);
// add a new job
router.post("/addnewjob", uploadImg.single("image"), addnewjob);
// get single job data
router.get("/getsinglejob", getsinglejob);
//delete a single job
router.delete("/deleteAsingleJob/:id", deleteSingleJob);
// find Single Job
router.get("/findSingleJob/:id", findSingleJob);
// find Single Job
router.patch("/updateSingleJob/:id", updateSingleJob);
//logo update
router.put("/logoupdate/:id", uploadImg.single("image"), logoupdate);
//get the company data
router.get("/getCompanyData", getCompanyData);
//get single jobby Id
router.get("/getsinglejobbyId/:jobId", getsinglejobbyId);
// get all single data
router.post("/getAllSingleJobData", getAllSingleJobData);
// addnewcandidate
router.post("/addnewcandidate", uploadImg.single("profile"), addnewcandidate);
// get record of a single candidate
router.get("/getcandidatesingle/:email", getcandidatesingle);
// candidate login
router.post("/candidateLogin", candidateLogin);
// upload cv
router.post("/uploadcv/:email", cvupload);
// /getcvdata
router.get("/getcvdata/:email", getcvdata);

module.exports = router;
