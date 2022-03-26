const express = require("express");
const router = express.Router();

const { requireSignin, isAuth } = require("../controllers/auth");

const { userById, read } = require("../controllers/user");

router.get("/users/:userId", requireSignin, isAuth, read);

router.param("userId", userById);

module.exports = router;