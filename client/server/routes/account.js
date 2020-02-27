var express = require('express');
var router = express.Router();
let pool = require('../db/db');

function getAccountTypes(req,res){
  pool.getConnection(function(err, connection){
    if(err) {
      connection.release();
      res.json({"code": 100, "status": "Error in database connection"});
      return;
    }
    console.log("connected as id: " + connection.threadId);

    let sql = "SELECT * FROM accounttypes"

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

router.post(('/create'), function(req, res){
    createAccount(req);
});

router.get('/types', function(req, res) { 
    getAccountTypes(req, res);
});

module.exports = router;
