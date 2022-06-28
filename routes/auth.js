const express = require("express");
const router = express.Router();

const validateEmail = require("../middleware/validateEmail");
const signup = require("../controllers/auth/signup");
const jwtSign = require("../middleware/jwtSign");
const login = require("../middleware/login");
const jwtRemove = require("../middleware/jwtRemove");
const routerErrorhandler = require("../middleware/routerErrorhandler");
const verifyJWT = require("../middleware/verifyJWT");

router.post("/signup", validateEmail, signup);

router.post("/login", login, jwtSign, verifyJWT);

router.post("/logout", jwtRemove);

router.use(routerErrorhandler);

module.exports = router;
