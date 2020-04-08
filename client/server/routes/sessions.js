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

function getActiveByOwner(req,res){
    pool.getConnection(function(err, connection){
      if(err) {
        connection.release();
        res.json({"code": 100, "status": "Error in database connection"});
        return;
      }
      console.log("connected as id: " + connection.threadId);
  
      let sql = "SELECT * FROM sessions WHERE intOwnerID = ? AND intSessionStatusID = 1 ORDER BY dtmDate";

      let id = req.query.ID;
  
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

function getActiveByClient(req,res){
  pool.getConnection(function(err, connection){
    if(err) {
      connection.release();
      res.json({"code": 100, "status": "Error in database connection"});
      return;
    }
    console.log("connected as id: " + connection.threadId);

    let sql = "SELECT * FROM sessions WHERE intClientID = ? AND intSessionStatusID = 1";

    let id = req.query.ID;

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


function getActiveByTeam(req,res){
  pool.getConnection(function(err, connection){
    if(err) {
      connection.release();
      res.json({"code": 100, "status": "Error in database connection"});
      return;
    }
    console.log("connected as id: " + connection.threadId);

    let sql = "SELECT * FROM sessions WHERE intTeamID = ? AND intSessionStatusID = 1";

    let id = req.query.ID;

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

function getByID(req,res){
  pool.getConnection(function(err, connection){
    if(err) {
      connection.release();
      res.json({"code": 100, "status": "Error in database connection"});
      return;
    }
    console.log("connected as id: " + connection.threadId);

    let sql = "SELECT * FROM sessions WHERE intSessionID =?";

    let id = req.query.ID;

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

function deleteSession(req, res){
  pool.getConnection(function(err, connection){
    if(err) {
      connection.release();
      res.json({"code": 100, "status": "Error in database connection"});
      return;
    }
    console.log("connected as id: " + connection.threadId);

    let sql = "DELETE FROM sessions WHERE intSessionID =?";

    let id = req.query.ID;

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

function updateSession(req, res){
  pool.getConnection(function(err, connection){
    if(err) {
      connection.release();
      res.json({"code": 100, "status": "Error in database connection"});
      return;
    }
    console.log("connected as id: " + connection.threadId);

    let sql = "UPDATE sessions SET "+
              "intClientID= ?, "+
              "intTeamID = ?, "+
              "intSessionTypeID = ?, "+
              "intWorkoutID = ?, "+
              "dtmDate = ?, "+ 
              "tmStartTime = ?, "+
              "tmEndTime = ? WHERE intSessionID = ? ";
    
    let values = [req.body.clientID, req.body.teamID, req.body.typeID, req.body.workoutID, req.body.date, req.body.start, req.body.end, req.body.sessionID];

    connection.query(sql, values, function(err, rows) {
      connection.release();
      if(!err) {
        res.json(rows);
      }else( console.log(err))
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

router.get('/byID', function(req, res) { 
  getByID(req, res);
});

router.get('/active/ByOwner', function(req, res) { 
  getActiveByOwner(req, res);
});

router.get('/active/ByClient', function(req, res) { 
  getActiveByClient(req, res);
});

router.get('/active/ByTeam', function(req, res) { 
  getActiveByTeam(req, res);
});

router.get('/types', function(req, res) { 
  getSessionTypes(req, res);
});

router.delete(('/delete'), function(req, res){
  deleteSession(req, res);
});

router.put(('/update'), function(req, res){
  updateSession(req, res);
});

module.exports = router;
