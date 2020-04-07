var express = require('express');
var router = express.Router();
let pool = require('../db/db');


function addWorkout(req, res) {
    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            res.json({ "code": 100, "status": "Error in database connection" });
            return;
        }
        console.log("connected as id: " + connection.threadId);

        let sql = "INSERT INTO workouts (intOwnerID, strWorkoutName, intWorkoutTypeID) " +
            "VALUES (?, ?, ?)";
        let values = [req.body.ownerid, req.body.name, req.body.typeid];

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

function getByTrainer(req, res) {
    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            res.json({ "code": 100, "status": "Error in database connection" });
            return;
        }
        console.log("connected as id: " + connection.threadId);

        let sql = "SELECT * FROM workouts WHERE intOwnerID = ?";
        let id = req.query.ID;

        connection.query(sql, id, function (err, rows) {
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

function getByID(req, res) {
    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            res.json({ "code": 100, "status": "Error in database connection" });
            return;
        }
        console.log("connected as id: " + connection.threadId);

        let sql = "SELECT * FROM workouts WHERE intWorkoutID = ?";
        let id = req.query.ID;

        connection.query(sql, id, function (err, rows) {
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
    addWorkout(req, res);
});

router.get(('/byTrainer'), function (req, res) {
    getByTrainer(req, res);
});

router.get(('/byID'), function (req, res) {
    getByID(req, res);
});

module.exports = router;