const express = require("express");
const router = express.Router();

const validateRequestBody = require("../middleware/validateRequestBody");
const validateRequiredFields = require("../middleware/validateRequiredFields");
const validateEmail = require("../middleware/validateEmail");
const handleErrors = require("../middleware/handleErrors");

const SignupController = require("../controllers/Auth/Signup");
const LoginController = require("../controllers/Auth/Login");
const LogoutController = require("../controllers/Auth/Logout");

router.post(
  "/signup",
  validateRequestBody,
  (req, res, next) => {
    req.requiredFields = [
      "firstName",
      "lastName",
      "username",
      "email",
      "password",
    ];

    next();
  },
  validateRequiredFields,
  validateEmail,
  SignupController
);

router.post(
  "/login",
  validateRequestBody,
  (req, res, next) => {
    req.requiredFields = ["username", "password"];

    next();
  },
  validateRequiredFields,
  LoginController
);

router.delete("/logout", LogoutController);

router.use(handleErrors);

module.exports = router;
