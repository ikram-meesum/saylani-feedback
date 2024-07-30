let express = require("express");
let route = express.Router();

let Comment = require("../models/comments.modal");
const Teacher = require("../models/teacher.modal");
// const Teacher = require("../models/teacher.modal");

route.get("/", async (req, res) => {
  // const sid = req.params.id;

  // function compare( a, b ) {
  //   if ( a.rating < b.rating ){
  //     return -1;
  //   }
  //   if ( a.rating > b.rating ){
  //     return 1;
  //   }
  //   return 0;
  // }

  // objs.sort( compare );

  let allData = [];
  let teacherData = [];
  try {
    const teacher = await Teacher.find({}).exec();
    // console.log(teacher);

    for (i = 0; i < teacher.length; i++) {
      //     console.log("i: ", teacher[i]._id);
      doc = await Comment.find({ teacherId: teacher[i]._id })
        .sort({ teacherId: 1 })
        .populate("teacherId", "teacher")
        .exec();
      allData.push(doc);
    }
    var result = allData.filter((e) => e.length);
    //   console.log("test : ", result);

    res.json(result);
  } catch (err) {
    console.log("Error: ", err);
  }

  // -------------------------- SINGLE RESULT ---------------------------
  // try {
  //   const teacher = await Teacher.find({}).exec();
  //   console.log("Teacher Data: ", teacher);

  //   for (i = 0; i < teacher.length; i++) {
  //     console.log("i: ", teacher[i]._id);

  //     doc = await Comment.find({ teacherId: teacher[i]._id })
  //       .sort({ _id: -1 })
  //       .limit(1)
  //       .populate("teacherId", "teacher")
  //       .exec();
  //     allData.push(doc);
  //   }
  //   var result = allData.filter((e) => e.length);
  //   console.log("test : ", result);

  //   res.json(result);
  // } catch (err) {
  //   console.log("Error occured from get comment", err);
  // }
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
