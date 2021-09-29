//Importing all the packages and files
var express = require("express");
var mongoose = require("mongoose");
var bodyparser = require("body-parser");
var User = require("./models/user");
var db = require("./database/myUrl").myurl;
var app = express();
var port = process.env.PORT || 3000;

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

mongoose  .connect(db) 
 .then(() => {    console.log("Database is connected");  })  
 .catch(err => {    console.log("Error is ", err.message);  });

app.get("/", (req, res) => {  
    res.status(200).send(`Welcome to the Login and Signup API`);});

    //REGISTER
    app.post("/signup", async (req, res) => {
        var newUser = new User({
          name: req.body.name,
          password: req.body.password
        });
        await newUser
          .save()
          .then(() => {
            res.status(200).send(newUser);
          })
          .catch(err => {
            console.log("Error is ", err.message);
          });
      });
      
      //LOGIN
      app.post("/login", async (req, res) => {
        var newUser = {};
        newUser.name = req.body.name;
        newUser.password = req.body.password;
      
        await User.findOne({ name: newUser.name })
          .then(profile => {
            if (!profile) {
              res.send("User does not exist");
            } else {
              if (profile.password == newUser.password) {
                res.send("User successfully authenticated");
              } else {
                res.send("User Unauthorized Access");
              }
            }
          })
   
          .catch(err => {
            console.log("Error is ", err.message);
          });
         });

      app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
      });

   





