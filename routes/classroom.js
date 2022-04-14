const express = require("express");
const router = express.Router();

const {
  create,
  update,
  listByUser,
  classroomById,
  remove,
  addStudent,
} = require("../controllers/classroom");
const { requireSignin, isAuth } = require("../controllers/auth");
const { userById } = require("../controllers/user");

router.post("/classrooms/:userId", requireSignin, isAuth, create);
// router.post(
//   "/classrooms/add-student/:classroomId",
//   requireSignin,
//   isAuth,
//   addStudent
// );
router.post(
  "/classrooms/add-student/:classroomId",
  //   requireSignin,
  //   isAuth,
  addStudent
);
router.put("/classrooms/:userId/:classroomId", requireSignin, isAuth, update);
router.delete(
  "/classrooms/:userId/:classroomId",
  requireSignin,
  isAuth,
  remove
);
router.get("/classrooms/:userId", requireSignin, isAuth, listByUser);

router.param("userId", userById);
router.param("classroomId", classroomById);

module.exports = router;
