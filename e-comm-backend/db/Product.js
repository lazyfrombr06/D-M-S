// for model and scheama

//schema
const mongoose = require('mongoose');
const productSchema= new mongoose.Schema({
    adexFileNo:String,
    year:String,
    fileNo:String,
    subject:String,
    nonp:String,
    nocp:String,
    totalPages:String,
    division:String,
    userId:String,
    UploadedBy:String,
   
    files:String

});

// Model
module.exports= mongoose.model("products", productSchema);


//  adexFileNo,year,fileNo,subject,nonp,nocp,totalPages,division,userId,UploadedBy