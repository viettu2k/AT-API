const express = require("express");
const router = express.Router();

const { create, update } = require("../controllers/classroom");
const { requireSignin, isAuth } = require("../controllers/auth");
const { userById } = require("../controllers/user");

router.post("/class-room/:userId", requireSignin, isAuth, create);
router.put("/class-room/:userId", requireSignin, isAuth, update);

router.param("userId", userById);

module.exports = router;