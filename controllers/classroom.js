const Classroom = require("../models/classroom");
const { errorHandler } = require("../helpers/dbErrorHandler");
const _ = require("lodash");

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