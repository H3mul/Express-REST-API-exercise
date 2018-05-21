//      REQUIRES

const express = require('express');
const mongoose = require('mongoose');


//      SETTINGS

const DEFAULT_PORT = 3000;
const API_URL_PREFIX = '/api/';


//      SETUP

// db connection
mongoose.connect('mongodb://localhost');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log("DB connected.");
});

// express setup
var app = express();
var router = express.Router();

// request data parsing
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// retrieve model
var model = require('./model.js');


//      ROUTES

// Welcome route
router.get('/', function(req, res) {
  res.json({ message: 'Welcome to the API!'});
});

router.route('/games')
    // CREATE route
  .post(function(req, res) {
    
    model.create(req.body, function (err, data) {
      if (err) {
        console.log(err);
        res.json({ message: 'Creation ended in error.'});
      }
      else{
        res.json({ message: 'Creation successfull.', data: data});
      }
    });
  })
    // READ ALL route
  .get(function(req, res){
    
    //get all games
    model.readAll(function(err, data){
      if(err){
        console.log(err);
        res.json({ message: 'Reading ended in error.'});
      }
      else{
        res.json({data: data});
      }
    });
  });
  
router.route('/games/:game_id')

  // READ route
  .get(function(req, res){
    model.read(req.params.game_id, function(err, data){
      if(err){
        console.log(err);
        res.json({ message: 'Reading ended in error.'});
      }
      else{
        res.json({data: data});
      }
    });
  })
  
  // UPDATE route
  .put(function(req, res){
    model.update(req.params.game_id, req.body, function(err, data){
      if(err){
        console.log(err);
        res.json({ message: 'Update ended in error.'});
      }
      else{
        res.json({ message: 'Update successful.', data: data});
      }
    });
  })
  
  // DELETE route
  .delete(function(req, res){
    model.delete(req.params.game_id, req.body, function(err){
      if(err){
        console.log(err);
        res.json({ message: 'Deletion ended in error.'});
      }
      else{
        res.json({ message: 'Deletion successful.'});
      }
    });
  })

// prefix and register routes
app.use(API_URL_PREFIX, router);


//      APP START

var port = process.env.PORT || DEFAULT_PORT;
app.listen(port)
console.log('API running on port ' + port + " ...");
