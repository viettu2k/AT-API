const ClassRoom = require("../models/classRoom");
const { errorHandler } = require("../helpers/dbErrorHandler");
const _ = require("lodash");

exports.create = (req, res) => {
  const classRoom = new ClassRoom({ ...req.body, createdBy: req.params });
  classRoom.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({ message: "Created successfully", data });
  });
};

exports.update = (req, res) => {
  let classRoom = req.classRoom;
  classRoom = _.extend(classRoom, req.body);
  classRoom.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};