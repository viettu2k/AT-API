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
    timeStart: {
      type: Date,
      required: [true, "Please tell us the time start"],
    },
    timeEnd: {
      type: Date,
      required: [true, "Please tell us the time end"],
    },
    classId: { type: ObjectId, ref: "Classroom" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Attendance", attendanceSchema);
