let express = require("express");
let route = express.Router();

let Comment = require("../models/comments.modal");

route.get("/:id", async (req, res) => {
  const sid = req.params.id;
  console.log("SID : ", sid);

  try {
    const doc = await Comment.find({ studentId: sid })
      .populate("studentId", "sname")
      .populate("teacherId", "teacher")
      .exec();

    console.log("The comment is ", doc);
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

  console.log("server: ", commentData);

  try {
    const result = await commentData.save();
    console.log(result); // result
    res.json(result);
  } catch (err) {
    console.error("Error ocured from insert comment.", err);
  }
});

module.exports = route;
