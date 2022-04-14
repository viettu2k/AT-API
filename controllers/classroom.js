const Classroom = require("../models/classroom");
const { errorHandler } = require("../helpers/dbErrorHandler");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.classroomById = (req, res, next, id) => {
  Classroom.findById(id).exec((err, classroom) => {
    if (err || !classroom) {
      return res.status(400).json({
        error: "Classroom does not exist",
      });
    }
    req.classroom = classroom;
    next();
  });
};

exports.create = (req, res) => {
  const classroom = new Classroom({
    ...req.body,
    createdBy: req.profile._id,
  });
  classroom.save((err, data) => {
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
