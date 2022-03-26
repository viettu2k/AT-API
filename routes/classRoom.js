const express = require("express");
const router = express.Router();

const { create } = require("../controllers/classRoom");
const { requireSignin, isAuth } = require("../controllers/auth");

router.post("/class-room/create/:userId", requireSignin, isAuth, create);

module.exports = router;
