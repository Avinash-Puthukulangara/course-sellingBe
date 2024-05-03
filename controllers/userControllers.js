const bcrypt = require('bcrypt')
const generateToken = require('../utils/generateToken')

const signup = async (req, res)=>{
    const { firstName, lastName, password, email} = req.body
    const userExist = await User.find({ email})
    try {
        if (userExist){
            return res.send('user already exist')
        }
    
        const saltRounds = 10
        const hashPassword = await bcrypt.hash(password, saltRounds) 
    
        const newUser = new User({
            email,
            firstName,
            lastName,
            hashPassword
        })
        if(!newUser) {
            return res.send("user not created")
        }
        const token = generateToken(email)
        res.send(token)
    
    } 
    catch (error) {
        console.log(error)
        return res.send(error)
    }
}
const signin = async (req, res)=>{
  try {
    const {wmail, password} = req.body
    const user = await User.findOne({email})
    console.log(user)

    if (!user) {
        return res.send('user not exist')
    }
    
    const matchPassword = await bcrypt.compare(password, user.hashPassword)
    if(!matchPassword) {
        return res.send("password incorrect")
    }
    const token = generateToken(email)
    res.send(token)

  }
      catch (error) {
    console.log(error)
  }
}


module.exports = { signup, signin}