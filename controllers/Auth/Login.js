const UserModel = require("../../models/UserModel");
const signToken = require("../../services/signToken");

module.exports = (req, res, next) => {
  const { username, password } = req.body;

  UserModel.find({ $or: [{ username: username }, { email: username }] })
    .limit(1)
    .exec(async (error, results) => {
      if (error) return next(error);

      if (results.length === 0)
        return next({
          message: "user not found",
          statusCode: 404,
        });

      const user = results[0];

      try {
        const isValidPassword = await user.isValidPassword(password);

        if (!isValidPassword)
          return next({
            message: "invalid username or password",
            statusCode: 409,
          });
      } catch (error) {
        return next(error);
      }

      const { _id } = user;

      let accessToken;
      try {
        accessToken = await signToken(_id, process.env.ACCESS_TOKEN_SECRET_KEY);
      } catch (error) {
        return next(error);
      }

      if (process.env.ENVIRONMENT !== "development") {
        res.cookie("access_token", accessToken, {
          httpOnly: true,
          sameSite: true,
          secure: true,
        });
      } else {
        res.cookie("access_token", accessToken, {
          httpOnly: true,
        });
      }

      res.status(200).json({
        message: "logged in",
        status: "success",
        data: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });
    });
};
