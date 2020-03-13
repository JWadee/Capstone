var express = require('express');
var router = express.Router();
let pool = require('../db/db');

function getTypes(req,res){
    pool.getConnection(function(err, connection){
      if(err) {
        connection.release();
        res.json({"code": 100, "status": "Error in database connection"});
        return;
      }
      console.log("connected as id: " + connection.threadId);
  
      let sql = "SELECT * FROM exercise_types";
  
      connection.query(sql, function(err, rows) {
        connection.release();
        if(!err) {
          res.json(rows)
        }
      });    
      
      connection.on('error', function(err){
        res.json({"code": 100, "status": "Error in database connection"});
      })
    })
}

router.get('', function(req, res) { 
  getTypes(req, res);
});

module.exports = router;
