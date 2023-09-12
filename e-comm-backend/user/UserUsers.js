// for model and scheama

//schema
const mongoose = require('mongoose');
const userUsersSchema= new mongoose.Schema({
    name:String,
    email:String,
    password:String
});

// Model
module.exports= mongoose.model("usersOfUser", userUsersSchema);

