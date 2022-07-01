const verifyToken = require("../../services/verifyToken");

module.exports = async (req, res, next) => {
  let accessToken;

  if (req && req.cookies) {
    accessToken = req.cookies["access_token"];
  }

  if (!accessToken) return next({ message: "unauthorized", statusCode: 403 });

  try {
    await verifyToken(accessToken, process.env.ACCESS_TOKEN_SECRET_KEY);
  } catch (error) {
    return next(error);
  }

  res.status(200).json({
    message: "authenticated",
    status: "success",
  });
};
