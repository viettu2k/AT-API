const express = require("express");
const router = express.Router();

const {
  create,
  attendanceById,
  update,
  automaticallyAttendance,
  listAttendanceByClass,
  // studentById,
  remove,
  // listByClassroom,
  // getStudentPhoto,
  // importStudentList,
} = require("../controllers/attendance");
const { classroomById } = require("../controllers/classroom");
const { requireSignin, isAuth } = require("../controllers/auth");
const { userById } = require("../controllers/user");

router.post("/attendances/automatic/:attendanceId", automaticallyAttendance);
router.post("/attendances/:userId", requireSignin, isAuth, create);
router.put("/attendances/:userId/:attendanceId", requireSignin, isAuth, update);
router.get(
  "/attendances/:userId/:classroomId",
  requireSignin,
  isAuth,
  listAttendanceByClass
);
router.delete(
  "/attendances/:userId/:attendanceId",
  requireSignin,
  isAuth,
  remove
);

// router.post(
//   "/students/import-file/:userId",
//   requireSignin,
//   isAuth,
//   importStudentList
// );
// router.get("/students/photo/:studentId", getStudentPhoto);
// router.post("/students/:userId/:classroomId", requireSignin, isAuth, create);
// router.delete("/students/:userId/:studentId", requireSignin, isAuth, remove);
// router.get(
//   "/students/:userId/:classroomId",
//   requireSignin,
//   isAuth,
//   listByClassroom
// );

router.param("userId", userById);
router.param("classroomId", classroomById);
router.param("attendanceId", attendanceById);

module.exports = router;
