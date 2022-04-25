const Attendance = require("../models/attendance");
const Student = require("../models/student");
const { errorHandler } = require("../helpers/dbErrorHandler");
const _ = require("lodash");

exports.attendanceById = (req, res, next, id) => {
  Attendance.findById(id).exec((err, classroom) => {
    if (err || !classroom) {
      return res.status(400).json({
        error: "Classroom does not exist",
      });
    }
    req.attendance = attendance;
    next();
  });
};

exports.read = (req, res) => {
  return res.json(req.attendance);
};

exports.create = async (req, res) => {
  const { classId } = req.body;
  const participants = await Student.find({ classId }).select("-photo");

  let attendance = new Attendance({
    ...req.body,
  });

  attendance = _.extend(attendance, { participants });

  attendance.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({ message: "Created successfully", data });
  });
};
