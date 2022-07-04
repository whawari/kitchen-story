const UserModel = require("../../models/UserModel");

module.exports = (req, res, next) => {
  const { firstName, lastName, username, email, password } = req.body;

  UserModel.find({ $or: [{ email: email }, { username: username }] })
    .limit(1)
    .exec((error, results) => {
      if (error) return next(error);

      if (results.length > 0) {
        const result = results[0];

        if (email === result?.email && username === result?.username) {
          return next({
            message: "validation error",
            statusCode: 409,
            hint: {
              email: "email already exists",
              username: "username already exists",
            },
          });
        } else if (email === result?.email) {
          return next({
            message: "validation error",
            statusCode: 409,
            hint: {
              email: "email already exists",
            },
          });
        } else if (username === result?.username) {
          return next({
            message: "validation error",
            statusCode: 409,
            hint: {
              username: "username already exists",
            },
          });
        }
      }

      const user = new UserModel({
        firstName,
        lastName,
        username,
        email,
        password,
      });

      const userError = user.validateSync();

      if (userError) {
        let hint = {};

        for (let key in userError.errors) {
          hint[key] = userError.errors[key].message;
        }

        return next({ message: "validation error", statusCode: 400, hint });
      }

      user.save((error) => {
        if (error) return next(error);

        res.status(201).json({
          message: "account created",
          status: "success",
        });
      });
    });
};
