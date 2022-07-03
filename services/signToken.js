const JWT = require("jsonwebtoken");

module.exports = (payload = {}, secretKey, options = {}) => {
  return new Promise((resolve, reject) => {
    JWT.sign(
      {
        iss: "Kitchen Story",
        payload,
      },
      secretKey,
      options,
      (error, token) => {
        if (error) reject(error);

        resolve(token);
      }
    );
  });
};
