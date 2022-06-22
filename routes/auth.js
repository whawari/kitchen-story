const express = require("express");
const router = express.Router();
const validateEmail = require("../middleware/validateEmail");
const signup = require("../controllers/auth/signup");

router.post(
  "/signup",
  validateEmail,
  (req, res, next) => {
    signup(req, res, next);
  },
  (req, res) => {
    res.status(200).json({
      message: "Account created successfully",
      status: "success",
    });
  }
);

router.use((error, req, res, next) => {
  if (error.statusCode && error.message) {
    res.status(error.statusCode).json({
      message: error.message,
      status: "fail",
    });
  }

  res.status(500).send(`Something went wrong: ${error}`);
});

module.exports = router;
