const JWT = require("jsonwebtoken");

module.exports = (userID, secretKey) => {
  return new Promise((resolve, reject) => {
    JWT.sign(
      {
        iss: "Kitchen Story",
        sub: userID,
      },
      secretKey,
      { expiresIn: "1h" },
      (error, token) => {
        if (error) reject(error);

        resolve(token);
      }
    );
  });
};
