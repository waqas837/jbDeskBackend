const express = require("express");
// user authentication for all the routes
const { Auth } = require("../middleware/Auth");
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
} = require("./userLogics");
// routes for user account/tender/poster
router.post("/signup", signup);
router.post("/login", login);
// company login
router.post("/logincompany", logincompany);
// admin login
router.post("/admin", adminlogin);
// get all the users
router.get("/getData", Auth, getData);
// delete a single user
router.delete("/deleteUser/:id", Auth, deleteUser);
// get a single user for edit
router.get("/findSingleUser/:id", Auth, findSingleUser);
// udpateUser
router.put("/udpateUser/:id", Auth, udpateUser);
// add a new job
router.post("/addnewjob", Auth, uploadImg.single("image"), addnewjob);
// get single job data
router.get("/getsinglejob", Auth, getsinglejob);
module.exports = router;
