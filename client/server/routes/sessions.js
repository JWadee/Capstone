var express = require('express');
var router = express.Router();
let pool = require('../db/db');


function addSession(req, res) {
  pool.getConnection(function (err, connection) {
      if (err) {
          connection.release();
          res.json({ "code": 100, "status": "Error in database connection" });
          return;
      }
      console.log("connected as id: " + connection.threadId);

      let sql = "INSERT INTO sessions (intOwnerID, intClientID, intTeamID, intSessionTypeID, intSessionStatusID, intWorkoutID, dtmDate, tmStartTime, tmEndTime) " +
                "VALUES (?,?,?,?,?,?,?,?,?)";
      let values = [req.body.ownerID, req.body.clientID, req.body.teamID, req.body.typeID, req.body.statusID, req.body.workoutID, req.body.date, req.body.start, req.body.end];

      connection.query(sql, values, function (err, result) {

          if (!err) {
              console.log(result)
              connection.release();
              res.json("Success")
          }else{
          console.log(err)
        }
      });
      connection.on('error', function (err) {
          res.json({ "code": 100, "status": "Error in database connection" });
      })
  })
}

function getSessions(req,res){
    pool.getConnection(function(err, connection){
      if(err) {
        connection.release();
        res.json({"code": 100, "status": "Error in database connection"});
        return;
      }
      console.log("connected as id: " + connection.threadId);
  
      let sql = "SELECT * FROM sessions";
  
      connection.query(sql, function(err, rows) {
        connection.release();
        if(!err) {
          res.json(rows);
        }
      });    
      
      connection.on('error', function(err){
        res.json({"code": 100, "status": "Error in database connection"});
      })
    })
}

function getSessionsByOwner(req,res){
    pool.getConnection(function(err, connection){
      if(err) {
        connection.release();
        res.json({"code": 100, "status": "Error in database connection"});
        return;
      }
      console.log("connected as id: " + connection.threadId);
  
      let sql = "SELECT * FROM sessions WHERE intOwnerID = ?";

      let id = req.query.id;
  
      connection.query(sql, id, function(err, rows) {
        connection.release();
        if(!err) {
          res.json(rows);
        }
      });    
      
      connection.on('error', function(err){
        res.json({"code": 100, "status": "Error in database connection"});
      })
    })
}

function getSessionTypes(req,res){
  pool.getConnection(function(err, connection){
    if(err) {
      connection.release();
      res.json({"code": 100, "status": "Error in database connection"});
      return;
    }
    console.log("connected as id: " + connection.threadId);

    let sql = "SELECT * FROM session_types";

    connection.query(sql, function(err, rows) {
      connection.release();
      if(!err) {
        res.json(rows);
      }
    });    
    
    connection.on('error', function(err){
      res.json({"code": 100, "status": "Error in database connection"});
    })
  })
}

router.post('/add', function(req, res) { 
  addSession(req, res);
});

router.get('/', function(req, res) { 
  getSessions(req, res);
});

router.get('/ByOwner', function(req, res) { 
    getSessionsByOwner(req, res);
});

router.get('/types', function(req, res) { 
  getSessionTypes(req, res);
});

module.exports = router;
