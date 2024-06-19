const HttpError = require("../models/http-error");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const authToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      const error = new HttpError("Authentication Failed!", 400);
      return next(error);
    }

    decodedToken = jwt.verify(token, "secret");

    if (decodedToken) {
      const user = await User.findOne({ token: token });

      if (user.email !== decodedToken.email) {
        const error = new HttpError("Authentication Failed!", 400);
        return next(error);
      }
    } else {
      const error = new HttpError("Authentication Failed!", 400);
      return next(error);
    }

    req.userData = decodedToken;
    next();
  } catch (err) {
    const error = new HttpError("Authentication Failed!", 400);
    return next(error);
  }
};

module.exports = authToken;
