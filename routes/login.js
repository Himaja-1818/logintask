var express = require('express');
var router = express.Router();
const fs = require('fs')
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";
var jsonexport = require('jsonexport');

router.get('/login', function(req, res, next) {
  
    MongoClient.connect(url,{ useUnifiedTopology: true }, function(err, db) {
      if (err) throw err;
      const dbo = db.db("database");
      var myobj = [{ name: "himaja",age:21,gender:"female",city:"krishnagiri"},{name: "ayisha",age:22,gender:"female",city:"chennai"},{name: "mani",age:23,gender:"male",city:"hosur"},{name: "gauthami",age:24,gender:"female",city:"bangalore"},{name: "gopal",age:21,gender:"male",city:"bhopal"}];


dbo.collection("users").insertMany(myobj, function(err, result) {
   if (err) throw err;
  
   console.log("1 document inserted",result);
   jsonexport(result,function(err, csv){
        if(err) return console.log(err);
      
        const  x = Math.floor(Math.random()*100);
      fs.appendFile( `sample_${x}.csv`,csv, 'utf8',
        
        function(err) { 
            if (err) throw err;
            
            console.log("Data is appended to file successfully.");

      res.render('login.ejs')
    })
  })
})
    })
  })
    module.exports = router;