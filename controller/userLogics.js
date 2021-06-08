const { usersignup } = require("../Database/userSchema");
 const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
// signup user /tender/poster
const signup = async (req, res) => {
  const data = req.body;
  // console.log(data);
  try {
    if(data.password!==data.cpassword){
      res.json({passerr:"passerr"})
    }
       if(data.password===data.cpassword){
        const dataCheck = new usersignup(data);
        await dataCheck.save();
        res.json({userData:dataCheck});
      //   jwt.sign({ email: dataCheck.email }, "thisisthesecretkey", function(err, token) {
      //   res.json({token:token,userData:dataCheck});
      //   console.log(err);
      //  });
       }

  } catch (error) {
    console.log(`error during signup ${error}`);
    // console.log(error);
    res.json(error);
  }
};

//signin tender/poster
const singin = async (req, res) => {
  const { email, password} = req.body;
  // var {authorization} = req.headers
  // const token = authorization.replace("Bearer ", "");
   try {
    const isExists = await usersignup.findOne({email,password});
     if (isExists===null) {
      res.json({ err: "user does not exists" });
    }
    if (isExists !== null) {
       res.json({ success: "true", user: isExists })
       //we have to create the token here
      //  jwt.sign({ email: dataCheck.email }, "thisisthesecretkey", function(err, token) {
      //   res.json({token:token,userData:dataCheck});
      //   console.log(err);
      //  });      
    }

  } catch (error) {
    console.log(`error during sigin the data ${error}`);
    console.log(error);
    // res.json({err:error});
  }
};

//next routes
//check the user for next routes is authentic or not
      // jwt.verify(token, 'thisisthesecretkey', function(err, decoded) {
      //    res.json({ success: "true", user: isExists })  
      //    if(err){
      //     res.json({ValidUser:"false"})
      //    }
      // });
 
module.exports = {
  signup,
  singin
};
