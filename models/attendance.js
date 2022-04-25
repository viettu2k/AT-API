const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const attendanceSchema = new mongoose.Schema(
  {
    participants: [
      {
        studentName: String,
        studentId: String,
        status: { type: Boolean, default: false },
      },
    ],
    timeStart: Date,
    timeEnd: Date,
    classId: { type: ObjectId, ref: "Classroom" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Attendance", attendanceSchema);
