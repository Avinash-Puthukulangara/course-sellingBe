import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

function authenticateInstructor(req, res, next) {
    const token = req.cookies.token;
  
    if (!token) {
        return res.status(403).send({ message: 'Invalid token' });
    }
  
        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
  
        req.user = user;
        console.log(user)
        
        if(req.user.role !== "instructor" && req.user.role !== "admin") {
            return res.send("not authenticated");
        }
  
        next();
    });
}

export default authenticateInstructor;