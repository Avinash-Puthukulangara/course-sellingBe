import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import Instructor from '../models/instructorModel.js';
dotenv.config();

const secretKey = process.env.SECRET_KEY;
function authenticateInstructor(req, res, next){

    try {
      const token = req.cookies.token;
      console.log(token)
      
      if (!token) {
        return res.status(401).json({ message: 'Token not provided' });
      }
  
      const decodedToken = jwt.verify(token, secretKey);
  
      if (decodedToken.id) {
        return res.status(401).json({ message: 'Invalid token' });
      }
  
      const user = Instructor.findById(decodedToken.id);
  
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }
  
      if (user.role !== 'admin' && user.role !== 'instructor') {
        return res.status(403).json({ message: 'Not authenticated' });
      }
  
      req.user = user;
  
      next();
    } catch (error) {
      console.error('Authentication error:', error);
      res.status(500).json({ message: 'Internal server is error' });
    }
  };

export default authenticateInstructor;