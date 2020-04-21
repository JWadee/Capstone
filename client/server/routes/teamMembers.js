
var express = require('express');
var router = express.Router();
let pool = require('../db/db');


function addTeamMembers(req, res) {
    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            res.json({ "code": 100, "status": "Error in database connection" });
            return;
        }
        console.log("connected as id: " + connection.threadId);

        let sql = "INSERT INTO team_members (intAccountID, intTeamID) " +
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

function getByTeam(req, res) {
    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            res.json({ "code": 100, "status": "Error in database connection" });
            return;
        }
        console.log("connected as id: " + connection.threadId);

        let sql = "SELECT tm.*, a.strFirstName, a.strLastName, a.intAccountID FROM team_members AS tm "+
                  "INNER JOIN accounts AS a ON a.intAccountID = tm.intAccountID "+  
                  "WHERE intTeamID = ?";
        let teamid= req.query.teamid;

        connection.query(sql, teamid, function (err, rows) {
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
    addTeamMembers(req, res);
});

router.get(('/byTeam'), function (req, res) {
    getByTeam(req, res);
});

module.exports = router;

