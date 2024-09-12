
const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    shortId:{
        type:String,required:true,
    },
    originalUrl:{
        type:String,required:true,  
    },
    visitHistory:[{
        timestamp:{type:Number}
    }],
    createdBy:{
        type : mongoose.Schema.Types.ObjectId,   //specifies that it will store objectid of users collection
        ref : "User"                            // it will refernce _id field in users collection
    }
},{timestamps : true} //Mongoose will automatically add createdAt and updatedAt fields to your documents.
);

const Url = mongoose.model("url",urlSchema);

module.exports = Url;