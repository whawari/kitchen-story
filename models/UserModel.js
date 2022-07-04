const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },

  firstName: {
    type: String,
    required: [true, "required"],
  },

  lastName: {
    type: String,
    required: [true, "required"],
  },

  profilePhotoUrl: {
    type: String,
  },

  dateOfBirth: {
    type: Date,
  },

  username: {
    type: String,
    required: [true, "required"],
    unique: true,
    trim: true,
    lowercase: true,
  },

  email: {
    type: String,
    required: [true, "required"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "invalid email"],
  },

  password: {
    type: String,
    required: [true, "required"],
    minLength: [8, "must contain at least 8 characters"],
    maxLength: [32, "must contain a maximum of 32 characters"],
  },

  gender: {
    type: String,
    enum: {
      values: ["male", "female"],
      message: "{VALUE} is not a valid value",
    },
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

UserSchema.pre("save", function (next) {
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

UserSchema.methods.isValidPassword = async function (password) {
  const user = this;

  const compare = await bcrypt.compare(password, user.password);

  return compare;
};

const UserModel = model("user", UserSchema);

module.exports = UserModel;
