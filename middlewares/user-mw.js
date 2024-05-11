import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

function authenticateUser(req, res, next) {
  const secretKey = process.env.SECRET_KEY;

  const token = req.cookies.token;
  console.log(token)

  if (!token) {
      return res.status(401).json({ message: 'No token provided. Unauthorized.' });
  }

  try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      req.user = decoded.user;
      
      next();
  } catch (error) {
      return res.status(403).json({ message: 'Invalid token. Forbidden.' });
  }
}


export default authenticateUser;