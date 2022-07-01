const isEmptyObject = require("../helpers").isEmptyObject;

module.exports = (error, req, res, next) => {
  if (error.statusCode && error.message) {
    return res.status(error.statusCode).json({
      message: error.message,
      status: "error",
      hint: error.hint
        ? !isEmptyObject(error.hint)
          ? error.hint
          : null
        : null,
    });
  }

  res.status(500).json({
    message: "Something went wrong",
    status: "error",
    hint: null,
  });
};
