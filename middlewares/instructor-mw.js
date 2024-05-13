import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

const secretKey = process.env.SECRET_KEY;
function authenticateInstructor(req, res, next){

      const token = req.cookies.token;
      console.log(token)
      
      jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        console.log(err);
    
        if (err) return res.send("Token not valid or missing").status(403);
  
      if (user.role !== 'admin' && user.role !== 'instructor') {
        return res.status(403).json({ message: 'Not authenticated' });
      }
  
      req.user = user;
  
      next();
  });
}
export default authenticateInstructor;