let mongoose = require("mongoose");

let studentSchema = mongoose.Schema(
  {
    sname: { type: String, uppercase: true },
    fname: { type: String, uppercase: true },
    email: { type: String, lowercase: false },
    mobile: { type: String },
    cnic: { type: String },
    batch: { type: String },
    password: { type: String },
    rollno: { type: String },
    address: { type: String },
    teacher_id: { type: mongoose.Schema.Types.ObjectId, ref: "teacher" },
  },
  { timestamps: true }
);

let Student = mongoose.model("student", studentSchema);
module.exports = Student;
