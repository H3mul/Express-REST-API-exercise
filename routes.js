const express = require('express');


module.exports = function(model){
  
  var router = express.Router();
  
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
      model.delete(req.params.game_id, function(err){
        if(err){
          console.log(err);
          res.json({ message: 'Deletion ended in error.'});
        }
        else{
          res.json({ message: 'Deletion successful.'});
        }
      });
    });
    
    return router;
}
