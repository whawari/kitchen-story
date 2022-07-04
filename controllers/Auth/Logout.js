const RefreshTokenModel = require("../../models/RefreshTokenModel");

module.exports = async (req, res, next) => {
  let refreshToken;

  if (req && req.cookies) {
    refreshToken = req.cookies["refresh_token"];
  }

  if (!refreshToken)
    return next({ message: "unauthenticated", statusCode: 401 });

  try {
    const userToken = await RefreshTokenModel.findOne({ token: refreshToken });

    if (userToken) await userToken.remove();

    res.clearCookie("refresh_token");
  } catch (error) {
    return next(error);
  }

  res.status(200).json({
    message: "logged out",
    status: "success",
  });
};
