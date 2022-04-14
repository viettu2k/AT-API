const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const classroomSchema = new mongoose.Schema(
  {
    className: {
      type: String,
      trim: true,
      required: true,
      maxlength: 50,
    },
    participants: [
      {
        studentId: String,
        studentName: String,
        studentPhoto: {
          data: Buffer,
          contentType: String,
        },
      },
    ],
    createdBy: { type: ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Classroom", classroomSchema);
