const { Schema, model } = require("mongoose");
const Joi = require("joi");

const emailRegexp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const userSchema = Schema({
  password: {
    type: String,
    required: [true, "Set password for user"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: emailRegexp,
  },
  avatarURL: {
    type: String,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, "Verify token is required"],
  },
  token: String,
});
const registerUser = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegexp).required(),
});

const loginUser = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const verifyEmail = {
  email: Joi.string().pattern(emailRegexp).required(),
};

const schemas = {
  registerUser,
  loginUser,
  verifyEmail,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
