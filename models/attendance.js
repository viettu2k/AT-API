const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const attendanceSchema = new mongoose.Schema(
  {
    className: {
      type: String,
      trim: true,
      required: true,
      maxlength: 50,
    },
    participants: [
      {
        studentName: String,
        studentId: String,
        status: { type: Boolean, default: false },
        ID: { type: ObjectId, ref: "Student" },
      },
    ],
    createdBy: { type: ObjectId, ref: "User" },
    classId: { type: ObjectId, ref: "Classroom" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Classroom", classroomSchema);
