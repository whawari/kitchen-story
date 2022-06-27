const UserModel = require("../models/User");

const login = async (req, res, next) => {

  const { email, password } = req.body;

  const user = await UserModel.findOne(
    /\@/.test(email) ? { email } : { username: email }
  ).catch((error) => {
    return next({
      message: "Something went Wrong",
      statusCode: 500,
      errorMessage: error.message,
    });
  });

  if (!user) {
    return next({
      message: "User not found",
      statusCode: 400,
    });
  }

  const validatePassword = await user.isValidPassword(password);
  
  if (!validatePassword) {
    return next({
      message: "Wrong password",
      statusCode: 400,
    });
  }

  req.user = {id:user.id, email:user.email}
  return next();
};

module.exports = login;
