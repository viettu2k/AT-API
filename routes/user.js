const express = require("express");
const router = express.Router();

const { requireSignin, isAuth } = require("../controllers/auth");

const {
  userById,
  read,
  update,
  changePassword,
  userPhoto,
} = require("../controllers/user");

router.get("/users/:userId", requireSignin, isAuth, read);
router.put("/users/:userId", requireSignin, isAuth, update);
router.put(
  "users/:userId/change-password",
  requireSignin,
  isAuth,
  changePassword
);
router.get("/users/photo/:userId", userPhoto);

router.param("userId", userById);

module.exports = router;
