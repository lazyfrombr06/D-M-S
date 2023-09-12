// for model and scheama

//schema
const mongoose = require('mongoose');
const profileSchema= new mongoose.Schema({
    userId: { type: String, required: true },
  name: { type: String, required: true },
  dob: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  designation: { type: String },
  
});
// Model
module.exports= mongoose.model("profile", profileSchema);

