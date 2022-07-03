const RefreshTokenModel = require("../../models/RefreshTokenModel");

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
    const userToken = await RefreshTokenModel.findOne({ token: refreshToken });

    if (!userToken) {
      res.clearCookie("refresh_token");

      return next({ message: "unauthorized", statusCode: 403 });
    }

    const verifiedRefreshToken = await verifyToken(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET_KEY
    );

    const user = verifiedRefreshToken.payload;

    const accessToken = await signToken(
      user,
      process.env.ACCESS_TOKEN_SECRET_KEY,
      { expiresIn: +process.env.ACCESS_TOKEN_EXPIRY_TIME }
    );

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
