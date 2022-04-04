const Classroom = require("../models/classroom");
const { errorHandler } = require("../helpers/dbErrorHandler");
const _ = require("lodash");

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