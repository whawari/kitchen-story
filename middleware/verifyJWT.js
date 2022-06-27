const jwt = require("jsonwebtoken");

const verifyJWT = async (req, res, next) => {
  if (req.cookies.secret_token) {
    const { secret_token } = req.cookies;
    const verified = jwt.verify(secret_token, process.env.SECRET_KEY);
    if (!verified) {
      res.send("token not verified");
    }
    return next();
  }
  res.send("you are not authorized");
};

module.exports = verifyJWT;
