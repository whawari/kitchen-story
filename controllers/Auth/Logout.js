module.exports = async (req, res, next) => {
  let accessToken;

  if (req && req.cookies) {
    accessToken = req.cookies["access_token"];
  }

  if (!accessToken) return next({ message: "unauthorized", statusCode: 403 });

  res.clearCookie("access_token");

  res.status(200).json({
    message: "logged out",
    status: "success",
  });
};
