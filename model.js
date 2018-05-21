const mongoose = require('mongoose');

var gameSchema = new mongoose.Schema(
  { 
    name: String, 
    cross_platform: Boolean,
    rating: { type: Number, default: null },
    release_date: Date });

var Game = mongoose.model('Game', gameSchema);

// create new doc
function createGame(data, callback){
  Game.create({
    name : data.name,
    cross_platform : data.cross_platform,
    rating : data.rating,
    release_date : data.release_date
  }, callback);
}

// read all docs
function readAll(callback){
  Game.find(callback);
}

// read doc by id
function read(id, callback){
  Game.findById(id, callback);
}

// update doc by id
function update(id, data, callback){
  Game.findByIdAndUpdate(id, data, {new: true}, callback);
}

// delete doc by id 
function del(id, callback){
  Game.findByIdAndDelete(id, callback);
}

module.exports = {
    mongooseModel : Game,
    create : createGame,
    readAll : readAll,
    read : read,
    update : update,
    delete : del
};
