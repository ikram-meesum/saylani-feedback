let express = require("express");
let route = express.Router();

let Student = require("../models/student.modal");

route.get("/", (req, res) => {
  res.send("Please login");
});

route.post("/", (req, res) => {
  try {
    Student.findOne({
      email: req.body.email,
      password: req.body.password,
      rollno: req.body.rollno,
    })
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json({
          Message: "Invalid username and password or roll number.",
          err,
        });
      });
  } catch (err) {
    console.error("Error ocured from login a student.", err);
  }
});

module.exports = route;
