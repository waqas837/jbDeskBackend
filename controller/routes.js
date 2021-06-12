const express = require("express");
const { Auth } = require("../middleware/Auth");
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
module.exports = router;
