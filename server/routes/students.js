let express = require("express");
let route = express.Router();

let Student = require("../models/student.modal");

route.get("/", async (req, res) => {
  try {
    const doc = await Student.find({})
      .populate("teacher_id", "teacher")
      .sort({ _id: -1 })
      .exec();
    // console.log(doc);
    res.json(doc);
  } catch (err) {
    console.log("Error occured from get teacher", err);
  }
});

route.get("/:id", async (req, res) => {
  const sid = req.params.id;
  try {
    const doc = await Student.find({ _id: sid })
      .populate("teacher_id", "teacher")
      .exec();
    res.json(doc);
  } catch (err) {
    console.log("Error occured from get teacher id wise: ", err);
  }
});

route.get("/total/:id", async (req, res) => {
  const tid = req.params.id;
  try {
    const doc = await Student.find({ teacher_id: tid }).exec();
    // console.log(doc);
    res.json(doc);
  } catch (err) {
    console.log("Error occured from get teacher", err);
  }
});

route.post("/", async (req, res) => {
  console.log("INSERTED");

  const studentData = new Student({
    sname: req.body.sname,
    fname: req.body.fname,
    email: req.body.email,
    password: req.body.password,
    mobile: req.body.mobile,
    cnic: req.body.cnic,
    batch: "Batch-" + req.body.batch,
    rollno: req.body.rollno,
    address: req.body.address,
    teacher_id: req.body.teacher_id,
    course: req.body.course,
  });

  console.log("server: ", studentData);

  try {
    const result = await studentData.save();
    console.log(result); // result
    res.json(result);
  } catch (err) {
    console.error("Error ocured from insert student data: ", err);
  }
});

module.exports = route;
