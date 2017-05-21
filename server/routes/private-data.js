
var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = require('../modules/database-config');


router.get('/', function(req, res){
  console.log(req.decodedToken); // Here you can see the information firebase gives you about the user
  res.send("Our Dates!!! You got it!!! Great work " + req.decodedToken.name + "!!!");
});


module.exports = router;
