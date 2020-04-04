var express = require('express');
var router = express.Router();
let pool = require('../db/db');

function addTrainerClientNote(req,res){
    pool.getConnection(function(err, connection){
      if(err) {
        connection.release();
        res.json({"code": 100, "status": "Error in database connection"});
        return;
      }
      console.log("connected as id: " + connection.threadId);
  
      let sql = "INSERT INTO Trainer_Client_Notes (intTrainerClientID, strNote) "+
                "VALUES (?,?)";

      let values =[

       req.body.intTrainerClientID,
       req.body.strNote,
       
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


function getTrainerClientStatuses(req, res) {
    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            res.json({ "code": 100, "status": "Error in database connection" });
            return;
        }
        console.log("connected as id: " + connection.threadId);

        let sql = "SELECT * FROM accounts WHERE intAccountID IN "+
        "(SELECT intClientID FROM trainer_clients WHERE intTrainerID = ?)"  
        
        let ID = req.query.ID

        connection.query(sql, function (err, rows) {
            connection.release();
            if (!err) {
                res.json(rows)
            }
        });

        connection.on('error', function (err) {
            res.json({ "code": 100, "status": "Error in database connection" });
        })
    })
}



function getTrainerClientNotesByClient(req,res){
    pool.getConnection(function(err, connection){
      if(err) {
        connection.release();
        res.json({"code": 100, "status": "Error in database connection"});
        return;
      }
      console.log("connected as id: " + connection.threadId);
  
      let sql = "SELECT * FROM Trainer_Client_Notes WHERE intTrainerClientID = ?";

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

function addTrainerClient(req, res) {
    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            res.json({ "code": 100, "status": "Error in database connection" });
            return;
        }
        console.log("connected as id: " + connection.threadId);

        let sql = "INSERT INTO trainer_clients (intTrainerID, intClientID, intTrainerClientStatusID) " +
                  "VALUES (?, ?, 1)";
        let values = [req.body.trainerID, req.body.clientID];

        connection.query(sql, values, function (err, result) {
            connection.release();
            if (!err) {
                console.log(result)
                res.json("Success")
            }
            console.log(err)

        });
        connection.on('error', function (err) {
            res.json({ "code": 100, "status": "Error in database connection" });
        })
    })
}

function getTrainerClients(req, res) {
    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            res.json({ "code": 100, "status": "Error in database connection" });
            return;
        }
        console.log("connected as id: " + connection.threadId);

        let sql = "SELECT * FROM accounts WHERE intAccountID IN "+
        "(SELECT intClientID FROM trainer_clients WHERE intTrainerID = ?)";  

        let ID = req.query.ID

        connection.query(sql, ID, function (err, rows) {
            connection.release();
            if (!err) {
                res.json(rows)
            }
        });

        connection.on('error', function (err) {
            res.json({ "code": 100, "status": "Error in database connection" });
        })
    })
}

router.post(('/add'), function (req, res) {
    addTrainerClient(req, res);
});

router.post(('/notes/add'), function (req, res) {
  addTrainerClientNote(req, res);
});

router.get(('/byTrainer'), function (req, res) {
    getTrainerClients(req, res);
});  

router.get(('/statuses'), function (req, res) {
    getTrainerClientStatuses(req, res);
});


  router.get('/notes/byTrainer', function(req, res) { 
    getTrainerClientNotesByClient(req, res);
});

module.exports = router;