const jwt = require("jsonwebtoken");
require("dotenv").config();        //Loads .env file contents into process

function setUser(user){
    return jwt.sign({           // as payload must be obj not accept string
        _id : user._id,         // created confusion as here assigning key id:user._id instead _id:user._id so id prefix remain same
        email : user.email
        },
        process.env.ACCESS_TOKEN_SECRETKEY);
}

function getUser(token){
    if(!token) return null;

   try{
    return jwt.verify(token,process.env.ACCESS_TOKEN_SECRETKEY)
    }
    catch(err){
        return null;
    }
}
module.exports={
    setUser,getUser
}