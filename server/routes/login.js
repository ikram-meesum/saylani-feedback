let express = require("express");
let route = express.Router();

let Student = require("../models/student.modal");

route.get("/", (req, res) => {
  res.send("Please login");
});

route.post("/", (req, res) => {
  try {
    Student.findOne({ email: req.body.email, password: req.body.password })
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json({ Message: "Invalid username and password.", err });
      });
  } catch (err) {
    console.error("Error ocured from signin student.", err);
  }
});

module.exports = route;
