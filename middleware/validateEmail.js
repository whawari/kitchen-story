const isEmailValid = require("../helpers").isEmailValid;

module.exports = (req, res, next) => {
  const { email } = req.body;

  if (isEmailValid(email)) return next();

  return next({
    message: "validation error",
    statusCode: 400,
    hint: {
      email: "invalid email",
    },
  });
};
