const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path")
const router = require('../controller/routes');
const app = express();
app.use(cors()); 
app.use(express.json({limit: '500mb'}));
app.use(express.urlencoded({limit: '500mb',extended: true }));
var Port = process.env.PORT || 1000;
app.get("/",(req,res)=>{
  res.send("welcome to tender JB-Desk backend")
})
app.use("/user",router)
app.use("/public//images//", express.static(path.join("public/images/")));
app.use("/public/images/", express.static(path.join("public/images/")));
app.use("/public\\images\\", express.static(path.join("public/images/")));

app.listen(Port, () => {
  console.log(`server is listening at port ${Port}`);
});
 //database connection 
mongoose
  .connect(
 "mongodb+srv://jbdesk:jbdesks@cluster0.2uvx4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{ 
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(`DB connection failed ${err}`));
mongoose.set("useNewUrlParser", true);
mongoose.set("useCreateIndex", true);
 