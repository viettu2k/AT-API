const express = require("express");
const router = express.Router();

const {
  create,
  update,
  studentById,
  remove,
} = require("../controllers/student");
const { classroomById } = require("../controllers/classroom");
const { requireSignin, isAuth } = require("../controllers/auth");
const { userById } = require("../controllers/user");

router.post("/students/:classroomId", requireSignin, isAuth, create);
router.put("/students/:studentId", requireSignin, isAuth, update);
router.delete("/students/:studentId", requireSignin, isAuth, remove);
router.get("/students/:classroomId", requireSignin, isAuth, listByClassroom);
router.get("/students/photo/:studentId", userPhoto);

router.param("studentId", studentById);
router.param("classroomId", classroomById);

module.exports = router;
