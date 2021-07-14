const { usersignup } = require("../Model/userSchema");
const { company } = require("../Model/company.schema");
const { adminModel } = require("../Model/admin.schema");
const { singleJobModel } = require("../Model/singlejob.schema");
const { CvModel } = require("../Model/CandidateCVModel");
const jwt = require("jsonwebtoken");
const { CandidateModel } = require("../Model/CandidateSchema");
const { approvedModel } = require("../Model/approvedJobs");
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
  // console.log(req.file);
  // console.log(req.body);
  const { path: logo } = req.file;
  try {
    const jobs = new singleJobModel({
      role: req.body.role,
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
//delete Single Job
const deleteSingleJob = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await singleJobModel.findByIdAndDelete({ _id: id });
    if (data) {
      res.json({ success: "data deleted" });
    }
  } catch (error) {
    console.log(error);
  }
};

//find Single Job
const findSingleJob = async (req, res) => {
  const { id } = req.params;
  try {
    const results = await singleJobModel.findById({ _id: id });
    if (results) {
      res.json({ success: "true", data: results });
    }
  } catch (error) {
    console.log(error);
  }
};
//update a single job
const updateSingleJob = async (req, res) => {
  const _id = req.params.id;
  var data = req.body;
  try {
    const jobs = await singleJobModel.findByIdAndUpdate(_id, data);
    if (jobs === null) {
      res.status(404).json({
        null: new Error("All is ok but not results found your query"),
      });
    } else if (jobs !== null) {
      res.status(200).json({ success: "true", results: jobs });
    }
  } catch (error) {
    res.json({ error });
    console.log(`error during update a single job ${error}`);
  }
};
//update company logo
const logoupdate = async (req, res) => {
  const { path: logo } = req.file;
  try {
    const jobs = await singleJobModel.findByIdAndUpdate(
      { _id: req.params.id },
      { logo: logo }
    );
    if (jobs === null) {
      res.status(404).json({
        null: new Error("All is ok but not results found your query"),
      });
    } else if (jobs !== null) {
      res.status(200).json({ success: "true", results: jobs });
    }
  } catch (error) {
    res.json({ error });
    console.log(`error during update a logo ${error}`);
  }
};
//update company logo
const getCompanyData = async (req, res) => {
  try {
    //note findOne returns an object but find will give us array of results
    const jobs = await singleJobModel.find({ role: "company" });
    if (jobs === null) {
      res.status(404).json({
        null: new Error("All is ok but not results found your query"),
      });
    } else if (jobs !== null) {
      res.status(200).json({ success: "true", results: jobs });
    }
  } catch (error) {
    res.json({ error });
    console.log(`error during getting data of company ${error}`);
  }
};
// getsinglejobbyId
const getsinglejobbyId = async (req, res) => {
  const { jobId } = req.params;
  try {
    //note findOne returns an object but find will give us array of results
    const jobs = await singleJobModel.findOne({ _id: jobId });
    if (jobs === null) {
      res.status(404).json({
        null: new Error("All is ok but not results found your query"),
      });
    } else if (jobs !== null) {
      res.status(200).json({ success: "true", results: jobs });
    }
  } catch (error) {
    res.json({ error });
    console.log(`error during getting data of company by id only ${error}`);
  }
};
// getAllSingleJobData
const getAllSingleJobData = async (req, res) => {
  console.log(req.body);
  try {
    //note findOne returns an object but find will give us array of results
    // const jobs = await singleJobModel.find();
    // if (jobs === null) {
    //   res.status(404).json({
    //     null: new Error("All is ok but not results found your query"),
    //   });
    // } else if (jobs !== null) {
    //   res.status(200).json({ success: "true", results: jobs });
    // }
  } catch (error) {
    res.json({ error });
    console.log(`error during getting data of company by id only ${error}`);
  }
};
// adding a new job

//add a new cadidate
const addnewcandidate = async (req, res) => {
  const { path: profile } = req.file;
  try {
    const jobs = new CandidateModel({
      role: req.body.username,
      email: req.body.email,
      companyname: req.body.companyname,
      password: req.body.password,
      jobdescription: req.body.jobdescription,
      location: req.body.location,
      // phone: req.body.phone,
      // website: req.body.website,
      // facebook: req.body.facebook,
      // twitter: req.body.twitter,
      // linkdin: req.body.linkdin,
      profile: profile,
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
//  get candidate single record
const getcandidatesingle = async (req, res) => {
  const { email } = req.params;

  try {
    //note findOne returns an object but find will give us array of results
    const jobs = await CandidateModel.findOne({ email });
    if (jobs === null) {
      res.status(404).json({
        null: new Error("All is ok but not results found your query"),
      });
    } else if (jobs !== null) {
      res.status(200).json({ success: "true", results: jobs });
    }
  } catch (error) {
    res.json({ error });
    console.log(`error during getting data of company by id only ${error}`);
  }
};
// candidate login

const candidateLogin = async (req, res) => {
  const { email, password } = req.body;
  // var {authorization} = req.headers
  // const token = authorization.replace("Bearer ", "");
  try {
    const isExists = await CandidateModel.findOne({ email, password });

    if (isExists !== null) {
      // console.log(isExists);
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
    console.log(`error during sigin cadidate data ${error}`);
    console.log(error);
    // res.json({err:error});
  }
};
// cv upload

const cvupload = async (req, res) => {
  const { email } = req.params;
  try {
    //first we have to find a candidate
    const isExists = await CvModel.findOne({ email });
    if (isExists) {
      await CvModel.findOneAndUpdate({ email }, { $push: { cv: req.body } });
    }
    if (!isExists) {
      await CvModel.create({ email }, { cv: [req.body] });
    }
    // await isExists.save()

    // if (isExists !== null) {
    //   console.log(isExists);
    //   res.json({success:"true",message:"CV uploaded succeed"})

    // }
    // if (isExists === null) {
    //   res.json({ err: "cv upload failed" });
    // }
  } catch (error) {
    console.log(`error during cv uploading ${error}`);
    console.log(error);
    // res.json({err:error});
  }
};

// get cv data for a user
const getcvdata = async (req, res) => {
  const { email } = req.params;

  try {
    //first we have to find a candidate
    const isExists = await CvModel.findOne({ email });
    if (isExists) {
      res.json({ success: true, data: isExists });
    }
    // console.log(isExists);
  } catch (error) {
    console.log(`error during cv find ${error}`);
    console.log(error);
    // res.json({err:error});
  }
};

// search results
const searchResults = async (req, res) => {
  const { location, jobtitle } = req.body;
  try {
    // var regex = new RegExp(["^", jobtitle, "$"].join(""), "i");
    // var regex2 = new RegExp(["^", jobtitle, "$"].join(""), "i");
    //first we have to find a candidate
    const isExists = await singleJobModel
      .find()
      .or([{ location: location }, { jobtitle: jobtitle }]);

    if (isExists) {
      res.json({ success: true, searchResults: isExists });
    }
    // console.log(isExists);
  } catch (error) {
    console.log(`error search results for job${error}`);
    console.log(error);
  }
};

// apply candidate
const apply = async (req, res) => {
  const { jobid, candidateid } = req.params;
  // console.log(jobid, candidateid);
  try {
    //first find if user has already applied to this job
    const findUser = await singleJobModel.findOne({
      "candidates.candidate": candidateid,
      _id: jobid,
    });
    //if user does not applied we can apply it
    if (!findUser) {
      const isExists = await singleJobModel.findOneAndUpdate(
        { _id: jobid },
        { $push: { candidates: { candidate: candidateid } } }
      );

      if (isExists) {
        res.json({ success: true, searchResults: isExists });
      }
    } else {
      res.json({ error: "You already applied for this job" });
    }
  } catch (error) {
    console.log(`error search results for job${error}`);
    console.log(error);
  }
};
// see Applicants but find only the jobs
const seeApplicants = async (req, res) => {
  const { candidateid } = req.params;
  // console.log(jobid, candidateid);
  try {
    //first find if user has already applied to this job
    const findUser = await singleJobModel.find({
      "candidates.candidate": { $exists: true },
    });
    if (findUser) {
      res.json({ success: true, results: findUser });
    }
  } catch (error) {
    console.log(`error search results for job${error}`);
    console.log(error);
  }
};
// see Applicants
const seeApplicantsDetails = async (req, res) => {
  const { candidateid, jobid } = req.params;
  // console.log(jobid, candidateid);
  try {
    //first find if user has already applied to this job
    const findUser = await singleJobModel
      .find({
        "candidates.candidate": { $exists: true },
        _id: jobid,
      })
      .populate("candidates.candidate")
      .select("candidate.candidate");
    if (findUser) {
      res.json({ success: true, results: findUser });
    }
  } catch (error) {
    console.log(`error search results for job${error}`);
    console.log(error);
  }
};
// approve application
const approve = async (req, res) => {
  const { candidateid, jobid } = req.params;
  // console.log(jobid, candidateid);
  try {
    //first find if user has already applied to this job
    const findUser = await approvedModel.create({
      approved: [{ userid: candidateid, jobid: jobid }],
    });
    if (findUser) {
      res.json({ success: true, results: findUser });
    }
  } catch (error) {
    console.log(`error search results for job${error}`);
    console.log(error);
  }
};
// notifications For ApprovedJobs
const notificationsForApprovedJobs = async (req, res) => {
  const { candidateid } = req.params;
  try {
    const data = await approvedModel
      .find({ "approved.userid": candidateid })
      .populate("approved.jobid")
      .select("jobid");
    // flatMap is used for concat the different arrays into one array
    //  when we don't know the length of array
    //  and it is very useful
    const newdata = data.flatMap((val) => val.approved.map((val) => val.jobid));
    res.json({ success: true, results: newdata });
  } catch (error) {
    console.log(`error search results for job${error}`);
    console.log(error);
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
  deleteSingleJob,
  findSingleJob,
  updateSingleJob,
  logoupdate,
  getCompanyData,
  getsinglejobbyId,
  getAllSingleJobData,
  addnewcandidate,
  getcandidatesingle,
  candidateLogin,
  cvupload,
  getcvdata,
  searchResults,
  apply,
  seeApplicants,
  seeApplicantsDetails,
  approve,
  notificationsForApprovedJobs,
};
