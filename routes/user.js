const express = require("express");
const router = express.Router();

const { requireSignin, isAuth } = require("../controllers/auth");

const {
  userById,
  read,
  update,
  changePassword,
  userPhoto,
  getListUser,
  deleteUser,
} = require("../controllers/user");

router.get("/users/:userId", requireSignin, read);
router.put("/users/:userId/change-password", requireSignin, changePassword);
router.put("/users/:userId", requireSignin, update);
router.get("/users/photo/:userId", userPhoto);
router.get("/users", getListUser);
router.delete("/users/:userId", requireSignin, deleteUser);

router.param("userId", userById);

module.exports = router;
