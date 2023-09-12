require('dotenv').config()
//console.log(process.env) // remove this after you've confirmed it is working
const express = require("express");
const cors = require("cors");
require("./db/config");
const multer= require("multer") //package for file handling
// const upload= multer({dest:'uploads/'})

const User = require("./db/user");
const Product = require("./db/Product");
const Profile = require("./db/profile");
const bodyParser = require('body-parser');

// for search file data content 
const pdf = require('pdf-parse');
const fs = require('fs');

// For Users data
const UsersUser = require("./user/UserUsers")


const app = express();
app.use(cors());
// app.use('/',express.static('uploads'))
app.use(bodyParser.json());



// sign up or register new user For ADMIN
app.post("/register", async (req, resp) => {
  let user = new User(req.body);
  let result = await user.save();

  result = result.toObject();
  // for hide the password in response
  delete result.password;
  resp.send(result);
});


// sign up or register new user of USER Data
app.post("/user-register", async (req, resp) => {
  let usersUser = new UsersUser(req.body);
  let result = await usersUser.save();

  result = result.toObject();
  // for hide the password in response
  delete result.password;
  resp.send(result);
});

// for post login data and match to db For ADMIN
app.post("/login", async (req, resp) => {
  console.log(req.body);

  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      resp.send(user);
    } else {
      resp.send({ result: "user found not" });
    }
  }
});
// for post login data and match to db For USER
app.post("/user-login", async (req, resp) => {
  console.log(req.body);

  if (req.body.password && req.body.email) {
    let usersUser = await UsersUser.findOne(req.body).select("-password");
    if (usersUser) {
      resp.send(usersUser);
    } else {
      resp.send({ result: "user found not" });
    }
  }
});

//add product api

// **************************** 21aug2023
// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname+"-"+Date.now()+".pdf");
  },
});

const upload = multer({ storage: storage });

// Middleware for parsing JSON
app.use(express.json());


// Serve uploaded files
app.use('/uploads', express.static('uploads'));

// **************************** 21aug,2023
// for add data routing (API)
app.post("/add-product",upload.single('files'), async (req, resp) => {
  const {adexFileNo,year,fileNo,subject,nonp,nocp,totalPages,division,userId,UploadedBy } = req.body;
  const files =  req.file.filename;

  // for save the database
  let product = new Product({
    adexFileNo,year,fileNo,subject,nonp,nocp,totalPages,division,userId,UploadedBy,files
  });
  let result = await product.save();

  resp.send(result);
  console.log(result)
});

//show products lists
app.get("/products", async (req, resp) => {
  let products = await Product.find();
  if (products.length > 0) {
    resp.send(products);
  } else {
    resp.send({ result: "No Product Found" });
  }
});

// delete api
app.delete("/product/:id", async (req, resp) => {
  const result = await Product.deleteOne({ _id: req.params.id });

  resp.send(result);
});

//send data after click or pre-fill data (Update one product)
app.get("/product/:id", async (req, resp) => {
  let result = await Product.findOne({ _id: req.params.id });
  if (result) {
    resp.send(result);
  } else {
    resp.send({ result: "No Record Found..." });
  }
});

//update product data API
app.put("/product/:id", async (req, resp) => {
  let result = await Product.updateOne(
    {
      _id: req.params.id,
    },
    {
      $set: req.body,
    }
  );
  resp.send(result)
});


//Profile

// API endpoint for adding, showing, and updating the profile
app.post('/profile', async (req, res) => {
  try {
    const { userId, name, dob, email,mobile, designation } = req.body;

    // Check if the profile already exists for the user
    let profile = await Profile.findOne({ userId });

    if (!profile) {
      // If no profile exists, create a new one
      profile = new Profile({ userId, name, dob, email,mobile, designation });
    } else {
      // If a profile exists, update the existing one
      profile.name = name;
      profile.dob = dob;
      profile.email = email;
      profile.mobile = mobile;
      profile.designation = designation;
    }

    await profile.save();
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Error saving the profile.' });
  }
});

// for show profile list
app.get('/profile/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const profile = await Profile.findOne({ userId });

    if (profile) {
      res.json(profile);
    } else {
      res.status(404).json({ error: 'Profile not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching the profile.' });
  }
});

//Profile





//Search API
app.get("/search/:key",async(req,resp)=>{
  let result= await Product.find({
    "$or":[
      {adexFileNo:{$regex:req.params.key}},
      {year:{$regex:req.params.key}},
      {fileNo:{$regex:req.params.key}},
      {subject:{$regex:req.params.key}},
      {nonp:{$regex:req.params.key}},
      {nocp:{$regex:req.params.key}},
      {totalPages:{$regex:req.params.key}},
      {division:{$regex:req.params.key}},
      {userId:{$regex:req.params.key}},
      {UploadedBy:{$regex:req.params.key}}

      //this is means search query match [adexFileNo,year,fileNo,subject,nonp,nocp,totalPages,division,userId,UploadedBy] all fileds for result
    ]
  });
  resp.send(result)
})



// API for content search in files DT-09.09.2023
// *********************************

// API route for searching PDF content using regex
app.post('/search-pdf', (req, res) => {
  const searchTerm = req.body.searchTerm;

  // Path to the PDF file you want to search
  const pdfFilePath = 'http://localhost:4000/uploads/${item.files}';

  // Read the PDF file
  const dataBuffer = fs.readFileSync(pdfFilePath);

  // Convert the PDF to text
  pdf(dataBuffer).then(data => {
    const pdfText = data.text;

    // Perform a regex search on the PDF text
    const regex = new RegExp(searchTerm, 'gi'); // 'gi' for global and case-insensitive search
    const matches = pdfText.match(regex);

    if (matches) {
      res.json({ results: matches });
    } else {
      res.json({ message: 'No matches found.' });
    }
  }).catch(error => {
    res.status(500).json({ error: 'An error occurred while processing the PDF file.' });
  });
});

// *********************************
// API for content search in files end here




//these functions for file upload only work with postman not with frontend

// Function of File Upload
// const upload = multer({
//   storage:multer.diskStorage({
//     destination: function (req, resp, cb){
//       //cb means callback
//       cb(null,"uploads/") //FilesData is folder name where file have to store
//     },

//     filename:function (req, file, cb){
//       cb(null, file.fieldname +"-"+Date.now()+".pdf")
//     }
//   })
// }).single('filename');

//file upload API
// app.post("/uploadFile",upload2, (req, resp)=>{
//   resp.send('File Uploded') 
// });
//for use with postman=> open postman=> method "POST" => url('http://localhost:4000/uploadFile')=>body => form data(cheakbox) =>(Key:user-file) =>select file from  fromat dropdown =>choose a file=>send


app.listen(process.env.PORT);
