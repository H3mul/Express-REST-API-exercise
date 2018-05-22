const mongoose = require('mongoose');

var error = "";
var gameColumns = { 
  name: String, 
  cross_platform: Boolean,
  rating: { type: Number, default: null },
  release_date: Date 
};
  
var gameSchema = new mongoose.Schema(gameColumns);

var Game = mongoose.model('Game', gameSchema);


//  DB OPERATIONS

// create new doc
function createGame(data, callback){
  var validatedData = validateSchemaData(data);
  
  if(validatedData == null || error){
    callback(error);
  }
  else{
    Game.create(validatedData, callback);
  }
}

// read all docs
function readAll(callback){
  Game.find(callback);
}

// read doc by id
function read(id, callback){
  if(!validateID(id)){
    callback("Not a valid game ID.");
  }
  else{
    Game.findById(id, function(err, data){
      if(data == null){
        callback("No entry corresponding to game ID.")
      }
      else{
        callback(err, data);
      }
    });
  }
}

// update doc by id
function update(id, data, callback){
  if(!validateID(id)){
    callback("Not a valid game ID.");
  }
  else{
    var validatedData = validateSchemaData(data);
    
    if(validatedData == null || error){
      callback(error);
    }
    else{
      Game.findByIdAndUpdate(id, validatedData, {new: true}, function(err, data){
        if(data == null){
          callback("No entry corresponding to game ID, or empty update.")
        }
        else{
          callback(err, data);
        }
      });
    }
  }
}

// delete doc by id 
function del(id, callback){
  if(!validateID(id)){
    callback("Not a valid game ID.");
  }
  else{
    Game.findByIdAndRemove(id, function(err, data){
      if(data == null){
        callback("No entry corresponding to game ID.")
      }
      else{
        callback(err, data);
      }
    });
  }
}


// VALIDATION

// validate db id
function validateID(id){
  return /^[a-f\d]{24}$/i.test(id);
}

// validate Game data
function validateSchemaData(data){
  var validatedData = {};
  error = "";
  
  for(var property in data){
    if(gameColumns.hasOwnProperty(property)){
      
      // validate fields
      switch (property) {
        
        case "name":
          // return error in api if not alphanumeric or is empty
          if(!data.name || !/^[a-z0-9]+$/i.test(data.name)){
            error = "Name must be alphanumeric and non-empty."
            return null;
          }
          validatedData.name = data.name;
          break;
          
        case "cross_platform":
          // set cross_platform if non-empty, boolean value inferred from string
          if(data.cross_platform){
            validatedData.cross_platform = /^true$/i.test(data.cross_platform);
          }
          break;
          
        case "rating":
          // set rating if is a number between 0 and 10, error otherwise.
          if(data.rating){
            if(!isNaN(data.rating) && data.rating >= 0 && data.rating <= 10){
              validatedData.rating = data.rating;
            }
            else{
              error = "Rating must be a number between 0 and 10.";
              return null;
            }
          }
          break;
          
        case "release_date":
          // set release date if valid date string, error otherwise
          var date = Date.parse(data.release_date);
          if(!isNaN(date)){
            validatedData.release_date = date;
          }
          else{
            error = "Release date must be a valid date string."
            return null;
          }
          break;
        default:
          validatedData[property] = data[property];
          break;
      }
    }
  }
  
  return validatedData;
}

module.exports = {
    mongooseModel : Game,
    create : createGame,
    readAll : readAll,
    read : read,
    update : update,
    delete : del
};
