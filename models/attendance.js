const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const attendanceSchema = new mongoose.Schema(
  {
    participants: [
      {
        studentName: String,
        studentId: String,
        status: { type: Boolean, default: false },
        ID: { type: ObjectId, ref: "Student" },
      },
    ],
    timeStart: Date,
    timeEnd: Date,
    createdBy: { type: ObjectId, ref: "User" },
    classId: { type: ObjectId, ref: "Classroom" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Attendance", attendanceSchema);
