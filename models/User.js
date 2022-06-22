const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },

  firstName: {
    type: String,
    required: [true, "FirstName is required"],
  },

  lastName: {
    type: String,
    required: [true, "LastName is required"],
  },

  profilePhotoUrl: {
    type: String,
  },

  dateOfBirth: {
    type: Date,
  },

  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
  },

  email: {
    type: String,
    required: [true, "Email address is required"],
    lowercase: true,
    trim: true,
    unique: true,
  },

  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [8, "Password must be at least 8 characters"],
    maxLength: [32, "Password must be at maximum 32 characters"],
  },

  gender: {
    type: String,
    enum: ["male", "female"],
  },

  phoneNumber: {
    type: Number,
  },

  bio: {
    type: String,
  },

  credit: {
    type: Number,
  },
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  bcrypt.hash(this.password, 10, (error, passwordHash) => {
    if (error) {
      return next(error);
    }

    this.password = passwordHash;
    next();
  });
});

const UserModel = model("user", userSchema);

module.exports = UserModel;
