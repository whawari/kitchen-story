const jwt = require("jsonwebtoken");

const jwtSign = async (req, res, next) => {
  const { id, email, username } = req.user;
  const token = jwt.sign({ id, email, username }, process.env.SECRET_KEY);

  res.cookie("secret_token", token, {
    httpOnly: true,
    maxAge: 4000,
  });

   res.json({
    message: "Logged in successfully",
  })
};

module.exports = jwtSign;
