import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const secretKey = process.env.SECRET_KEY;


if (!secretKey) {
    throw new Error("Secret key not found in environment variables");
}

export const generateToken = (email) => {
    return jwt.sign({ data: email }, secretKey, { expiresIn: "1d" });
  };
  

 export const adminToken = (user) => {
    const { id, role } = user;
  
  const payload = {
    id: id,
    role: role
  };

  const token = jwt.sign(payload, secretKey, { expiresIn: '1d' });

  return token;
  };


