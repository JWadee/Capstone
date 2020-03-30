var express = require('express');
var router = express.Router();
let pool = require('../db/db');

function getSessions(req,res){
    pool.getConnection(function(err, connection){
      if(err) {
        connection.release();
        res.json({"code": 100, "status": "Error in database connection"});
        return;
      }
      console.log("connected as id: " + connection.threadId);
  
      let sql = "SELECT * FROM Sessions";
  
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

function getSessionsByTeam(req,res){
    pool.getConnection(function(err, connection){
      if(err) {
        connection.release();
        res.json({"code": 100, "status": "Error in database connection"});
        return;
      }
      console.log("connected as id: " + connection.threadId);
  
      let sql = "SELECT * FROM Sessions WHERE intTeamID = ?";

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


function addSessionRecord(req,res){
    pool.getConnection(function(err, connection){
      if(err) {
        connection.release();
        res.json({"code": 100, "status": "Error in database connection"});
        return;
      }
      console.log("connected as id: " + connection.threadId);
  
      let sql = "INSERT INTO Sessions (intOwnerID, intClientID, intTeamID, intSessionTypeID, intSessionStatusID, intWorkoutID, dtmDate, tmStartTime, tmEndTime) "+
                "VALUES (?,?,?,?,?,?,?,?,?)";

      let values =[

       req.body.intOwnerID,
       req.body.intClientID,
       req.body.intTeamID,
       req.body.intSessionTypeID,
       req.body.intSessionStatusID,
       req.body.intWorkoutID,
       req.body.dtmDate,
       req.body.tmStartTime,
       req.body.tmEndTime
      ];
      connection.query(sql, value, function(err, result) {
        connection.release();
        if(!err) {
            console.log(result)
            res.json("Success")
        }
        console.log(err)

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
     res.json(rows)
   }
});

 connection.on('error', function(err){
  res.json({"code": 100, "status": "Error in database connection"});
})
})
}   



function getSessionStatuses(req,res){
    pool.getConnection(function(err, connection){
   if(err) {
   connection.release();
   res.json({"code": 100, "status": "Error in database connection"});
   return;
 }
 console.log("connected as id: " + connection.threadId);

   let sql = "SELECT * FROM Session_Statuses";

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



router.get('/ByTeam', function(req, res) { 
    getSessionsByTeam(req, res);
  });


  router.post(('/add'), function(req, res){
    addSessionRecord(req, res);
});

router.get(('/'), function(req, res) { 
    getSessionTypes(req, res);
  });

  router.get(('/'), function(req, res) { 
    getSessionStatuses(req, res);
  });

module.exports = router;