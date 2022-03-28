const User = require("../models/user");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({ error: "User not found" });
        }
        req.profile = user;
        next();
    });
};

exports.read = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    req.profile.photo = undefined;
    return res.json(req.profile);
};

exports.update = (req, res) => {
    let form = new formidable.IncomingForm();
    // console.log("incoming form data: ", form);
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Photo could not be uploaded",
            });
        }
        // save user
        let user = req.profile;
        user = _.extend(user, fields);

        if (files.photo) {
            user.photo.data = fs.readFileSync(files.photo.path);
            user.photo.contentType = files.photo.type;
        }

        user.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err,
                });
            }
            result.hashed_password = undefined;
            result.salt = undefined;
            result.photo = undefined;
            res.json(result);
        });
    });
};