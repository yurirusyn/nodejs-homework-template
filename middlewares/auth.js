const jwt = require("jsonwebtoken");

const { User } = require("../models/user");

const { createError } = require("../helpers");

const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
      throw createError(401);
    }
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token) {
      throw createError(401);
    }
    req.user = user;

    next();
  } catch (error) {
    console.log(error.message);
    if (error.message === "invalid signature") {
      res.status(401).json({
        massage: `Not authorized`,
      });
    }
    next(error);
  }
};

module.exports = auth;
