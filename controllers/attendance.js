const Attendance = require("../models/attendance");
const { errorHandler } = require("../helpers/dbErrorHandler");
const _ = require("lodash");
const fs = require("fs");

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

exports.create = (req, res) => {
  const students = Student.find({ classId: req.classroom._id }).select(
    "-photo"
  );
  console.log(students);

  const attendance = new Attendance({
    ...req.body,
    createdBy: req.profile._id,
  });
  attendance.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({ message: "Created successfully", data });
  });
};

exports.update = (req, res) => {
  let classroom = req.classroom;
  classroom = _.extend(classroom, req.body);
  classroom.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};

exports.remove = (req, res) => {
  const classroom = req.classroom;
  classroom.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: "Classroom deleted",
    });
  });
};

exports.listByUser = (req, res) => {
  Classroom.find({ createdBy: req.profile._id })
    .populate("createdBy", "_id")
    .sort("-createdAt")
    .exec((err, classRooms) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      res.json(classRooms);
    });
};

exports.addStudent = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Photo could not be uploaded",
      });
    }
    const { _id } = req.classroom;
    const { studentName, studentId } = fields;
    let student = {
      studentName,
      studentId,
      studentPhoto: { data: "", contentType: "" },
    };

    if (files.studentPhoto) {
      student.studentPhoto.data = fs.readFileSync(files.studentPhoto.path);
      student.studentPhoto.contentType = files.studentPhoto.type;
    }

    Classroom.findByIdAndUpdate(
      _id,
      {
        $push: {
          participants: student,
        },
      },
      { new: true }
    ).exec((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      } else {
        res.json(result);
      }
    });
  });
};
