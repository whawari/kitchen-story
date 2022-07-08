const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const TokenSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true },
  token: { type: String, required: true, unique: true },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: process.env.REFRESH_TOKEN_EXPIRY_TIME,
  },
});

const TokenModel = model("Token", TokenSchema);

module.exports = TokenModel;
