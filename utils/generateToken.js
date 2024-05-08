const jsonwebToken = require('jsonwebtoken')
require("dotenv").config()

const secretKey = process.env.SE

const generateToken = (email) =>{
    return jsonwebToken.sign({ data: email}, secretKey, { expiresIn: "1d"})
}

const adminToken = (user) => {
    return jsonwebToken.sign({ data: user.id, role: user.role }, secretKey, {
      expiresIn: "1d",
    });
  };

module.exports =  { generateToken, adminToken };