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

// request data parsing
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// retrieve model
var model = require('./model.js');

// apply routes
var router = require('./routes.js')(model);

// prefix and register routes
app.use(API_URL_PREFIX, router);


//      APP START

var port = process.env.PORT || DEFAULT_PORT;
app.listen(port)
console.log('API running on port ' + port + " ...");
