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
} = require("../controllers/user");

router.get("/users/:userId", requireSignin, isAuth, read);
router.put(
  "/users/:userId/change-password",
  requireSignin,
  isAuth,
  changePassword
);
router.put("/users/:userId", requireSignin, isAuth, update);
router.get("/users/photo/:userId", userPhoto);
router.get("/users", getListUser);

router.param("userId", userById);

module.exports = router;
