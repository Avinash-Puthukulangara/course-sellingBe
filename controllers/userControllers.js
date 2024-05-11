import bcrypt from 'bcrypt';
import { generateToken } from '../utils/generateToken.js';
import User from '../models/userModel.js';

export const signup = async (req, res)=>{
    console.log('hitted signup')
    try {
        console.log(req.body)
        const { firstName, lastName, password, email } = req.body

        const userExist = await User.findOne({ email })

        if (userExist){
            return res.send('user already exist')
        }
    
        const saltRounds = 10
        const hashPassword = await bcrypt.hash(password, saltRounds) 
    
        const newUser = new User({
            email,
            firstName,
            lastName,
            hashPassword,
        })

        const newUserCreated = await newUser.save()

        console.log(newUserCreated)

        if(!newUser) {
            return res.send("user not created")
        }
        const token = generateToken(email)
        console.log(email)
        res.cookie("token", token);
        res.send("Signed in successfully")
    
    } 
    catch (error) {
        console.log(error, "Something went wrong")
        return res.status(500).send("Internal Server Error")
    }
}

export const signin = async (req, res)=>{
    console.log('hitted signin')
  try {
    const {email, password} = req.body
    const user = await User.findOne({ email })
    console.log(user)

    if (!user) {
        return res.send('user not exist')
    }
    
    const matchPassword = await bcrypt.compare(password, user.hashPassword)
    if(!matchPassword) {
        return res.send("password incorrect")
    }
    const token = generateToken(email)
    console.log(token)
    res.cookie("token", token);
    res.send("Login successful")

  }
    catch (error) {
    console.log(error, "Something went wrong")
    return res.status(500).send("Internal Server Error")
  }
}

