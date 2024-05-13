import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

const secretKey = process.env.SECRET_KEY;

function authenticateAdmin(req, res, next) {
    const token = req.cookies.token;
  
    jwt.verify(token, secretKey, (err, user) => {
      console.log(err);
  
      if (err) return res.sendStatus(403);
  
      req.user = user;
  
      console.log(req.user.role);
      
      if (req.user.role !== "admin") {
        return res.send("not authenticated");
      }
      next();
    });
  }
export default authenticateAdmin;