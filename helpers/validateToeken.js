const jwt = require("jsonwebtoken");
//const sanitize = require("mongo-sanitize");
require("dotenv").config();
//const config =  require('../../config/config');

async function validateToken(req, res, next) {
  const authorizationHeader = req.headers.authorization;
  //req.body = sanitize(req.body);
  let result;
  if (!authorizationHeader)
    return res.status(401).json({
      error: true,
      message: "Access token is missing",
    });
  const token = req.headers.authorization.split(" ")[1]; // Bearer <token>
  const options = {
    expiresIn: "1h",
  };
  try {
    result = jwt.verify(token, process.env.JWT_SECRET, options);
    req.decoded = result;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      result = {
        error: true,
        message: `TokenExpired`,
      };
    } else {
      result = {
        error: true,
        message: `Authentication error`,
      };
    }
    return res.status(401).json(result);
  }
}

module.exports = { validateToken };
