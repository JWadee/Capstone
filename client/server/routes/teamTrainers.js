
var express = require('express');
var router = express.Router();
let pool = require('../db/db');


function addTeamTrainers(req, res) {
    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            res.json({ "code": 100, "status": "Error in database connection" });
            return;
        }
        console.log("connected as id: " + connection.threadId);

        let sql = "INSERT INTO team_trainers (intAccountID, intTeamID) " +
            "VALUES (?, ?)";
        let values = [req.body.accountid, req.body.teamid];

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

function getTeamTrainers(req, res) {
    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            res.json({ "code": 100, "status": "Error in database connection" });
            return;
        }
        console.log("connected as id: " + connection.threadId);

        let sql = "SELECT * FROM team_trainers "+
                  "INNER JOIN accounts AS a ON a.intAccountID "+  
                  "WHERE intTeamID = ?";

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

router.post(('/add'), function (req, res) {
    addTeamTrainers(req, res);
});

router.get(('/byTeam'), function (req, res) {
    getTeamTrainers(req, res);
});

module.exports = router;

