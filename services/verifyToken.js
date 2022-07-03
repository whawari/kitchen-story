const JWT = require("jsonwebtoken");

module.exports = (token, secretKey) => {
  return new Promise((resolve, reject) => {
    JWT.verify(token, secretKey, (error, decoded) => {
      if (error || !decoded)
        reject({ message: "unauthorized", statusCode: 403 });

      resolve(decoded);
    });
  });
};
