const express = require("express");
const router = express.Router();

const { create, update } = require("../controllers/classRoom");
const { requireSignin, isAuth } = require("../controllers/auth");

router.post("/class-room/:userId", requireSignin, isAuth, create);
router.put("/class-room/:userId", requireSignin, isAuth, update);

module.exports = router;