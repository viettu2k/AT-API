const express = require("express");
const router = express.Router();

const { requireSignin, isAuth } = require("../controllers/auth");

const { userById, read, update } = require("../controllers/user");

router.get("/users/:userId", requireSignin, isAuth, read);
router.put("/users/:userId", requireSignin, update);

router.param("userId", userById);

module.exports = router;