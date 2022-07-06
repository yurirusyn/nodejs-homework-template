const register = require("./register");
const login = require("./login");
const logout = require("./logout.js");
const getCurrentUser = require("./getCurrentUser.js");
const updateAvatar = require("./updateAvatar.js");
const verifyEmail = require("./verifyEmail.js");
const resendVerifyEmail = require("./resendVerifyEmail.js");

module.exports = {
  register,
  login,
  logout,
  getCurrentUser,
  updateAvatar,
  verifyEmail,
  resendVerifyEmail,
};
