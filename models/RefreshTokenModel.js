const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const RefreshTokenSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true },
  token: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: process.env.REFRESH_TOKEN_EXPIRY_TIME,
  },
});

const RefreshTokenModel = model("refreshToken", RefreshTokenSchema);

module.exports = RefreshTokenModel;
