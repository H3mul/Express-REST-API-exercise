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

// request data parsing into req.body
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// retrieve model
var Game = require('./model.js');


//      ROUTES

// Welcome route
router.get('/', function(req, res) {
  res.json({ message: 'Welcome to the API!'});
});

router.route('/games')
    // CREATE route
  .post(function(req, res) {
    
    //create new game from request data
    Game.create({
      'name' : req.body.name,
      'cross_platform' : req.body.cross_platform,
      'rating' : req.body.rating,
      'release_date' : req.body.release_date
    }, function (err, small) {
      if (err) {
        console.log(err);
        res.json({ message: 'Game creation ended in error.'});
      }
      else{
        res.json({ message: 'Game created successfully.'});
      }
    });
  })
    // READ ALL route
  .get(function(req, res){
    
    //get all games
    Game.find(function(err, games){
      if(err){
        console.log(err);
        res.json({ message: 'Game reading ended in error.'});
      }
      else{
        res.json({data: games});
      }
    });
  });
  
router.route('/games/:game_id')

  // READ route
  .get(function(req, res){
    Game.findById(req.params.game_id, function(err, game){
      if(err){
        console.log(err);
        res.json({ message: 'Game reading ended in error.'});
      }
      else{
        res.json({data: game});
      }
    });
  })
  
  // UPDATE route
  .put(function(req, res){
    Game.findByIdAndUpdate(req.params.game_id, req.body, function(err){
      if(err){
        console.log(err);
        res.json({ message: 'Game update ended in error.'});
      }
      else{
        res.json({ message: 'Game update successful.'});
      }
    });
  })
  
  // DELETE route
  .delete(function(req, res){
    Game.findByIdAndDelete(req.params.game_id, req.body, function(err){
      if(err){
        console.log(err);
        res.json({ message: 'Game delete ended in error.'});
      }
      else{
        res.json({ message: 'Game delete successful.'});
      }
    });
  })

// prefix and register routes
app.use(API_URL_PREFIX, router);


//      APP START

var port = process.env.PORT || DEFAULT_PORT;
app.listen(port)
console.log('API running on port ' + port + " ...");
