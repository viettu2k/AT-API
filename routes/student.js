const express = require("express");
const router = express.Router();

const {
  create,
  update,
  studentById,
  remove,
  listByClassroom,
  getStudentPhoto,
} = require("../controllers/student");
const { classroomById } = require("../controllers/classroom");
const { requireSignin, isAuth } = require("../controllers/auth");
const { userById } = require("../controllers/user");

router.get("/students/photo/:studentId", getStudentPhoto);
router.post("/students/:userId/:classroomId", requireSignin, isAuth, create);
router.put("/students/:userId/:studentId", requireSignin, isAuth, update);
router.delete("/students/:userId/:studentId", requireSignin, isAuth, remove);
router.get(
  "/students/:userId/:classroomId",
  requireSignin,
  isAuth,
  listByClassroom
);

router.param("studentId", studentById);
router.param("userId", userById);
router.param("classroomId", classroomById);

module.exports = router;
