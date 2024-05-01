const mongoose = require('mongoose');

const userSchema = new mongoose.userSchema({
    
    firstname: {
        type : String,
        required : true,
        minLength : 4,
        maxLength : 20
    },
    lastname: {
        type : String,
        required : true,
        minLength : 1,
        maxLength : 20
    },
    email: {
        type : String,
        unique : true,
        trim : true,
        required : true,
        lowercase : true
    },
    password: {
        type : String,
        required : true,
        minLength : 8
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;