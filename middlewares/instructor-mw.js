const jwt = require('jsonwebtoken');
require('dotenv').config()

function authenticateInstructor(req, res, next){
    const token = req.cookies.token;

    jwt.verify(token, process.env.SE, (err, user)=>{
        console.log(err);

        if(err) return res.status(403).send('Token not valid or missing');

        req.user = user;
        console.log(req.user.role);
        if(req.user.role !== 'instructor' && req.user.role !== 'admin'){
            return res.send('Not authenticated');
        }
        next();
    });
}

module.exports = authenticateInstructor;