let express = require("express");
const {dbConnect} = require("./config/dbConnection");
require("dotenv").config();
const cors = require("cors");
const App = express();

App.use(express.json());
App.use(cors());

App.post("/student/insert",async (req,res)=>{
    const {fullName,email,phone} = req.body;

    console.log(req.body);

    insertObj= {
        fullName,email,phone
    }
    
    let db = await dbConnect(); 

    let student = await db.collection("students");
    let insRes = await student.insertOne(insertObj);

    let resObj = {
    status: "success",
    message: `Student ${fullName} inserted`,
    data: insRes
    }

    res.send(resObj);
})

App.get("/student/view",async (req,res)=>{

    let db = await dbConnect(); 
    let student = await db.collection("students");

    let data = await student.find().toArray();

    let resObj = {
        status: "success",
        message: "Student data fetched",
        data: data
    }

    res.send(resObj);
})

App.delete("/student/delete",async (req,res)=>{
    let {fullName, email, phone} = req.body;

    let db = await dbConnect(); 
    let student = await db.collection("students");

    let datadel = await student.deleteOne({fullName, email, phone});

    let resObj = {
        status: "success",
        message: `Student ${fullName} Deleted`,
        data: datadel
    }

    res.send(resObj);
})

App.patch("/student/update", async (req, res) => {
  const { fullName, email, phone, oldFullName, oldEmail, oldPhone } = req.body;
  let db = await dbConnect();
  let student = await db.collection("students");
  // Find by old values, update to new values
  let updateRes = await student.updateOne(
    { fullName: oldFullName, email: oldEmail, phone: oldPhone },
    { $set: { fullName, email, phone } }
  );
  res.send({
    status: "success",
    message: `Student ${fullName} updated`,
    data: updateRes
  });
});

App.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})