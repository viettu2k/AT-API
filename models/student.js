const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const classroomSchema = new mongoose.Schema(
  {
    studentId: String,
    studentName: {
      trim: true,
      required: true,
      maxlength: 50,
    },
    studentPhoto: {
      data: Buffer,
      contentType: String,
    },
    classId: { type: ObjectId, ref: "Classroom" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Classroom", classroomSchema);
