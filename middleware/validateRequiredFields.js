const isEmptyObject = require("../helpers").isEmptyObject;
const isArrayOfStrings = require("../helpers").isArrayOfStrings;

// TODO:
// Add more validation based on input type

module.exports = (req, res, next) => {
  if (
    !req.hasOwnProperty("requiredFields") ||
    !Array.isArray(req.requiredFields)
  )
    return next();

  if (!isArrayOfStrings(req.requiredFields)) return next();

  let hint = {};

  // Suppose all inputs are of type string

  for (let key of req.requiredFields) {
    if (!req.body.hasOwnProperty(key) || req.body[key].trim().length === 0) {
      hint[key] = "required";
    }
  }

  if (isEmptyObject(hint)) return next();

  return next({ message: "validation error", statusCode: 400, hint });
};
