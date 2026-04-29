const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/userdb");

const userSchema = mongoose.Schema({
    name:String,
    email:String,
    imgUrl:String
})

module.exports =  mongoose.model("User", userSchema);