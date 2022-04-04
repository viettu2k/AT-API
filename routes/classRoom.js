const express = require("express");
const router = express.Router();

const { create, update, listByUser } = require("../controllers/classroom");
const { requireSignin, isAuth } = require("../controllers/auth");
const { userById } = require("../controllers/user");

router.post("/classrooms/:userId", requireSignin, isAuth, create);
router.put("/classrooms/:userId", requireSignin, isAuth, update);
router.get("/classrooms/:userId", requireSignin, isAuth, listByUser);

router.param("userId", userById);

module.exports = router;