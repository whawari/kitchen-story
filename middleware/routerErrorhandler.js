const express = require("express");
const router = express.Router();

const routerErrorhandler = (error, req, res, next) => {
  if (error.statusCode && error.message) {
    return res.status(error.statusCode).json({
      message: error.message,
      status: "fail",
      error: error.errorMessage,
    });
  }

  res.status(500).send(`Something went wrong: ${error}`);
};

module.exports = routerErrorhandler;
