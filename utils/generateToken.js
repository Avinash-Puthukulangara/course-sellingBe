const jsonwebtoken = require('jsonwebtoken');
require("dotenv").config();

const secretKey = process.env.SE;

if (!secretKey) {
    throw new Error("Secret key not found in environment variables");
}

const generateToken = (email) => {
    return jsonwebtoken.sign({ data: email }, secretKey, { expiresIn: "1d" });
}

const adminToken = (user) => {
    return jsonwebtoken.sign({ data: user.id, role: user.role }, secretKey, { expiresIn: "1d" });
};

module.exports = { generateToken, adminToken };
