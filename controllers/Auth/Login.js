const UserModel = require("../../models/UserModel");
const RefreshTokenModel = require("../../models/RefreshTokenModel");

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

      try {
        const user = results[0];

        const isValidPassword = await user.isValidPassword(password);

        if (!isValidPassword)
          return next({
            message: "invalid username or password",
            statusCode: 409,
          });

        const { _id, firstName, lastName, username, email, role } = user;
        const userPayload = {
          _id,
          firstName,
          lastName,
          username,
          email,
          role,
        };

        const accessToken = await signToken(
          userPayload,
          process.env.ACCESS_TOKEN_SECRET_KEY,
          { expiresIn: +process.env.ACCESS_TOKEN_EXPIRY_TIME }
        );

        const refreshToken = await signToken(
          userPayload,
          process.env.REFRESH_TOKEN_SECRET_KEY,
          { expiresIn: +process.env.REFRESH_TOKEN_EXPIRY_TIME }
        );

        const userToken = await RefreshTokenModel.findOne({ userId: _id });

        if (userToken) await userToken.remove();

        await new RefreshTokenModel({
          userId: _id,
          token: refreshToken,
        }).save();

        if (process.env.ENVIRONMENT !== "development") {
          res.cookie("refresh_token", refreshToken, {
            httpOnly: true,
            sameSite: true,
            secure: true,
            maxAge: +process.env.REFRESH_TOKEN_EXPIRY_TIME * 1000,
          });
        } else {
          res.cookie("refresh_token", refreshToken, {
            httpOnly: true,
            maxAge: +process.env.REFRESH_TOKEN_EXPIRY_TIME * 1000,
          });
        }

        res.status(200).json({
          message: "logged in",
          status: "success",
          data: {
            user: userPayload,
            token: {
              access: accessToken,
              expiry: process.env.ACCESS_TOKEN_EXPIRY_TIME,
            },
          },
        });
      } catch (error) {
        return next(error);
      }
    });
};
