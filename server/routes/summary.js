let express = require("express");
let route = express.Router();

let Comment = require("../models/comments.modal");

route.get("/", async (req, res) => {
  //   const sid = req.params.id;
  try {
    const doc = await Comment.find({})
      .populate("studentId", "sname")
      .populate("teacherId", "teacher")
      .exec();

    res.json(doc);
  } catch (err) {
    console.log("Error occured from get comment", err);
  }
});

route.post("/", async (req, res) => {
  const commentData = new Comment({
    comments: req.body.comments,
    studentId: req.body.studentId,
    teacherId: req.body.teacherId,
    rating: req.body.rating,
  });

  try {
    const result = await commentData.save();
    console.log(result); // result
    res.json(result);
  } catch (err) {
    console.error("Error ocured from insert comment.", err);
  }
});

module.exports = route;
