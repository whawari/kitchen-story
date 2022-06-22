const User = require("../../models/User");

module.exports = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }, (error, user) => {
    if (error) {
      return next({ message: error.message, statusCode: 500 });
    }

    if (user) {
      return next({ message: "Email already exists", statusCode: 400 });
    }

    const newUser = new User({ email, password });

    newUser.save((error) => {
      if (error) {
        return next({
          message: "Error saving user: " + error.message,
          statusCode: 500,
        });
      }

      return next();
    });
  });
};
