var express = require('express');
var router = express.Router();
let pool = require('../db/db');


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
        "(SELECT intClientID FROM trainer_clients WHERE intTrainerID = ?)"  
        
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

router.get(('/byTrainer'), function (req, res) {
    getTrainerClients(req, res);
});

module.exports = router;