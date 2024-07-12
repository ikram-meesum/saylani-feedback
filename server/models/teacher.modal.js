let mongoose = require("mongoose");

let teacherSchema = mongoose.Schema(
  {
    teacher: { type: String, require: true },
    batchno: { type: String, require: true },
    //   depart_id: { type: mongoose.Schema.Types.ObjectId, ref: "Fcpsward" },
  },
  { timestamps: true }
);

let Teacher = mongoose.model("teacher", teacherSchema);
module.exports = Teacher;
