const jwt = require("jsonwebtoken");

const jwtRemove = async (req, res, next) => {
  if (req.cookies.secret_token) {
    res.clearCookie("secret_token");
  }

  res.json({
    message: "logged Out Successfully",
  });
};

module.exports = jwtRemove;
