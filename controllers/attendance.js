const Attendance = require("../models/attendance");
const Student = require("../models/student");
const { errorHandler } = require("../helpers/dbErrorHandler");
const _ = require("lodash");
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

exports.attendanceById = (req, res, next, id) => {
  Attendance.findById(id).exec((err, attendance) => {
    if (err || !attendance) {
      return res.status(400).json({
        error: "Attendance does not exist",
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
  const participants = await Student.find({ classId })
    .select("-photo")
    .sort("-createdAt");

  let attendance = new Attendance({
    ...req.body,
  });

  attendance = _.extend(attendance, { participants });

  attendance.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json({ message: "Created successfully", data });
  });
};

exports.update = (req, res) => {
  let attendance = req.attendance;
  attendance = _.extend(attendance, req.body);
  attendance.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};

exports.automaticallyAttendance = async (req, res) => {
  try {
    const { googleMeet } = req.body;
    const googleLogin = "https://accounts.google.com/signin";
    const browser = await puppeteer.launch({
      headless: false,
      args: [
        "--use-fake-ui-for-media-stream",
        // "--user-data-dir=/user/data/directory/profile_n",
      ],
    });
    const page = await browser.newPage();
    await page.goto(googleLogin);
    // await page.waitFor(1000);
    await page.waitForSelector('input[type="email"]');
    await page.type('input[type="email"]', "doazvjettu0012");
    await Promise.all([
      page.waitForNavigation(),
      await page.keyboard.press("Enter"),
    ]);
    await page.waitForSelector('input[type="password"]', { visible: true });
    await page.type('input[type="password"]', "d0azvjettu");
    await Promise.all([
      await page.keyboard.press("Enter"),
      page.waitForNavigation({ waitUntil: "networkidle2" }),
    ]);
    await page.goto(googleMeet);

    // await page.waitForSelector("VfPpkd-vQzf8d");
    await page.waitForTimeout(1000);

    const xp = '//*[@class="VfPpkd-vQzf8d"]';
    const [el] = await page.$x(xp);
    await el.evaluate((b) => {
      console.log("click");
      b.click();
    });
    // await page.waitForTimeout(3000);
    await page.waitForSelector(".XEazBc.adnwBd");
    const grabStudentNames = await page.evaluate(async () => {
      const nameTags = document.querySelectorAll(".XEazBc.adnwBd");
      let studentNames = [];
      nameTags.forEach((tag) => {
        studentNames.push(tag.innerText);
      });
      return studentNames;
    });

    const result = grabStudentNames;

    await browser.close();
    res.json({
      data: result,
    });
  } catch (error) {
    return res.status(500).send("Something went wrong. Please try again");
  }
};

exports.listAttendanceByClass = (req, res) => {
  Attendance.find({ classId: req.classroom._id })
    .populate("classId", "_id")
    .sort("-createdAt")
    .exec((err, attendances) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      res.json(attendances);
    });
};

exports.remove = (req, res) => {
  let attendance = req.attendance;
  attendance.remove((err, deletedAttendance) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: "Check Attendance deleted successfully",
    });
  });
};
