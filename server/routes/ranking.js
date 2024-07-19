let express = require("express");
let route = express.Router();

let Comment = require("../models/comments.modal");
const Teacher = require("../models/teacher.modal");
// const Teacher = require("../models/teacher.modal");

route.get("/", async (req, res) => {
  // const sid = req.params.id;
  let allData = [];
  let teacherData = [];

  try {
    const teacher = await Teacher.find({}).exec();
    console.log("Teacher Data: ", teacher);

    for (i = 0; i < teacher.length; i++) {
      console.log("i: ", teacher[i]._id);

      doc = await Comment.find({ teacherId: teacher[i]._id })
        .sort({ _id: -1 })
        .limit(1)
        //     //   .populate("studentId", "sname")
        .populate("teacherId", "teacher")
        //     // .select("teacherId rating")
        .exec();
      // if (doc == null || doc == "" || doc == undefined) {
      allData.push(doc);
      // }
    }
    // console.log("alldata: ", allData);

    // allData = allData.filter((item) => !!item);

    // var filtered = allData.filter(function (el) {
    //   return el != null;
    // });

    var result = allData.filter((e) => e.length);
    console.log("test : ", result);

    // console.log("test:", filtered);

    // console.log("test", allData);

    // doc = await Comment.find({})
    //   .sort({ _id: -1 })
    //   // .limit(1)
    //   //     //   .populate("studentId", "sname")
    //   //     // .populate("teacherId", "teacher")
    //   //     // .select("teacherId rating")
    //   .exec();
    // });

    // let doc = [];
    // teacher.forEach((element) => {
    //   console.log("teacher id : ", element._id);
    //   doc = Comment.find({ teacherId: element._id })
    //     .sort({ _id: -1 })
    //     .limit(1)
    //     //   .populate("studentId", "sname")
    //     // .populate("teacherId", "teacher")
    //     // .select("teacherId rating")
    //     .exec();
    // });

    // console.log("doc: ", doc);
    res.json(result);
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
