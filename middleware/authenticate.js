const verifyToken = require("../services/verifyToken");

module.exports = async (req, res, next) => {
  let accessToken;

  if (req && req.headers) {
    accessToken = req.headers["authorization"];
  }

  if (!accessToken)
    return next({ message: "unauthenticated", statusCode: 401 });

  let user;

  try {
    const verifiedAccessToken = await verifyToken(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET_KEY
    );

    user = verifiedAccessToken.payload;
  } catch (error) {
    return next(error);
  }

  req.user = user;

  next();
};
