let express = require("express");
let route = express.Router();

let Comment = require("../models/comments.modal");
const Teacher = require("../models/teacher.modal");
const Student = require("../models/student.modal");

route.get("/", async (req, res) => {
  let allData = [];
  let teacherData = [];
  try {
    const teacher = await Teacher.find({}).exec();

    for (i = 0; i < teacher.length; i++) {
      //     console.log("i: ", teacher[i]._id);
      doc = await Comment.find({ teacherId: teacher[i]._id })
        .sort({ teacherId: 1 })
        .populate("teacherId", "teacher")
        .exec();

      allData.push(doc);
    }
    var result = allData.filter((e) => e.length);

    // ================ SECOND TASK ================

    for (a = 0; a < result.length; a++) {
      for (b = 0; b < result[a].length; b++) {
        // console.log("abc : ", result[a][b].teacherId._id);
        teacherData.push(result[a][b].teacherId._id);
      }
    }
    uniq = [...new Set(teacherData)];

    let finalCount = [];

    for (c = 0; c < uniq.length; c++) {
      // Count Student
      std = await Student.countDocuments({
        teacher_id: uniq[c],
      }).exec();
      finalCount.push({ tid: uniq[c], count: std });
    }

    console.log("FINAL : ", result);

    res.json({ comments: result, count: finalCount });
    // res.json(result);
  } catch (err) {
    console.log("Error: ", err);
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
