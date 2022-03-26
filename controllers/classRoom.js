const ClassRoom = require("../models/classRoom");
const { errorHandler } = require("../helpers/dbErrorHandler");

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
