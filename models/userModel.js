const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    email: {
        type : String,
        unique : true,
        required : true,
        minLength : 3,
        maxLength : 30,
    },
    hashPassword: {
        type : String,
        required : true,
        minLength : 8,
    },
    firstName: {
        type : String,
        required : true,
        minLength : 4,
        maxLength : 20,
    },
    lastName: {
        type : String,
        required : true,
        minLength : 1,
        maxLength : 20,
    },

});

const User = mongoose.model('User', userSchema);

module.exports = User;