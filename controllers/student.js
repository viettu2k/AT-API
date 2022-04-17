const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const Student = require("../models/student");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.studentById = (req, res, next, id) => {
  Student.findById(id)
    .populate("category")
    .exec((err, student) => {
      if (err || !student) {
        return res.status(400).json({
          error: "Product not found",
        });
      }
      req.student = student;
      next();
    });
};

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }

    let student = new Student(fields);

    if (files.studentPhoto) {
      if (files.studentPhoto.size > 1000000) {
        return res.status(400).json({
          error: "Image should be less than 1mb in size",
        });
      }
      student.studentPhoto.data = fs.readFileSync(files.studentPhoto.path);
      student.studentPhoto.contentType = files.studentPhoto.type;
    }

    student.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(result);
    });
  });
};

exports.remove = (req, res) => {
  let student = req.student;
  student.remove((err, deletedStudent) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: "Student deleted successfully",
    });
  });
};

exports.update = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }

    let student = req.student;
    student = _.extend(student, fields);

    if (files.studentPhoto) {
      if (files.studentPhoto.size > 1000000) {
        return res.status(400).json({
          error: "Image should be less than 1mb in size",
        });
      }
      student.studentPhoto.data = fs.readFileSync(files.studentPhoto.path);
      student.studentPhoto.contentType = files.studentPhoto.type;
    }

    student.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(result);
    });
  });
};
