const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  let authorized = true;
  if (authorized) {
    next();
  } else {
    res.status(403).json({ msg: "Unauthorized!" });
    return;
  }
};
