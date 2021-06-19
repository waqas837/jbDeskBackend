const { usersignup } = require("../Model/userSchema");
const { company } = require("../Model/company.schema");
const { adminModel } = require("../Model/admin.schema");
const { singleJobModel } = require("../Model/singlejob.schema");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
// signup user
const signup = async (req, res) => {
  const data = req.body;
  // console.log(data);
  try {
    const dataCheck = new usersignup(data);
    await dataCheck.save();
    if (dataCheck !== null) {
      jwt.sign(
        { email: dataCheck.email },
        "thisisthesecretkey",
        function (err, token) {
          res.json({ token: token, userData: dataCheck });
          console.log(err);
        }
      );
    }
  } catch (error) {
    console.log(`error during signup ${error}`);
    // console.log(error);
    res.json(error);
  }
};

//signin user
const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  // var {authorization} = req.headers
  // const token = authorization.replace("Bearer ", "");
  try {
    const isExists = await usersignup.findOne({ email, password });

    if (isExists !== null) {
      console.log(isExists);
      //  we have to create the token here
      jwt.sign(
        { email: isExists.email },
        "thissecretkeyis",
        function (err, token) {
          res.json({ token: token, status: "ok", userData: isExists });
          console.log(err);
          console.log(token);
        }
      );
    }
    if (isExists === null) {
      res.json({ err: "user does not exists" });
    }
  } catch (error) {
    console.log(`error during sigin the data ${error}`);
    console.log(error);
    // res.json({err:error});
  }
};

//signin company
const logincompany = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  // var {authorization} = req.headers
  // const token = authorization.replace("Bearer ", "");
  try {
    const isExists = await company.findOne({ email, password });
    if (isExists !== null) {
      console.log(isExists);
      //  we have to create the token here
      jwt.sign(
        { email: isExists.email },
        "thissecretkeyis",
        function (err, token) {
          res.json({ token: token, status: "ok", userData: isExists });
          console.log(err);
          console.log(token);
        }
      );
    }
    if (isExists === null) {
      res.json({ err: "user does not exists" });
    }
  } catch (error) {
    console.log(`error during sigin the data ${error}`);
    console.log(error);
    // res.json({err:error});
  }
};
//signin admin
const adminlogin = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const isExists = await adminModel.findOne({ email, password });
    if (isExists !== null) {
      console.log(isExists);
      //  we have to create the token here
      jwt.sign(
        { email: isExists.email },
        "thissecretkeyis",
        function (err, token) {
          res.json({ token: token, status: "ok", userData: isExists });
          console.log(err);
          console.log(token);
        }
      );
    }
    if (isExists === null) {
      res.json({ err: "user does not exists" });
    }
  } catch (error) {
    console.log(`error during sigin the data ${error}`);
    console.log(error);
    // res.json({err:error});
  }
};

//next routes
//get all the users
const getData = async (req, res) => {
  try {
    const users = await usersignup.find();
    if (users === null) {
      res.status(404).json({
        null: new Error("All is ok but not results found your query"),
      });
    } else if (users !== null) {
      res.status(200).json({ success: "true", results: users });
    }
  } catch (error) {
    res.json({ error });
    console.log(`error during finding all the users ${error}`);
  }
};
//delete a single user by id
const deleteUser = async (req, res) => {
  try {
    const users = await usersignup.findByIdAndDelete({ _id: req.params.id });
    if (users !== null) {
      res.status(200).json({ success: true });
    } else if (users === null) {
      res.status(404).json({ error: new Error("error occured") });
    }
  } catch (error) {
    res.json({ error });
    console.log(`error during delete single users ${error}`);
  }
};

//find as single user for edit
const findSingleUser = async (req, res) => {
  try {
    const users = await usersignup.findById({ _id: req.params.id });
    if (users === null) {
      res.status(404).json({
        null: new Error("All is ok but not results found your query"),
      });
    } else if (users !== null) {
      res.status(200).json({ success: "true", results: users });
    }
  } catch (error) {
    res.json({ error });
    console.log(`error during finding all the users ${error}`);
  }
};
//find and update a single user
const udpateUser = async (req, res) => {
  try {
    const users = await usersignup.findByIdAndUpdate(
      { _id: req.params.id },
      req.body
    );
    if (users === null) {
      res.json({
        null: new Error("All is ok but not results found your query"),
      });
    } else if (users !== null) {
      res.json({ success: "true", results: users });
    }
  } catch (error) {
    res.json({ error });
    console.log(`error during finding all the users ${error}`);
  }
};

//add a new job
const addnewjob = async (req, res) => {
  console.log(req.file);
  console.log(req.body);
  const { path: logo } = req.file;
  try {
    const jobs = new singleJobModel({
      jobtitle: req.body.jobtitle,
      companyname: req.body.companyname,
      date: req.body.date,
      location: req.body.location,
      workinghours: req.body.workinghours,
      type: req.body.type,
      salary: req.body.salary,
      category: req.body.category,
      experience: req.body.experience,
      jobdescription: req.body.jobdescription,
      minimumqulification: req.body.minimumqulification,
      howtoapply: req.body.howtoapply,
      jobresp: req.body.jobresp,
      totalhrs: req.body.totalhrs,
      time: req.body.time,
      logo: logo,
    });
    await jobs.save();
    if (jobs === null) {
      res.status(404).json({
        null: new Error("All is ok but not results found your query"),
      });
    } else if (jobs !== null) {
      res.status(200).json({ success: "true", results: jobs });
    }
  } catch (error) {
    res.json({ error });
    console.log(`error during finding all the jobs ${error}`);
  }
};
//get a single job data
const getsinglejob = async (req, res) => {
  try {
    const jobs = await singleJobModel.find();
    if (jobs === null) {
      res.status(404).json({
        null: new Error("All is ok but not results found your query"),
      });
    } else if (jobs !== null) {
      res.status(200).json({ success: "true", results: jobs });
    }
  } catch (error) {
    res.json({ error });
    console.log(`error during finding all the jobs ${error}`);
  }
};

module.exports = {
  signup,
  login,
  logincompany,
  adminlogin,
  getsinglejob,
  getData,
  deleteUser,
  findSingleUser,
  udpateUser,
  addnewjob,
};
