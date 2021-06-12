const jwt = require("jsonwebtoken");
const Auth = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    //first we split our token
    const token = authorization.split(" ")[1];
    jwt.verify(token, "thissecretkeyis", function (err, decoded) {
      if (err) {
        res.json({ err: "invalid user" });
      }
      //so if and only user is authenticated then our user will move to the route otherwise not
      if (decoded) {
        next();
      }
    });
  } catch (error) {
    res.status(401).json({
      error: new Error("Invalid request"),
    });
  }
};

module.exports = { Auth };
