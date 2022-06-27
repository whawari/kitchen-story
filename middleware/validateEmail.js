require("../helpers/testEmailValidation").testEmailValidation;

const testEmailValidation = (req, res, next) => {
  const { email } = req.body;

  if (testEmailValidation(email)) return next();

  return next({ message: "Invalid email", statusCode: 400 });
};

module.exports = testEmailValidation;
