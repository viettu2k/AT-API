const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const Student = require('../models/student');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.studentById = (req, res, next, id) => {
    Student.findById(id).exec((err, student) => {
        if (err || !student) {
            return res.status(400).json({
                error: 'Student not found',
            });
        }
        req.student = student;
        next();
    });
};

exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, async(err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded',
            });
        }
        const studentExits = await Student.exists({ studentId: fields.studentId });
        if (studentExits && studentExits.classId === fields.classId) {
            return res
                .status(409)
                .json({ error: 'The student has been already in class.' });
        }
        const { _id } = req.classroom;
        let student = new Student({...fields, classId: _id });
        student.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err),
                });
            }
            res.json({ result, message: 'Adding a student successfully.' });
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
            message: 'Student deleted successfully',
        });
    });
};

exports.update = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, async(err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded',
            });
        }
        const studentExits = await Student.exists({
            studentId: fields.studentId,
        });
        if (studentExits && studentExits.classId === fields.classId) {
            return res
                .status(409)
                .json({ error: 'The student has been already in class.' });
        }

        let student = req.student;
        student = _.extend(student, fields);

        if (files.photo) {
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: 'Image should be less than 1mb in size',
                });
            }
            student.photo.data = fs.readFileSync(files.photo.path);
            student.photo.contentType = files.photo.type;
        }

        student.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err),
                });
            }
            res.json({ result, message: 'Edit student successfully.' });
        });
    });
};

exports.listByClassroom = (req, res) => {
    Student.find({ classId: req.classroom._id })
        .select('-photo')
        .sort('createdAt')
        .exec((err, classRooms) => {
            if (err) {
                return res.status(400).json({ error: err });
            }
            res.json(classRooms);
        });
};

exports.getStudentPhoto = (req, res, next) => {
    if (req.student.photo.data) {
        res.set(('Content-Type', req.student.photo.contentType));
        return res.send(req.student.photo.data);
    }
    next();
};

exports.importStudentList = async(req, res) => {
    try {
        const { classId, students } = req.body;
        students.map(async(student) => {
            const studentExits = await Student.findOne({
                studentId: student.ID,
                classId,
            });

            if (!studentExits || !String(studentExits.classId).includes(classId)) {
                const studentDB = await new Student({
                    studentId: student.ID,
                    studentName: student.Name,
                    classId,
                });

                studentDB.save((err, result) => {
                    if (err) {
                        return res.status(400).json({ error: err });
                    }
                });
            }
        });
        res.json({
            message: 'Import Successfully.',
        });
    } catch (error) {
        return res.status(500).send('Something went wrong. Please try again');
    }
};