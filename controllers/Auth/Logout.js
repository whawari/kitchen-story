const TokenModel = require("../../models/TokenModel");

const verifyToken = require("../../services/verifyToken");

module.exports = async (req, res, next) => {
  let refreshToken;

  if (req && req.cookies) {
    refreshToken = req.cookies["refresh_token"];
  }

  if (!refreshToken)
    return next({ message: "unauthenticated", statusCode: 401 });

  try {
    await verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY);

    await TokenModel.deleteOne({ token: refreshToken });

    res.clearCookie("refresh_token");
  } catch (error) {
    return next(error);
  }

  res.status(200).json({
    message: "logged out",
    status: "success",
  });
};
