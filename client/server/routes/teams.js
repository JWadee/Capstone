
var express = require('express');
var router = express.Router();
let pool = require('../db/db');


function addTeam(req, res) {
    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            res.json({ "code": 100, "status": "Error in database connection" });
            return;
        }
        console.log("connected as id: " + connection.threadId);

        let sql = "INSERT INTO teams (strTeamName, intTeamTypeID) " +
            "VALUES (?, ?)";
        let values = [req.body.name, req.body.typeid];

        let trainerSql = "INSERT INTO team_trainers ( intAccountID, intTeamID) " +
            "VALUES (?, last_insert_id())";

        let id = req.body.id;

        connection.query(sql, values, function (err, result) {

            if (!err) {
                console.log(result)
                

                connection.query(trainerSql, id, function (err, result) {
                    if (err) {
                        connection.release();
                        console.log(err);
                    }
                    else {
                        connection.release();
                        res.json("Success")
                    }

                });

            }


        });
        connection.on('error', function (err) {
            res.json({ "code": 100, "status": "Error in database connection" });
        })
    })
}

function getTeams(req, res) {
    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            res.json({ "code": 100, "status": "Error in database connection" });
            return;
        }
        console.log("connected as id: " + connection.threadId);

        let sql = "SELECT * FROM teams";

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

function getByTrainer(req, res) {
    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            res.json({ "code": 100, "status": "Error in database connection" });
            return;
        }
        console.log("connected as id: " + connection.threadId);

        let sql = "SELECT * FROM teams WHERE intTeamID IN "+
                 "(SELECT intTeamID FROM team_trainers WHERE intAccountID = ?)"                

        let ID = req.query.ID; 
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
    addTeam(req, res);
});

router.get(('/'), function (req, res) {
    getTeams(req, res);
});

router.get(('/byTrainer'), function (req, res) {
    getByTrainer(req, res);
});

module.exports = router;
