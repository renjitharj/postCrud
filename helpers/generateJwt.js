const jwt = require("jsonwebtoken");
require("dotenv").config();
//const config =  require('../../config/config');

const options = {
  expiresIn: "300h",
};

async function generateJwt(uid, userId , role) {
  try {
    const payload = { uid: uid, id: userId , role : role };
    const token = await jwt.sign(payload, process.env.JWT_SECRET, options);
    return { error: false, token: token };
  } catch (error) {
    return { error: true };
  }
}

module.exports = { generateJwt };
