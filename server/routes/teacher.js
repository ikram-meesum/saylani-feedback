let express = require("express");
let route = express.Router();

let Teacher = require("../models/teacher.modal");

route.get("/", async (req, res) => {
  // const sid = req.params.id;
  try {
    const doc = await Teacher.find({});
    console.log(doc);
    res.json(doc);
  } catch (err) {
    console.log("Error occured from get teacher", err);
  }
});

route.post("/", async (req, res) => {
  const teacherData = new Teacher({
    teacher: req.body.teacher,
    batchno: "Batch-" + req.body.batchno,
  });
  console.log("server: ", teacherData);

  try {
    const result = await teacherData.save();
    console.log(result); // result
    res.json(result);
  } catch (err) {
    console.error("Error ocured from insert teacher.", err);
  }
});

module.exports = route;
