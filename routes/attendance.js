const express = require("express");
const router = express.Router();

const {
  create,
  // update,
  // studentById,
  // remove,
  // listByClassroom,
  // getStudentPhoto,
  // importStudentList,
} = require("../controllers/student");
const { classroomById } = require("../controllers/classroom");
const { requireSignin, isAuth } = require("../controllers/auth");
const { userById } = require("../controllers/user");

router.post("/attendances/:userId", create);

// router.post(
//   "/students/import-file/:userId",
//   requireSignin,
//   isAuth,
//   importStudentList
// );
// router.get("/students/photo/:studentId", getStudentPhoto);
// router.post("/students/:userId/:classroomId", requireSignin, isAuth, create);
// router.put("/students/:userId/:studentId", requireSignin, isAuth, update);
// router.delete("/students/:userId/:studentId", requireSignin, isAuth, remove);
// router.get(
//   "/students/:userId/:classroomId",
//   requireSignin,
//   isAuth,
//   listByClassroom
// );

router.param("userId", userById);
router.param("classroomId", classroomById);

module.exports = router;
