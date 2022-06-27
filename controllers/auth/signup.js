const User = require("../../models/User");

module.exports = (req, res, next) => {
  const { firstName, lastName, username, email, password } = req.body;
  User.findOne({ email }, (error, user) => {
    if (error) {
      return next({ message: error.message, statusCode: 500 });
    }

    if (user) {
      return next({ message: "Email already exists", statusCode: 400 });
    }

    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      password,
    });

    newUser.save((error) => {
      if (error) {
        return next({
          message: "Error saving user: " + error.message,
          statusCode: 500,
        });
      }

       res.status(200).json({
         message: "Account created successfully",
         status: "success",
       });
    });
  });
};
