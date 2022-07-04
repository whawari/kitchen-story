const isEmptyObject = require("../helpers").isEmptyObject;

module.exports = (req, res, next) => {
  if (!req.body || isEmptyObject(req.body))
    return next({ message: "The request body is empty.", statusCode: 400 });

  return next();
};
