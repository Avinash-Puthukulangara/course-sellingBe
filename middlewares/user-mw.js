const jwt = require("jsonwebtoken");
require('dotenv').config()

function authenticateUser(req, res, next) {
  const token = req.cookies.token;
  console.log(token);

  jwt.verify(token, process.env.SE, (err, user) => {
    console.log(err);

    if (err) return res.sendStatus(403);

    req.user = user;
    console.log(req.user.role);

    next();
  });
}

module.exports = authenticateUser;;