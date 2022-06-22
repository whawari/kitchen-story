const testEmailValidation = require("../helpers").testEmailValidation;

module.exports = (req, res, next) => {
  const { email } = req.body;

  if (testEmailValidation(email)) return next();

  return next({ message: "Invalid email", statusCode: 400 });
};
