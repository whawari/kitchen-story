const TokenModel = require("../../models/TokenModel");

const verifyToken = require("../../services/verifyToken");
const signToken = require("../../services/signToken");

module.exports = async (req, res, next) => {
  let refreshToken;

  if (req && req.cookies) {
    refreshToken = req.cookies["refresh_token"];
  }

  if (!refreshToken)
    return next({ message: "unauthenticated", statusCode: 401 });

  try {
    const verifiedRefreshToken = await verifyToken(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET_KEY
    );

    const user = verifiedRefreshToken.payload;

    const userToken = await TokenModel.findOne({ token: refreshToken });

    if (!userToken) {
      await TokenModel.deleteMany({ userId: user._id });

      res.clearCookie("refresh_token");

      return next({ message: "unauthorized", statusCode: 403 });
    }

    const accessToken = await signToken(
      user,
      process.env.ACCESS_TOKEN_SECRET_KEY,
      { expiresIn: +process.env.ACCESS_TOKEN_EXPIRY_TIME }
    );

    refreshToken = await signToken(user, process.env.REFRESH_TOKEN_SECRET_KEY, {
      expiresIn: +process.env.REFRESH_TOKEN_EXPIRY_TIME,
    });

    await userToken.delete();

    await new TokenModel({
      userId: user._id,
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
      message: "access token refreshed",
      status: "success",
      data: {
        user: user,
        token: {
          access: accessToken,
          expiry: process.env.ACCESS_TOKEN_EXPIRY_TIME,
        },
      },
    });
  } catch (error) {
    return next(error);
  }
};
